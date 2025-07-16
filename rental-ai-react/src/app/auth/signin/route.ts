import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    // In development, try to use local backend
    if (process.env.NODE_ENV === 'development') {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
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
    
    // Production or fallback mode - use hardcoded demo users
    const demoUsers = [
      { id: 1, email: 'admin@demo.com', password: 'admin123', first_name: 'Demo', last_name: 'Admin', role: 'admin' },
      { id: 2, email: 'user@demo.com', password: 'user123', first_name: 'Demo', last_name: 'User', role: 'tenant' },
      { id: 3, email: 'owner@demo.com', password: 'owner123', first_name: 'Demo', last_name: 'Owner', role: 'owner' }
    ]
    
    const user = demoUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Generate a simple JWT-like token for demo
    const token = `demo-token-${user.id}-${Date.now()}`
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 500 }
    )
  }
}