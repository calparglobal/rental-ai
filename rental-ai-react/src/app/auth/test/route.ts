import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Auth test endpoint working!', 
    timestamp: new Date().toISOString(),
    url: request.url 
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Auth POST test endpoint working!', 
    timestamp: new Date().toISOString(),
    url: request.url 
  })
}