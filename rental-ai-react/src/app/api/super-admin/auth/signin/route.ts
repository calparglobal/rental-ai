import { NextRequest, NextResponse } from 'next/server'
import { authenticateSuperAdmin, initMultiTenantDatabase } from '@/lib/database-multitenant'
import { generateSuperAdminToken, getRolePermissions } from '@/lib/jwt'

export const runtime = 'nodejs'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if we're in production and try backend first
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_API_URL) {
      try {
        const response = await fetch(`${BACKEND_URL}/super-admin/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        // Only proceed if we get a proper JSON response
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json()
          return NextResponse.json(data)
        }
      } catch (fetchError) {
        console.error('Backend fetch error:', fetchError)
        // Fall through to local authentication
      }
    }

    // Development mode without database - use hardcoded super admin for testing
    if (email === 'superadmin@rentalai.com' && password === 'admin123') {
      const token = generateSuperAdminToken({
        user_id: 1,
        email: email,
        permissions: getRolePermissions('super_admin')
      })

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: 1,
          email: email,
          first_name: 'Super',
          last_name: 'Admin',
          permissions: getRolePermissions('super_admin'),
          user_type: 'super_admin'
        }
      })
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Super admin authentication error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}