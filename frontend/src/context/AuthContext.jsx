import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  user: 'cihacks_user',
  profile: 'cihacks_profile',
  status: 'cihacks_status',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.user)
    const storedProfile = localStorage.getItem(STORAGE_KEYS.profile)
    const storedStatus = localStorage.getItem(STORAGE_KEYS.status)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
        if (storedProfile) setProfile(JSON.parse(storedProfile))
        if (storedStatus) setStatus(storedStatus)
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user)
      }
    }
    setIsLoading(false)
  }, [])

  const signUp = (email, password) => {
    const newUser = { id: crypto.randomUUID(), email }
    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newUser))
  }

  const signIn = (email, password) => {
    const stored = localStorage.getItem(STORAGE_KEYS.user)
    if (!stored) return false
    const parsed = JSON.parse(stored)
    if (parsed.email !== email) return false
    setUser(parsed)
    const profileData = localStorage.getItem(STORAGE_KEYS.profile)
    if (profileData) setProfile(JSON.parse(profileData))
    const statusData = localStorage.getItem(STORAGE_KEYS.status)
    if (statusData) setStatus(statusData)
    return true
  }

  const signOut = () => {
    setUser(null)
    setProfile(null)
    setStatus('pending')
    localStorage.removeItem(STORAGE_KEYS.user)
    localStorage.removeItem(STORAGE_KEYS.profile)
    localStorage.removeItem(STORAGE_KEYS.status)
  }

  const updateProfile = (data) => {
    const newProfile = { ...profile, ...data, updatedAt: new Date().toISOString() }
    setProfile(newProfile)
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(newProfile))
    if (!profile) {
      setStatus('pending')
      localStorage.setItem(STORAGE_KEYS.status, 'pending')
    }
  }

  const value = {
    user,
    profile,
    status,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    hasProfile: !!profile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
