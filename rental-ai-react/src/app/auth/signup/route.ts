import { NextRequest, NextResponse } from 'next/server'
import { createTenantUser, initMultiTenantDatabase } from '@/lib/database-multitenant'
import { generateTenantUserToken, getRolePermissions } from '@/lib/jwt'

const BACKEND_URL = 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In development, proxy to local backend
    if (process.env.NODE_ENV === 'development') {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
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
    const { email, password, first_name, last_name, role, tenant_id } = body
    
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Check if we have database connection
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
      
      // For now, use the first tenant if no tenant_id is provided
      // In a real app, this would be determined by subdomain or invitation
      let actualTenantId = tenant_id
      if (!actualTenantId) {
        // Default to first tenant for demo purposes
        actualTenantId = '1'
      }
      
      // Create new tenant user
      const newUser = await createTenantUser({
        tenant_id: actualTenantId,
        email,
        password,
        first_name,
        last_name,
        role: role || 'employee',
        permissions: getRolePermissions(role || 'employee')
      })
      
      // Generate JWT token
      const token = generateTenantUserToken({
        user_id: newUser.id,
        tenant_id: parseInt(actualTenantId),
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions
      })
      
      return NextResponse.json({
        message: 'Registration successful',
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          role: newUser.role,
          tenant_id: newUser.tenant_id
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}