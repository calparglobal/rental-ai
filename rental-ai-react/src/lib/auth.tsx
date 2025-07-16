'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// Types
interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface SignupData {
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
}

// API Configuration - Use Next.js routes as proxy (avoiding /api to prevent Vercel auth)
const API_BASE_URL = '/auth'

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth data from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('rental_ai_token')
    const savedUser = localStorage.getItem('rental_ai_user')

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        clearAuth()
      }
    }
    setIsLoading(false)
  }, [])

  // Clear authentication data
  const clearAuth = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('rental_ai_token')
    localStorage.removeItem('rental_ai_user')
  }

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Login failed')
        return false
      }

      // Save auth data
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('rental_ai_token', data.token)
      localStorage.setItem('rental_ai_user', JSON.stringify(data.user))

      toast.success('Login successful!')
      return true
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Network error. Please try again.')
      return false
    }
  }

  // Signup function
  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Signup failed')
        return false
      }

      // Save auth data
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('rental_ai_token', data.token)
      localStorage.setItem('rental_ai_user', JSON.stringify(data.user))

      toast.success('Account created successfully!')
      return true
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Network error. Please try again.')
      return false
    }
  }

  // Logout function
  const logout = () => {
    clearAuth()
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected route component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return <>{children}</>
}