import { NextResponse } from 'next/server'
import { getDashboardStats, initDatabase } from '@/lib/database'

const BACKEND_URL = 'http://localhost:3001/api'

export async function GET() {
  try {
    // In development, proxy to local backend
    if (process.env.NODE_ENV === 'development') {
      const response = await fetch(`${BACKEND_URL}/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status })
      }

      return NextResponse.json(data)
    }
    
    // In production, use Vercel Postgres database
    try {
      await initDatabase()
      const stats = await getDashboardStats()
      return NextResponse.json(stats)
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}