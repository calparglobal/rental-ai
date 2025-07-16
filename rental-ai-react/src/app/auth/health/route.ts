import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/database'

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        status: 'healthy', 
        environment: 'development',
        database: 'local backend' 
      })
    }

    // Test database connection in production
    await testConnection()
    
    return NextResponse.json({ 
      status: 'healthy', 
      environment: 'production',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        environment: process.env.NODE_ENV,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}