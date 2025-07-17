import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Debug test endpoint working!', 
    timestamp: new Date().toISOString(),
    middlewareDisabled: 'middleware.ts file should be removed',
    url: request.url 
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Debug POST endpoint working!', 
    timestamp: new Date().toISOString(),
    middlewareDisabled: 'middleware.ts file should be removed',
    url: request.url 
  })
}