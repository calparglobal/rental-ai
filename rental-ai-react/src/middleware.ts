import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, isSuperAdmin, isTenantUser, validateTenantAccess } from './lib/jwt'

// Protected routes configuration
const PROTECTED_ROUTES = {
  // Super Admin routes
  SUPER_ADMIN: [
    '/super-admin',
    '/api/super-admin'
  ],
  
  // Tenant routes
  TENANT: [
    '/dashboard',
    '/properties',
    '/customers',
    '/agreements',
    '/assets',
    '/reports',
    '/settings',
    '/api/tenant'
  ],
  
  // Public routes (no authentication required)
  PUBLIC: [
    '/login',
    '/signup',
    '/super-admin/login',
    '/forgot-password',
    '/reset-password',
    '/api/auth/signin',
    '/api/auth/signup',
    '/api/super-admin/auth/signin',
    '/api/health',
    '/auth/health',
    '/'
  ]
}

// Tenant subdomain extraction
function extractTenantFromSubdomain(host: string): string | null {
  // Handle localhost and custom domains
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return null // Development mode - tenant determined by other means
  }

  // Extract subdomain from host (e.g., abc-cars.rentalai.com -> abc-cars)
  const parts = host.split('.')
  if (parts.length >= 3) {
    return parts[0]
  }
  
  return null
}

// Route access validation
function isPublicRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.PUBLIC.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
}

function isSuperAdminRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.SUPER_ADMIN.some(route => 
    pathname.startsWith(route)
  )
}

function isTenantRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.TENANT.some(route => 
    pathname.startsWith(route)
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''
  
  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next()
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Extract token from request
  const token = extractTokenFromRequest(request) || request.cookies.get('auth-token')?.value
  
  if (!token) {
    // No token - redirect to login
    return redirectToLogin(request)
  }

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    // Invalid token - redirect to login
    return redirectToLogin(request)
  }

  // Handle Super Admin routes
  if (isSuperAdminRoute(pathname)) {
    if (!isSuperAdmin(payload)) {
      return NextResponse.json(
        { error: 'Unauthorized: Super Admin access required' },
        { status: 403 }
      )
    }
    
    // Add super admin context to headers
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.user_id)
    response.headers.set('x-user-type', 'super_admin')
    response.headers.set('x-permissions', JSON.stringify(payload.permissions))
    
    return response
  }

  // Handle Tenant routes
  if (isTenantRoute(pathname)) {
    // Extract tenant context
    const tenantSubdomain = extractTenantFromSubdomain(host)
    let tenantId: string | null = null

    if (isTenantUser(payload)) {
      tenantId = payload.tenant_id
    } else if (isSuperAdmin(payload)) {
      // Super admin can access any tenant
      // For now, we'll need to determine tenant from subdomain or request
      // This could be enhanced to allow super admin to impersonate tenants
      tenantId = tenantSubdomain // This would need to be resolved to actual tenant ID
    }

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant context required' },
        { status: 400 }
      )
    }

    // Validate tenant access
    if (isTenantUser(payload) && !validateTenantAccess(payload, tenantId)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid tenant access' },
        { status: 403 }
      )
    }

    // Add tenant context to headers
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.user_id)
    response.headers.set('x-user-type', payload.user_type)
    response.headers.set('x-tenant-id', tenantId)
    response.headers.set('x-permissions', JSON.stringify(payload.permissions))
    
    if (isTenantUser(payload)) {
      response.headers.set('x-user-role', payload.role)
    }

    return response
  }

  // Default: allow the request
  return NextResponse.next()
}

// Helper function to redirect to login
function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

// Helper function to extract token from request
function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return null

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader
  return token
}

// Configure which routes should be processed by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    '/api/((?!auth/signin|auth/signup|super-admin/auth/signin).*)'
  ]
}