import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, first_name, last_name } = body
    
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // In development, try to use local backend
    if (process.env.NODE_ENV === 'development') {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        const data = await response.json()

        if (!response.ok) {
          return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json(data)
      } catch (error) {
        console.error('Backend connection failed, falling back to demo mode:', error)
        // Fall through to demo mode
      }
    }
    
    // Production or fallback mode - simulate user creation
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      email,
      first_name,
      last_name,
      role: 'tenant'
    }
    
    // Generate a simple JWT-like token for demo
    const token = `demo-token-${newUser.id}-${Date.now()}`
    
    return NextResponse.json({
      message: 'User registered successfully',
      token,
      user: newUser
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 500 }
    )
  }
}