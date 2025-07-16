import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // Redirect to the correct auth endpoint
  const body = await request.json()
  
  // Forward to the correct signin endpoint
  const response = await fetch(`${request.nextUrl.origin}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}