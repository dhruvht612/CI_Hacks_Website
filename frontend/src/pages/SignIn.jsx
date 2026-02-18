import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required.')
      return
    }

    if (!password) {
      setError('Password is required.')
      return
    }

    const success = signIn(email.trim(), password)
    if (success) {
      navigate(from, { replace: true })
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Sign In</h1>
        <p className="auth__subtitle">Access your CI Hacks account</p>

        <form onSubmit={handleSubmit} className="auth__form">
          {error && (
            <div className="auth__error" role="alert">
              {error}
            </div>
          )}

          <label className="auth__label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth__input"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth__label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth__input"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" className="auth__submit">
            Sign In
          </button>
        </form>

        <p className="auth__footer">
          Don&apos;t have an account? <Link to="/sign-up">Register</Link>
        </p>
      </div>
    </div>
  )
}
