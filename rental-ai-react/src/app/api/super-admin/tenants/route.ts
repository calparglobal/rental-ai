import { NextRequest, NextResponse } from 'next/server'
import { getAllTenants, createTenant } from '@/lib/database-multitenant'
import { verifyToken, isSuperAdmin, hasPermission, PERMISSIONS } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    // Extract and verify token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload || !isSuperAdmin(payload)) {
      return NextResponse.json(
        { message: 'Super admin access required' },
        { status: 403 }
      )
    }

    if (!hasPermission(payload, PERMISSIONS.TENANT_MANAGEMENT)) {
      return NextResponse.json(
        { message: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const tenants = await getAllTenants()

    return NextResponse.json({
      success: true,
      tenants
    })

  } catch (error) {
    console.error('Get tenants error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload || !isSuperAdmin(payload)) {
      return NextResponse.json(
        { message: 'Super admin access required' },
        { status: 403 }
      )
    }

    if (!hasPermission(payload, PERMISSIONS.TENANT_MANAGEMENT)) {
      return NextResponse.json(
        { message: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { name, business_type, subdomain, contact_email, contact_phone, plan_type } = await request.json()

    if (!name || !business_type || !subdomain || !contact_email) {
      return NextResponse.json(
        { message: 'Name, business type, subdomain, and contact email are required' },
        { status: 400 }
      )
    }

    const tenant = await createTenant({
      name,
      business_type,
      subdomain,
      contact_email,
      contact_phone,
      plan_type
    })

    return NextResponse.json({
      success: true,
      tenant
    })

  } catch (error) {
    console.error('Create tenant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}