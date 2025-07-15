// Vercel Serverless Function - Properties API
const PostgresDatabase = require('../../database/postgres');

let db;

async function initDB() {
    if (!db) {
        db = new PostgresDatabase();
        // Initialize database schema if needed (only for new deployments)
        try {
            await db.initializeDatabase();
        } catch (error) {
            console.log('Database already initialized or error:', error.message);
        }
    }
    return db;
}

export default async function handler(req, res) {
    try {
        const database = await initDB();
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method === 'GET') {
            const { city, type, min_price, max_price, bedrooms } = req.query;
            
            let sql = `
                SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name
                FROM properties p
                JOIN users u ON p.owner_id = u.id
                WHERE p.is_available = true
            `;
            
            const params = [];
            let paramCount = 0;
            
            // Add filters
            if (city) {
                paramCount++;
                sql += ` AND LOWER(p.city) LIKE LOWER($${paramCount})`;
                params.push(`%${city}%`);
            }
            
            if (type) {
                paramCount++;
                sql += ` AND p.property_type = $${paramCount}`;
                params.push(type);
            }
            
            if (min_price) {
                paramCount++;
                sql += ` AND p.rent_amount >= $${paramCount}`;
                params.push(parseFloat(min_price));
            }
            
            if (max_price) {
                paramCount++;
                sql += ` AND p.rent_amount <= $${paramCount}`;
                params.push(parseFloat(max_price));
            }
            
            if (bedrooms) {
                paramCount++;
                sql += ` AND p.bedrooms = $${paramCount}`;
                params.push(parseInt(bedrooms));
            }
            
            sql += ' ORDER BY p.created_at DESC';
            
            const result = await database.query(sql, params);
            
            // Format the response
            const properties = result.rows.map(property => ({
                ...property,
                amenities: property.amenities || [],
                utilities_included: property.utilities_included || [],
                images: property.images || []
            }));
            
            res.status(200).json(properties);
            
        } else if (req.method === 'POST') {
            const propertyData = req.body;
            
            // Validation
            if (!propertyData.title || !propertyData.rent_amount || !propertyData.address) {
                return res.status(400).json({ error: 'Missing required fields: title, rent_amount, address' });
            }
            
            const result = await database.createProperty(propertyData);
            
            // Fetch the created property
            const newProperty = await database.getPropertyById(result.id);
            
            res.status(201).json({
                message: 'Property created successfully',
                property: newProperty
            });
            
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Properties API error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}