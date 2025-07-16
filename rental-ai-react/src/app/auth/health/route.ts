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

    // Test database connection and initialize multi-tenant schema in production
    await testConnection()
    await initMultiTenantDatabase()
    
    return NextResponse.json({ 
      status: 'healthy', 
      environment: 'production',
      database: 'connected',
      architecture: 'multi-tenant',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        environment: process.env.NODE_ENV,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}