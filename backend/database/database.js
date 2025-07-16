const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class Database {
    constructor() {
        // Create database directory if it doesn't exist
        const dbDir = path.join(__dirname);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        // Initialize SQLite database
        this.db = new sqlite3.Database(path.join(dbDir, 'rental_ai.db'), (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('Connected to SQLite database');
                this.initializeDatabase();
            }
        });
    }

    async initializeDatabase() {
        try {
            const schemaPath = path.join(__dirname, 'schema.sql');
            const schema = fs.readFileSync(schemaPath, 'utf8');
            
            // Split schema into individual statements and execute them
            const statements = schema.split(';').filter(stmt => stmt.trim());
            
            for (const statement of statements) {
                if (statement.trim()) {
                    try {
                        await this.run(statement);
                    } catch (error) {
                        // Ignore constraint errors for test data that already exists
                        if (error.code !== 'SQLITE_CONSTRAINT') {
                            throw error;
                        }
                    }
                }
            }
            
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    // Promisify database operations
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }

    // Rental AI specific methods
    async getProperties() {
        const sql = `
            SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name
            FROM properties p
            JOIN users u ON p.owner_id = u.id
            WHERE p.is_available = 1
            ORDER BY p.created_at DESC
        `;
        return await this.all(sql);
    }

    async getPropertyById(id) {
        const sql = `
            SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name, u.email as owner_email
            FROM properties p
            JOIN users u ON p.owner_id = u.id
            WHERE p.id = ?
        `;
        return await this.get(sql, [id]);
    }

    async createProperty(propertyData) {
        const sql = `
            INSERT INTO properties (
                owner_id, title, description, property_type, address, city, state, zipcode,
                bedrooms, bathrooms, square_feet, rent_amount, security_deposit, available_from,
                furnished, pets_allowed, smoking_allowed, utilities_included, amenities
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const params = [
            propertyData.owner_id,
            propertyData.title,
            propertyData.description,
            propertyData.property_type,
            propertyData.address,
            propertyData.city,
            propertyData.state,
            propertyData.zipcode,
            propertyData.bedrooms || 0,
            propertyData.bathrooms || 0,
            propertyData.square_feet || null,
            propertyData.rent_amount,
            propertyData.security_deposit || null,
            propertyData.available_from || null,
            propertyData.furnished || false,
            propertyData.pets_allowed || false,
            propertyData.smoking_allowed || false,
            JSON.stringify(propertyData.utilities_included || []),
            JSON.stringify(propertyData.amenities || [])
        ];
        
        return await this.run(sql, params);
    }

    async getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return await this.get(sql, [email]);
    }

    async createUser(userData) {
        const sql = `
            INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const params = [
            userData.email,
            userData.password_hash,
            userData.first_name,
            userData.last_name,
            userData.phone || null,
            userData.role || 'tenant'
        ];
        
        return await this.run(sql, params);
    }

    async getDashboardStats() {
        const stats = {};
        
        // Total properties
        const totalProperties = await this.get('SELECT COUNT(*) as count FROM properties');
        stats.totalProperties = totalProperties.count;
        
        // Available properties
        const availableProperties = await this.get('SELECT COUNT(*) as count FROM properties WHERE is_available = 1');
        stats.availableProperties = availableProperties.count;
        
        // Total users
        const totalUsers = await this.get('SELECT COUNT(*) as count FROM users');
        stats.totalUsers = totalUsers.count;
        
        // Active leases
        const activeLeases = await this.get('SELECT COUNT(*) as count FROM leases WHERE status = "active"');
        stats.activeLeases = activeLeases.count;
        
        // Monthly revenue
        const monthlyRevenue = await this.get(`
            SELECT SUM(amount) as revenue 
            FROM payments 
            WHERE status = 'completed' 
            AND strftime('%Y-%m', payment_date) = strftime('%Y-%m', 'now')
        `);
        stats.monthlyRevenue = monthlyRevenue.revenue || 0;
        
        return stats;
    }
}

module.exports = Database;