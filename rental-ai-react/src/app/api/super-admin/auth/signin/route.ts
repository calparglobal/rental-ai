import { NextRequest, NextResponse } from 'next/server'
import { authenticateSuperAdmin } from '@/lib/database-multitenant'
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

  } catch (error) {
    console.error('Super admin authentication error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}