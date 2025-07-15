const { Pool } = require('pg');
const { sql } = require('@vercel/postgres');

class PostgresDatabase {
    constructor() {
        // Use Vercel Postgres in production, local PostgreSQL in development
        this.isVercel = process.env.VERCEL || process.env.POSTGRES_URL;
        
        if (this.isVercel) {
            // Vercel Postgres connection
            this.db = sql;
            console.log('Connected to Vercel Postgres');
        } else {
            // Local PostgreSQL connection
            this.pool = new Pool({
                user: process.env.POSTGRES_USER || 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                database: process.env.POSTGRES_DB || 'rental_ai',
                password: process.env.POSTGRES_PASSWORD || 'password',
                port: process.env.POSTGRES_PORT || 5432,
            });
            console.log('Connected to local PostgreSQL');
        }
    }

    async query(text, params = []) {
        if (this.isVercel) {
            // Vercel Postgres query
            if (params.length > 0) {
                return await sql.query(text, params);
            } else {
                return await sql.query(text);
            }
        } else {
            // Local PostgreSQL query
            const client = await this.pool.connect();
            try {
                const result = await client.query(text, params);
                return { rows: result.rows, rowCount: result.rowCount };
            } finally {
                client.release();
            }
        }
    }

    async initializeDatabase() {
        try {
            const schema = `
                -- Users table (property owners, tenants, admins)
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    phone VARCHAR(20),
                    role VARCHAR(20) CHECK(role IN ('owner', 'tenant', 'admin')) DEFAULT 'tenant',
                    profile_image VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                -- Properties table
                CREATE TABLE IF NOT EXISTS properties (
                    id SERIAL PRIMARY KEY,
                    owner_id INTEGER NOT NULL REFERENCES users(id),
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    property_type VARCHAR(20) CHECK(property_type IN ('apartment', 'house', 'condo', 'studio', 'room')) NOT NULL,
                    address TEXT NOT NULL,
                    city VARCHAR(100) NOT NULL,
                    state VARCHAR(50) NOT NULL,
                    zipcode VARCHAR(20) NOT NULL,
                    country VARCHAR(50) DEFAULT 'US',
                    latitude DECIMAL(10, 8),
                    longitude DECIMAL(11, 8),
                    bedrooms INTEGER DEFAULT 0,
                    bathrooms DECIMAL(3,1) DEFAULT 0,
                    square_feet INTEGER,
                    rent_amount DECIMAL(10, 2) NOT NULL,
                    security_deposit DECIMAL(10, 2),
                    available_from DATE,
                    is_available BOOLEAN DEFAULT TRUE,
                    furnished BOOLEAN DEFAULT FALSE,
                    pets_allowed BOOLEAN DEFAULT FALSE,
                    smoking_allowed BOOLEAN DEFAULT FALSE,
                    utilities_included JSONB DEFAULT '[]',
                    amenities JSONB DEFAULT '[]',
                    images JSONB DEFAULT '[]',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                -- Applications table
                CREATE TABLE IF NOT EXISTS applications (
                    id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(id),
                    tenant_id INTEGER NOT NULL REFERENCES users(id),
                    status VARCHAR(20) CHECK(status IN ('pending', 'approved', 'rejected', 'withdrawn')) DEFAULT 'pending',
                    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    move_in_date DATE,
                    income_amount DECIMAL(10, 2),
                    employment_info JSONB,
                    reference_info JSONB,
                    additional_notes TEXT
                );

                -- Leases table
                CREATE TABLE IF NOT EXISTS leases (
                    id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(id),
                    tenant_id INTEGER NOT NULL REFERENCES users(id),
                    application_id INTEGER REFERENCES applications(id),
                    lease_start DATE NOT NULL,
                    lease_end DATE NOT NULL,
                    monthly_rent DECIMAL(10, 2) NOT NULL,
                    security_deposit DECIMAL(10, 2),
                    status VARCHAR(20) CHECK(status IN ('active', 'expired', 'terminated')) DEFAULT 'active',
                    lease_document VARCHAR(255),
                    signed_date TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                -- Payments table
                CREATE TABLE IF NOT EXISTS payments (
                    id SERIAL PRIMARY KEY,
                    lease_id INTEGER NOT NULL REFERENCES leases(id),
                    amount DECIMAL(10, 2) NOT NULL,
                    payment_date DATE NOT NULL,
                    due_date DATE NOT NULL,
                    payment_method VARCHAR(20) CHECK(payment_method IN ('credit_card', 'bank_transfer', 'check', 'cash')) NOT NULL,
                    status VARCHAR(20) CHECK(status IN ('pending', 'completed', 'failed', 'late')) DEFAULT 'pending',
                    late_fee DECIMAL(10, 2) DEFAULT 0,
                    transaction_id VARCHAR(255),
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                -- Maintenance requests table
                CREATE TABLE IF NOT EXISTS maintenance_requests (
                    id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(id),
                    tenant_id INTEGER NOT NULL REFERENCES users(id),
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    priority VARCHAR(20) CHECK(priority IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'medium',
                    category VARCHAR(20) CHECK(category IN ('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'other')) NOT NULL,
                    status VARCHAR(20) CHECK(status IN ('open', 'in_progress', 'completed', 'closed')) DEFAULT 'open',
                    images JSONB DEFAULT '[]',
                    assigned_to VARCHAR(255),
                    estimated_cost DECIMAL(10, 2),
                    actual_cost DECIMAL(10, 2),
                    completed_date TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                -- Insert sample data
                INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES 
                ('owner@example.com', '$2a$10$dummy.hash.here', 'John', 'Smith', '555-0123', 'owner'),
                ('tenant@example.com', '$2a$10$dummy.hash.here', 'Jane', 'Doe', '555-0456', 'tenant'),
                ('admin@example.com', '$2a$10$dummy.hash.here', 'Admin', 'User', '555-0789', 'admin')
                ON CONFLICT (email) DO NOTHING;

                INSERT INTO properties (owner_id, title, description, property_type, address, city, state, zipcode, bedrooms, bathrooms, square_feet, rent_amount, security_deposit, available_from, amenities) VALUES 
                (1, 'Modern Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with city views.', 'apartment', '123 Main St, Unit 4B', 'San Francisco', 'CA', '94102', 2, 2, 1200, 3500.00, 3500.00, '2025-08-01', '["gym", "pool", "parking", "laundry"]'),
                (1, 'Cozy Studio Near Campus', 'Perfect for students, walking distance to university.', 'studio', '456 College Ave', 'Berkeley', 'CA', '94704', 0, 1, 500, 1800.00, 1800.00, '2025-07-15', '["wifi", "furnished", "utilities_included"]')
                ON CONFLICT DO NOTHING;
            `;

            // Split into individual statements for better error handling
            const statements = schema.split(';').filter(stmt => stmt.trim());
            
            for (const statement of statements) {
                if (statement.trim()) {
                    await this.query(statement);
                }
            }
            
            console.log('PostgreSQL database initialized successfully');
        } catch (error) {
            console.error('Error initializing PostgreSQL database:', error);
            throw error;
        }
    }

    // Rental AI specific methods
    async getProperties() {
        const result = await this.query(`
            SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name
            FROM properties p
            JOIN users u ON p.owner_id = u.id
            WHERE p.is_available = true
            ORDER BY p.created_at DESC
        `);
        return result.rows;
    }

    async getPropertyById(id) {
        const result = await this.query(`
            SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name, u.email as owner_email
            FROM properties p
            JOIN users u ON p.owner_id = u.id
            WHERE p.id = $1
        `, [id]);
        return result.rows[0];
    }

    async createProperty(propertyData) {
        const result = await this.query(`
            INSERT INTO properties (
                owner_id, title, description, property_type, address, city, state, zipcode,
                bedrooms, bathrooms, square_feet, rent_amount, security_deposit, available_from,
                furnished, pets_allowed, smoking_allowed, utilities_included, amenities
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING id
        `, [
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
        ]);
        
        return { id: result.rows[0].id };
    }

    async getUserByEmail(email) {
        const result = await this.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async createUser(userData) {
        const result = await this.query(`
            INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `, [
            userData.email,
            userData.password_hash,
            userData.first_name,
            userData.last_name,
            userData.phone || null,
            userData.role || 'tenant'
        ]);
        
        return { id: result.rows[0].id };
    }

    async getDashboardStats() {
        const stats = {};
        
        // Total properties
        const totalProperties = await this.query('SELECT COUNT(*) as count FROM properties');
        stats.totalProperties = parseInt(totalProperties.rows[0].count);
        
        // Available properties
        const availableProperties = await this.query('SELECT COUNT(*) as count FROM properties WHERE is_available = true');
        stats.availableProperties = parseInt(availableProperties.rows[0].count);
        
        // Total users
        const totalUsers = await this.query('SELECT COUNT(*) as count FROM users');
        stats.totalUsers = parseInt(totalUsers.rows[0].count);
        
        // Active leases
        const activeLeases = await this.query('SELECT COUNT(*) as count FROM leases WHERE status = $1', ['active']);
        stats.activeLeases = parseInt(activeLeases.rows[0].count);
        
        // Monthly revenue
        const monthlyRevenue = await this.query(`
            SELECT COALESCE(SUM(amount), 0) as revenue 
            FROM payments 
            WHERE status = 'completed' 
            AND DATE_TRUNC('month', payment_date) = DATE_TRUNC('month', CURRENT_DATE)
        `);
        stats.monthlyRevenue = parseFloat(monthlyRevenue.rows[0].revenue) || 0;
        
        return stats;
    }

    async close() {
        if (!this.isVercel && this.pool) {
            await this.pool.end();
            console.log('PostgreSQL connection closed');
        }
    }
}

module.exports = PostgresDatabase;