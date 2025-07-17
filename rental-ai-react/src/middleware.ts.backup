import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporarily disable middleware completely to fix auth issues
export async function middleware(request: NextRequest) {
  // Allow all requests to pass through without any processing
  return NextResponse.next()
}

// Configure which routes should be processed by middleware
// Disable middleware matcher completely
export const config = {
  matcher: []
}