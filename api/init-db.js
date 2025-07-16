// Database initialization for Vercel Postgres
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
    try {
        // Create users table
        await pool.query(`
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
        await pool.query(`
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
        await pool.query(`
            INSERT INTO users (email, first_name, last_name, role, password_hash) 
            VALUES 
                ('owner@example.com', 'John', 'Owner', 'owner', '$2a$10$dummy.hash.here'),
                ('tenant@example.com', 'Jane', 'Tenant', 'tenant', '$2a$10$dummy.hash.here'),
                ('admin@example.com', 'Admin', 'User', 'admin', '$2a$10$dummy.hash.here')
            ON CONFLICT (email) DO NOTHING
        `);

        // Insert demo properties
        await pool.query(`
            INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, square_feet, owner_id, status)
            VALUES 
                ('Modern Downtown Apartment', 'Beautiful 2BR/2BA apartment in the heart of downtown', 3500.00, 'San Francisco, CA', 2, 2, 1200, 1, 'available'),
                ('Cozy Studio Near Campus', 'Perfect for students, close to university', 1800.00, 'Berkeley, CA', 1, 1, 600, 1, 'rented')
            ON CONFLICT DO NOTHING
        `);

        console.log('Database initialized successfully');
        return { success: true, message: 'Database initialized' };
    } catch (error) {
        console.error('Database initialization error:', error);
        return { success: false, error: error.message };
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = await initializeDatabase();
    
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
}