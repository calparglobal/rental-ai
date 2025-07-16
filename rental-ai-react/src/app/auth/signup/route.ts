import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, initDatabase } from '@/lib/database'

const BACKEND_URL = 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In development, proxy to local backend
    if (process.env.NODE_ENV === 'development') {
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
    }
    
    // In production, use Vercel Postgres database
    const { email, password, first_name, last_name, role } = body
    
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    try {
      // Initialize database if needed
      await initDatabase()
      
      // Check if user already exists
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }
      
      // Create new user
      const newUser = await createUser({
        email,
        password,
        first_name,
        last_name,
        role: role || 'tenant'
      })
      
      // Generate JWT token
      const token = `jwt-token-${newUser.id}-${Date.now()}`
      
      return NextResponse.json({
        message: 'Registration successful',
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          role: newUser.role
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}