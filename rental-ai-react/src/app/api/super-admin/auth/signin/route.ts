import { NextRequest, NextResponse } from 'next/server'
import { authenticateSuperAdmin, initMultiTenantDatabase } from '@/lib/database-multitenant'
import { generateSuperAdminToken, getRolePermissions } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if we're in development mode without database connection
    const hasDBConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL
    
    if (!hasDBConfig) {
      // In development without database, use hardcoded super admin for testing
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
    }

    // With database connection, use normal authentication
    try {
      // Initialize database if needed
      await initMultiTenantDatabase()
      
      // Authenticate super admin
      const superAdmin = await authenticateSuperAdmin(email, password)

      if (!superAdmin) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Generate JWT token
      const token = generateSuperAdminToken({
        user_id: superAdmin.id,
        email: superAdmin.email,
        permissions: superAdmin.permissions || getRolePermissions('super_admin')
      })

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: superAdmin.id,
          email: superAdmin.email,
          first_name: superAdmin.first_name,
          last_name: superAdmin.last_name,
          permissions: superAdmin.permissions || getRolePermissions('super_admin'),
          user_type: 'super_admin'
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
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