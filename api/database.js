// Database module for Vercel Serverless Functions
const { Pool } = require('pg');

class Database {
    constructor() {
        // Use Vercel Postgres connection if available, otherwise use SQLite-like demo data
        this.pool = process.env.POSTGRES_URL ? new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        }) : null;
        
        this.initialized = false;
        
        // Demo data for when no real database is available
        this.demoUsers = [
            {
                id: 1,
                email: 'owner@example.com',
                first_name: 'John',
                last_name: 'Owner',
                role: 'owner',
                password_hash: '$2a$10$dummy.hash.here'
            },
            {
                id: 2,
                email: 'tenant@example.com',
                first_name: 'Jane',
                last_name: 'Tenant',
                role: 'tenant',
                password_hash: '$2a$10$dummy.hash.here'
            },
            {
                id: 3,
                email: 'admin@example.com',
                first_name: 'Admin',
                last_name: 'User',
                role: 'admin',
                password_hash: '$2a$10$dummy.hash.here'
            }
        ];
        
        this.demoProperties = [
            {
                id: 1,
                title: 'Modern Downtown Apartment',
                description: 'Beautiful 2BR/2BA apartment in the heart of downtown',
                price: 3500,
                location: 'San Francisco, CA',
                bedrooms: 2,
                bathrooms: 2,
                square_feet: 1200,
                owner_id: 1,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Cozy Studio Near Campus',
                description: 'Perfect for students, close to university',
                price: 1800,
                location: 'Berkeley, CA',
                bedrooms: 1,
                bathrooms: 1,
                square_feet: 600,
                owner_id: 1,
                status: 'rented',
                created_at: new Date().toISOString()
            }
        ];
    }
    
    async ensureInitialized() {
        if (this.pool && !this.initialized) {
            try {
                // Create users table
                await this.pool.query(`
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        first_name VARCHAR(100) NOT NULL,
                        last_name VARCHAR(100) NOT NULL,
                        role VARCHAR(50) DEFAULT 'tenant',
                        password_hash VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                // Create properties table
                await this.pool.query(`
                    CREATE TABLE IF NOT EXISTS properties (
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        price DECIMAL(10,2) NOT NULL,
                        location VARCHAR(255),
                        bedrooms INTEGER,
                        bathrooms INTEGER,
                        square_feet INTEGER,
                        owner_id INTEGER REFERENCES users(id),
                        status VARCHAR(50) DEFAULT 'available',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                // Insert demo data
                await this.pool.query(`
                    INSERT INTO users (email, first_name, last_name, role, password_hash) 
                    VALUES 
                        ('owner@example.com', 'John', 'Owner', 'owner', '$2a$10$dummy.hash.here'),
                        ('tenant@example.com', 'Jane', 'Tenant', 'tenant', '$2a$10$dummy.hash.here'),
                        ('admin@example.com', 'Admin', 'User', 'admin', '$2a$10$dummy.hash.here')
                    ON CONFLICT (email) DO NOTHING
                `);

                // Insert demo properties
                await this.pool.query(`
                    INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, square_feet, owner_id, status)
                    VALUES 
                        ('Modern Downtown Apartment', 'Beautiful 2BR/2BA apartment in the heart of downtown', 3500.00, 'San Francisco, CA', 2, 2, 1200, 1, 'available'),
                        ('Cozy Studio Near Campus', 'Perfect for students, close to university', 1800.00, 'Berkeley, CA', 1, 1, 600, 1, 'rented')
                    ON CONFLICT DO NOTHING
                `);

                this.initialized = true;
                console.log('Database tables initialized successfully');
            } catch (error) {
                console.error('Database initialization error:', error);
                // Don't throw error, just log it - app can still work with demo data
            }
        }
    }
    
    async getUserByEmail(email) {
        await this.ensureInitialized();
        
        if (this.pool) {
            try {
                const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
                return result.rows[0];
            } catch (error) {
                console.error('Database query error:', error);
                return null;
            }
        }
        
        // Use demo data
        return this.demoUsers.find(user => user.email === email);
    }
    
    async getUserById(id) {
        await this.ensureInitialized();
        
        if (this.pool) {
            try {
                const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
                return result.rows[0];
            } catch (error) {
                console.error('Database query error:', error);
                return null;
            }
        }
        
        // Use demo data
        return this.demoUsers.find(user => user.id === parseInt(id));
    }
    
    async createUser(userData) {
        await this.ensureInitialized();
        
        if (this.pool) {
            try {
                const result = await this.pool.query(
                    'INSERT INTO users (email, first_name, last_name, role, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [userData.email, userData.first_name, userData.last_name, userData.role, userData.password_hash]
                );
                return result.rows[0];
            } catch (error) {
                console.error('Database insert error:', error);
                throw error;
            }
        }
        
        // Use demo data - simulate creation
        const newUser = {
            id: this.demoUsers.length + 1,
            ...userData,
            created_at: new Date().toISOString()
        };
        this.demoUsers.push(newUser);
        return newUser;
    }
    
    async getAllProperties() {
        if (this.pool) {
            try {
                const result = await this.pool.query('SELECT * FROM properties ORDER BY created_at DESC');
                return result.rows;
            } catch (error) {
                console.error('Database query error:', error);
                return [];
            }
        }
        
        // Use demo data
        return this.demoProperties;
    }
    
    async getPropertyById(id) {
        if (this.pool) {
            try {
                const result = await this.pool.query('SELECT * FROM properties WHERE id = $1', [id]);
                return result.rows[0];
            } catch (error) {
                console.error('Database query error:', error);
                return null;
            }
        }
        
        // Use demo data
        return this.demoProperties.find(property => property.id === parseInt(id));
    }
    
    async getDashboardStats() {
        await this.ensureInitialized();
        
        if (this.pool) {
            try {
                const [propertiesResult, usersResult] = await Promise.all([
                    this.pool.query('SELECT COUNT(*) as total, COUNT(CASE WHEN status = $1 THEN 1 END) as available FROM properties', ['available']),
                    this.pool.query('SELECT COUNT(*) as total FROM users WHERE role = $1', ['tenant'])
                ]);
                
                return {
                    totalProperties: parseInt(propertiesResult.rows[0].total),
                    availableProperties: parseInt(propertiesResult.rows[0].available),
                    totalTenants: parseInt(usersResult.rows[0].total),
                    monthlyRevenue: 12500
                };
            } catch (error) {
                console.error('Database query error:', error);
                return this.getDemoStats();
            }
        }
        
        return this.getDemoStats();
    }
    
    getDemoStats() {
        return {
            totalProperties: this.demoProperties.length,
            availableProperties: this.demoProperties.filter(p => p.status === 'available').length,
            totalTenants: this.demoUsers.filter(u => u.role === 'tenant').length,
            monthlyRevenue: 12500
        };
    }
}

module.exports = Database;