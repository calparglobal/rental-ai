import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    console.log('Initializing database tables...')
    
    // Create super_admins table
    await sql`
      CREATE TABLE IF NOT EXISTS super_admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        permissions JSONB DEFAULT '["platform_management", "tenant_management", "user_management", "system_analytics"]',
        status VARCHAR(20) DEFAULT 'active',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Check if super admin already exists
    const existingAdmin = await sql`SELECT COUNT(*) FROM super_admins WHERE email = 'superadmin@rentalai.com'`
    
    if (existingAdmin.rows[0].count === '0') {
      // Create super admin
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      await sql`
        INSERT INTO super_admins (email, password_hash, first_name, last_name) 
        VALUES ('superadmin@rentalai.com', ${hashedPassword}, 'Super', 'Admin')
      `
      
      console.log('Super admin created successfully')
    } else {
      console.log('Super admin already exists')
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}