import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import './Dashboard.css'

export default function Dashboard() {
  const { user, profile, status } = useAuth()

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Dashboard</h1>
        <p className="dashboard__greeting">
          Welcome back{profile?.firstName ? `, ${profile.firstName}` : ''}
        </p>
      </header>

      <section className="dashboard__status">
        <h2>Application Status</h2>
        <div className="dashboard__status-card">
          <StatusBadge status={status} size="large" />
          <p className="dashboard__status-message">
            {status === 'pending' && 'Your application is under review. We will notify you once a decision has been made.'}
            {status === 'accepted' && 'Congratulations! Your application has been accepted. Check your email for next steps.'}
            {status === 'rejected' && 'Thank you for your interest. Unfortunately, we are unable to offer you a spot at this time.'}
          </p>
        </div>
      </section>

      <section className="dashboard__actions">
        <h2>Quick Actions</h2>
        <div className="dashboard__action-cards">
          <Link to="/profile" className="dashboard__action-card">
            <span className="dashboard__action-icon" aria-hidden="true">Profile</span>
            <h3>{profile ? 'Edit Profile' : 'Complete Profile'}</h3>
            <p>
              {profile
                ? 'Update your participant information'
                : 'Add your details to complete your application'}
            </p>
          </Link>
        </div>
      </section>

      {!profile && (
        <div className="dashboard__alert">
          <p>
            <strong>Complete your profile</strong> to submit your application.
            Your application status will be set to pending once your profile is submitted.
          </p>
          <Link to="/profile" className="dashboard__alert-link">
            Go to Profile
          </Link>
        </div>
      )}

      <aside className="dashboard__info">
        <p><strong>Account:</strong> {user?.email}</p>
      </aside>
    </div>
  )
}
