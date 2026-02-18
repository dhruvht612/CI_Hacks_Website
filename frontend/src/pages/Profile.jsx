import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const DEFAULT_PROFILE = {
  firstName: '',
  lastName: '',
  phone: '',
  institution: '',
  major: '',
  graduationYear: '',
  linkedin: '',
  dietaryRestrictions: '',
}

export default function Profile() {
  const { profile, updateProfile, hasProfile } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(DEFAULT_PROFILE)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(profile ? { ...DEFAULT_PROFILE, ...profile } : { ...DEFAULT_PROFILE })
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    )
    updateProfile(trimmed)
    setSaved(true)
    if (!hasProfile) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="profile">
      <header className="profile__header">
        <h1>{hasProfile ? 'Edit Profile' : 'Complete Your Profile'}</h1>
        <p className="profile__subtitle">
          {hasProfile
            ? 'Update your participant information'
            : 'Provide your details to submit your application'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="profile__form">
        <section className="profile__section">
          <h2>Personal Information</h2>
          <div className="profile__fields">
            <label className="profile__label">
              First Name <span className="profile__required">*</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Jane"
              />
            </label>
            <label className="profile__label">
              Last Name <span className="profile__required">*</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </label>
          </div>
        </section>

        <section className="profile__section">
          <h2>Contact</h2>
          <div className="profile__fields">
            <label className="profile__label">
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </label>
            <label className="profile__label">
              LinkedIn
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </label>
          </div>
        </section>

        <section className="profile__section">
          <h2>Education</h2>
          <div className="profile__fields">
            <label className="profile__label">
              Institution
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University name"
              />
            </label>
            <label className="profile__label">
              Major / Field of Study
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </label>
            <label className="profile__label">
              Expected Graduation Year
              <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="2025"
              />
            </label>
          </div>
        </section>

        <section className="profile__section">
          <h2>Additional Information</h2>
          <div className="profile__fields">
            <label className="profile__label">
              Dietary Restrictions
              <input
                type="text"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                placeholder="Allergies, vegetarian, etc."
              />
            </label>
          </div>
        </section>

        <div className="profile__actions">
          {saved && (
            <p className="profile__saved" role="status">
              Profile saved successfully.
            </p>
          )}
          <div className="profile__buttons">
            <button type="submit" className="profile__submit">
              {hasProfile ? 'Save Changes' : 'Submit Profile'}
            </button>
            {hasProfile && (
              <button
                type="button"
                className="profile__cancel"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
