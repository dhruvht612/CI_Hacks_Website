import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 })
  const [ctaHovered, setCtaHovered] = useState(false)
  const [ripples, setRipples] = useState([])
  const ctaRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePos({ x: x * 8, y: y * 8 })
    }
    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 })
      setCtaHovered(false)
    }

    const el = ctaRef.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    const handleBgMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setBgPos({ x, y })
    }
    const handleBgMouseLeave = () => {
      setBgPos({ x: 50, y: 50 })
    }

    const el = heroRef.current
    if (el) {
      el.addEventListener('mousemove', handleBgMouseMove)
      el.addEventListener('mouseleave', handleBgMouseLeave)
      return () => {
        el.removeEventListener('mousemove', handleBgMouseMove)
        el.removeEventListener('mouseleave', handleBgMouseLeave)
      }
    }
  }, [])

  const handleHeroClick = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setRipples((prev) => [
      ...prev.slice(-4),
      {
        id: Date.now(),
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      },
    ])
  }

  useEffect(() => {
    if (ripples.length === 0) return
    const t = setTimeout(() => setRipples((prev) => prev.slice(1)), 1200)
    return () => clearTimeout(t)
  }, [ripples])

  return (
    <div
      ref={heroRef}
      className="hero"
      onClick={handleHeroClick}
      role="presentation"
    >
      <div
        className="hero__bg"
        aria-hidden="true"
        style={{
          '--mouse-x': `${bgPos.x}%`,
          '--mouse-y': `${bgPos.y}%`,
        }}
      >
        <div className="hero__cursor-glow" aria-hidden="true" />
        <div className="hero__bg-shift" aria-hidden="true" />
        <div className="hero__bg-float hero__bg-float--1" aria-hidden="true" />
        <div className="hero__bg-float hero__bg-float--2" aria-hidden="true" />
        {ripples.map((r) => (
          <div
            key={r.id}
            className="hero__ripple"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
            aria-hidden="true"
          />
        ))}
        <div className="hero__particles" aria-hidden="true">
          <span className="hero__particle hero__particle--1" />
          <span className="hero__particle hero__particle--2" />
          <span className="hero__particle hero__particle--3" />
          <span className="hero__particle hero__particle--4" />
          <span className="hero__particle hero__particle--5" />
          <span className="hero__particle hero__particle--6" />
          <span className="hero__particle hero__particle--7 hero__particle--accent" />
          <span className="hero__particle hero__particle--8 hero__particle--accent" />
        </div>
      </div>
      <div className="hero__cityscape" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__meta hero__reveal" style={{ animationDelay: '0.1s' }}>April 12–14, 2025 | In-person event</p>
        <p className="hero__badge hero__reveal hero__pulse" style={{ animationDelay: '0.2s' }}>Hackathon 2025</p>
        <h1 className="hero__title hero__reveal" style={{ animationDelay: '0.35s' }}>
          Build the future at
          <span className="hero__title-accent"> CI Hacks</span>
        </h1>
        <p className="hero__subtitle hero__reveal" style={{ animationDelay: '0.5s' }}>
          Join developers, designers, and innovators for an immersive hackathon experience.
          Register now and take the first step toward bringing your ideas to life.
        </p>
        <div className="hero__cta hero__reveal" style={{ animationDelay: '0.65s' }}>
          <span
            ref={ctaRef}
            className="hero__btn-magnetic-wrap"
            onMouseEnter={() => setCtaHovered(true)}
          >
            <Link
              to="/sign-up"
              className="hero__btn hero__btn--primary"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y + (ctaHovered ? -4 : 0)}px)`,
              }}
            >
              Register Now
            </Link>
          </span>
          <Link to="/sign-in" className="hero__btn hero__btn--secondary">
            Sign In
          </Link>
        </div>
        <Link to="/event" className="hero__scroll-hint hero__reveal hero__link-underline" style={{ animationDelay: '0.8s' }} aria-label="View event details">
          <span className="hero__scroll-arrow" />
        </Link>
      </div>
    </div>
  )
}
