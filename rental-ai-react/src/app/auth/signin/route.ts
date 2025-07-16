import { NextRequest, NextResponse } from 'next/server'
import { authenticateTenantUser, initMultiTenantDatabase } from '@/lib/database-multitenant'
import { generateTenantUserToken } from '@/lib/jwt'

const BACKEND_URL = 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    // In development, proxy to local backend
    if (process.env.NODE_ENV === 'development') {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status })
      }

      return NextResponse.json(data)
    }
    
    // In production, use multi-tenant database
    const hasDBConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL
    
    if (!hasDBConfig) {
      return NextResponse.json(
        { error: 'Database connection not configured' },
        { status: 500 }
      )
    }
    
    try {
      // Initialize database if needed
      await initMultiTenantDatabase()
      
      // Authenticate tenant user
      const user = await authenticateTenantUser(email, password)
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }
      
      // Generate JWT token
      const token = generateTenantUserToken({
        user_id: user.id,
        tenant_id: user.tenant_id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      })
      
      return NextResponse.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          tenant_id: user.tenant_id
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}