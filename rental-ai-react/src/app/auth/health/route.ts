import { NextResponse } from 'next/server'
import { testConnection, initMultiTenantDatabase } from '@/lib/database-multitenant'

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        status: 'healthy', 
        environment: 'development',
        database: 'local backend',
        architecture: 'multi-tenant'
      })
    }

    // Test database connection first
    console.log('Testing database connection...')
    await testConnection()
    console.log('Database connection successful')
    
    // Return success without initializing database for now
    return NextResponse.json({ 
      status: 'healthy', 
      environment: 'production',
      database: 'connected',
      architecture: 'multi-tenant',
      note: 'Database initialization skipped for testing',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        environment: process.env.NODE_ENV,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : 'No stack trace',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}