import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

// Check if we're in production and have database environment variables
const isProduction = process.env.NODE_ENV === 'production'
const hasDBConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL

console.log('Database config check:', {
  isProduction,
  hasDBConfig: !!hasDBConfig,
  nodeEnv: process.env.NODE_ENV,
  hasPostgresUrl: !!process.env.POSTGRES_URL,
  hasDatabaseUrl: !!process.env.DATABASE_URL
})

export interface User {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: string
  created_at: Date
}

export interface Property {
  id: number
  owner_id: number
  title: string
  city: string
  state: string
  rent_amount: number
  bedrooms: number
  bathrooms: number
  is_available: boolean
}

export interface DashboardStats {
  totalProperties: number
  availableProperties: number
  totalUsers: number
  monthlyRevenue: number
}

// Test database connection
export async function testConnection() {
  try {
    console.log('Testing database connection...')
    const result = await sql`SELECT 1 as test`
    console.log('Database connection successful:', result.rows)
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    throw error
  }
}

// Initialize database tables if they don't exist
export async function initDatabase() {
  try {
    console.log('Starting database initialization...')
    
    // Test connection first
    await testConnection()
    
    console.log('Creating users table...')
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'tenant',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Creating properties table...')
    // Create properties table
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        rent_amount INTEGER NOT NULL,
        bedrooms INTEGER DEFAULT 0,
        bathrooms INTEGER DEFAULT 0,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Checking for existing users...')
    // Insert sample data if tables are empty
    const userCount = await sql`SELECT COUNT(*) FROM users`
    console.log('User count:', userCount.rows[0].count)
    
    if (userCount.rows[0].count === '0') {
      console.log('Inserting sample users...')
      const hashedPassword = await bcrypt.hash('password', 10)
      
      await sql`
        INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
        ('owner@example.com', ${hashedPassword}, 'John', 'Smith', 'owner'),
        ('tenant@example.com', ${hashedPassword}, 'Jane', 'Doe', 'tenant'),
        ('admin@example.com', ${hashedPassword}, 'Admin', 'User', 'admin')
      `

      console.log('Inserting sample properties...')
      await sql`
        INSERT INTO properties (owner_id, title, city, state, rent_amount, bedrooms, bathrooms) VALUES
        (1, 'Modern Downtown Apartment', 'San Francisco', 'CA', 3500, 2, 2),
        (1, 'Cozy Studio Near Campus', 'Berkeley', 'CA', 1800, 0, 1),
        (1, 'Luxury Penthouse', 'New York', 'NY', 8500, 3, 3),
        (1, 'Family House with Garden', 'Austin', 'TX', 2800, 4, 3),
        (1, 'Waterfront Condo', 'Miami', 'FL', 4200, 2, 2),
        (1, 'Mountain View Cabin', 'Denver', 'CO', 2200, 3, 2)
      `
      console.log('Sample data inserted successfully')
    }

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    throw error
  }
}

// User authentication functions
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    
    if (result.rows.length === 0) {
      return null
    }
    
    const user = result.rows[0] as User
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    
    if (!passwordMatch) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Authentication error:', error)
    throw error
  }
}

export async function createUser(userData: {
  email: string
  password: string
  first_name: string
  last_name: string
  role?: string
}): Promise<User> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES (${userData.email}, ${hashedPassword}, ${userData.first_name}, ${userData.last_name}, ${userData.role || 'tenant'})
      RETURNING *
    `
    
    return result.rows[0] as User
  } catch (error) {
    console.error('User creation error:', error)
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    
    return result.rows.length > 0 ? (result.rows[0] as User) : null
  } catch (error) {
    console.error('Get user error:', error)
    throw error
  }
}

// Property functions
export async function getProperties(): Promise<Property[]> {
  try {
    const result = await sql`
      SELECT * FROM properties ORDER BY created_at DESC
    `
    
    return result.rows as Property[]
  } catch (error) {
    console.error('Get properties error:', error)
    throw error
  }
}

// Dashboard stats
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [propertiesResult, availableResult, usersResult] = await Promise.all([
      sql`SELECT COUNT(*) FROM properties`,
      sql`SELECT COUNT(*) FROM properties WHERE is_available = true`,
      sql`SELECT COUNT(*) FROM users`
    ])
    
    return {
      totalProperties: parseInt(propertiesResult.rows[0].count),
      availableProperties: parseInt(availableResult.rows[0].count),
      totalUsers: parseInt(usersResult.rows[0].count),
      monthlyRevenue: 15400 // Mock value for now
    }
  } catch (error) {
    console.error('Dashboard stats error:', error)
    throw error
  }
}