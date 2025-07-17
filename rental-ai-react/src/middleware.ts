import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    '/api/init-db',
    '/auth/health',
    '/auth/signin',
    '/auth/signup',
    '/'
  ]
}

// Tenant subdomain extraction (unused - removed to avoid Edge Runtime issues)
// function extractTenantFromSubdomain(host: string): string | null {
//   // Handle localhost and custom domains
//   if (host.includes('localhost') || host.includes('127.0.0.1')) {
//     return null // Development mode - tenant determined by other means
//   }
//
//   // Extract subdomain from host (e.g., abc-cars.rentalai.com -> abc-cars)
//   const parts = host.split('.')
//   if (parts.length >= 3) {
//     return parts[0]
//   }
//   
//   return null
// }

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
  let token = extractTokenFromRequest(request)
  
  // Check for appropriate token based on route type
  if (!token) {
    if (isSuperAdminRoute(pathname)) {
      token = request.cookies.get('super-admin-token')?.value || null
    } else {
      token = request.cookies.get('auth-token')?.value || null
    }
  }
  
  if (!token) {
    // No token - redirect to appropriate login
    return redirectToLogin(request)
  }

  // In Edge Runtime, we can't verify JWT tokens with crypto module
  // So we'll let the API routes handle token verification
  // Just pass the token through and let endpoints validate
  const response = NextResponse.next()
  
  // Add basic token info to headers for API routes to use
  if (isSuperAdminRoute(pathname)) {
    response.headers.set('x-auth-token', token)
    response.headers.set('x-auth-type', 'super-admin')
  } else if (isTenantRoute(pathname)) {
    response.headers.set('x-auth-token', token)
    response.headers.set('x-auth-type', 'tenant')
  }
  
  return response
}

// Helper function to redirect to appropriate login
function redirectToLogin(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // If this is a Super Admin route, redirect to Super Admin login
  if (isSuperAdminRoute(pathname)) {
    const loginUrl = new URL('/super-admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Otherwise, redirect to regular tenant login
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
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
     * Temporarily disable middleware to fix auth issues
     * Only match very specific protected routes
     */
    '/dashboard/:path*',
    '/super-admin/dashboard/:path*'
  ]
}