// Vercel Serverless Function - Single Property API
const Database = require('../database');

let db;

async function initDB() {
    if (!db) {
        db = new Database();
    }
    return db;
}

export default async function handler(req, res) {
    try {
        const database = await initDB();
        const { id } = req.query;
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method === 'GET') {
            const property = await database.getPropertyById(id);
            
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
            
            // Format the response
            const formattedProperty = {
                ...property,
                amenities: property.amenities || [],
                utilities_included: property.utilities_included || [],
                images: property.images || []
            };
            
            res.status(200).json(formattedProperty);
            
        } else if (req.method === 'PUT') {
            const updates = req.body;
            
            // Check if property exists
            const existingProperty = await database.getPropertyById(id);
            if (!existingProperty) {
                return res.status(404).json({ error: 'Property not found' });
            }
            
            // Build update query dynamically
            const updateFields = [];
            const params = [];
            let paramCount = 0;
            
            Object.keys(updates).forEach(key => {
                if (key !== 'id') {
                    paramCount++;
                    updateFields.push(`${key} = $${paramCount}`);
                    if (key === 'amenities' || key === 'utilities_included') {
                        params.push(JSON.stringify(updates[key]));
                    } else {
                        params.push(updates[key]);
                    }
                }
            });
            
            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'No valid fields to update' });
            }
            
            updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
            params.push(id);
            paramCount++;
            
            const sql = `UPDATE properties SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING id`;
            await database.query(sql, params);
            
            // Fetch updated property
            const updatedProperty = await database.getPropertyById(id);
            
            res.status(200).json({
                message: 'Property updated successfully',
                property: updatedProperty
            });
            
        } else if (req.method === 'DELETE') {
            // Check if property exists
            const existingProperty = await database.getPropertyById(id);
            if (!existingProperty) {
                return res.status(404).json({ error: 'Property not found' });
            }
            
            await database.query('DELETE FROM properties WHERE id = $1', [id]);
            
            res.status(200).json({ message: 'Property deleted successfully' });
            
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Property API error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}