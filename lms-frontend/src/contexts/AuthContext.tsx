import { createContext, type ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

type SignInCredentials = {
  email: string
  password: string
}

interface AuthContextData {
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('lms_token')
    if (token) {
      setIsAuthenticated(true)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/auth/login', { email, password })

    const { token } = response.data

    localStorage.setItem('lms_token', token)
    setIsAuthenticated(true)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function signOut() {
    localStorage.removeItem('lms_token')
    setIsAuthenticated(false)
    api.defaults.headers.common['Authorization'] = ''
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
