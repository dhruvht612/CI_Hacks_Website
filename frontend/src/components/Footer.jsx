import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">CI Hacks</Link>
          <p className="footer__tagline">Build. Connect. Innovate.</p>
        </div>
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/event">Event</Link>
          <Link to="/sign-up">Register</Link>
          <a href="mailto:contact@cihacks.example">Contact</a>
        </div>
        <div className="footer__legal">
          <p>© {new Date().getFullYear()} CI Hacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
