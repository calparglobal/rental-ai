import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Always allow auth API routes and authentication pages
  const publicRoutes = [
    '/',
    '/login',
    '/signup', 
    '/super-admin/login',
    '/auth/',
    '/api/',
    '/debug-test'
  ]
  
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )
  
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected dashboard routes, check for token
  if (pathname.startsWith('/super-admin/dashboard')) {
    const token = request.cookies.get('super-admin-token')?.value
    if (!token) {
      const loginUrl = new URL('/super-admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')?.value || request.cookies.get('rental_ai_token')?.value
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}