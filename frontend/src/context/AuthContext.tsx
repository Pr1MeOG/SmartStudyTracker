import React, { createContext, useContext, useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  is_admin?: boolean
}

type AuthContextType = {
  user: User | null
  token?: string
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: undefined,
  login: () => {},
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User
        setToken(savedToken)
        setUser(parsed)
      } catch (error) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  function login(newUser: User, newToken: string) {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
