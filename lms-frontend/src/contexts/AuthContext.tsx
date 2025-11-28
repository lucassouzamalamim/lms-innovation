import { createContext, type ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'
import { jwtDecode } from 'jwt-decode'

type SignInCredentials = {
  email: string
  password: string
}

type User = {
  email: string
  role: string
  exp: number
}

interface AuthContextData {
  isAuthenticated: boolean
  user: User | null
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('lms_token')
    if (token) {
      try {
        const decoded = jwtDecode<User>(token)
        setUser(decoded)
        setIsAuthenticated(true)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        signOut()
      }
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/auth/login', { email, password })

    const { token } = response.data

    localStorage.setItem('lms_token', token)

    const decoded = jwtDecode<User>(token)
    setUser(decoded)
    setIsAuthenticated(true)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function signOut() {
    localStorage.removeItem('lms_token')
    setIsAuthenticated(false)
    setUser(null)
    api.defaults.headers.common['Authorization'] = ''
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
