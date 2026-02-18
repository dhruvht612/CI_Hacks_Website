import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './EventInfo.css'

export default function EventInfo() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.dataset.section))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const faqs = [
    {
      id: 1,
      q: 'Who can participate?',
      a: 'CI Hacks is open to developers, designers, and innovators of all skill levels. Whether you\'re a beginner or experienced builder, you\'re welcome to join.',
    },
    {
      id: 2,
      q: 'Do I need a team?',
      a: 'You can participate solo or form a team. Team formation typically happens at the event, or you can coordinate beforehand via our Discord community.',
    },
    {
      id: 3,
      q: 'What do I need to bring?',
      a: 'Bring your laptop, charger, and enthusiasm. Food and drinks will be provided. Check the venue section for full details.',
    },
    {
      id: 4,
      q: 'Is there a cost to participate?',
      a: 'CI Hacks is free to attend. Registration is required to secure your spot.',
    },
  ]

  return (
    <div className="event-info">
      {/* Hero Banner */}
      <section className="event-info__hero" data-section="hero">
        <div className="event-info__hero-content">
          <span className="event-info__badge">April 12–14, 2025</span>
          <h1 className="event-info__hero-title">CI Hacks 2025</h1>
          <p className="event-info__hero-subtitle">
            A 72-hour hackathon where builders come together to create, connect, and innovate.
          </p>
          <div className="event-info__hero-meta">
            <span className="event-info__meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              In-person event
            </span>
            <span className="event-info__meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              San Francisco Bay Area
            </span>
          </div>
        </div>
        <a
          href="#event-highlights"
          className="event-info__hero-scroll"
          aria-label="Scroll to event highlights"
        >
          <span className="event-info__hero-scroll-arrow" aria-hidden="true" />
          Scroll
        </a>
      </section>

      {/* Event Highlights */}
      <section
        id="event-highlights"
        className={`event-info__highlights ${visibleSections.has('highlights') ? 'event-info__section--visible' : ''}`}
        data-section="highlights"
      >
        <h2 className="event-info__section-title">Event Highlights</h2>
        <div className="event-info__cards">
          <article className="event-info__card">
            <span className="event-info__card-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>
            <h3>Learn & Build</h3>
            <p>Work on real-world challenges with mentorship from industry experts and hands-on workshops.</p>
          </article>
          <article className="event-info__card">
            <span className="event-info__card-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <h3>Connect</h3>
            <p>Network with fellow participants, sponsors, and mentors. Expand your professional community.</p>
          </article>
          <article className="event-info__card">
            <span className="event-info__card-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
              </svg>
            </span>
            <h3>Innovate</h3>
            <p>Turn your ideas into prototypes in a collaborative, supportive environment built for creativity.</p>
          </article>
        </div>
      </section>

      {/* Schedule link */}
      <section
        className={`event-info__schedule-link ${visibleSections.has('schedule') ? 'event-info__section--visible' : ''}`}
        data-section="schedule"
      >
        <h2 className="event-info__section-title">Full Schedule</h2>
        <p className="event-info__schedule-desc">
          View the complete day-by-day schedule with times, locations, and activities.
        </p>
        <Link to="/schedule" className="event-info__schedule-btn">
          View Schedule
        </Link>
      </section>

      {/* Venue */}
      <section
        className={`event-info__venue ${visibleSections.has('venue') ? 'event-info__section--visible' : ''}`}
        data-section="venue"
      >
        <h2 className="event-info__section-title">Venue & Format</h2>
        <div className="event-info__venue-card">
          <div className="event-info__venue-main">
            <h3>In-Person Hackathon</h3>
            <p>
              CI Hacks 2025 will be held at a central venue in the San Francisco Bay Area. Exact location will be
              shared with registered participants ahead of the event. Food, drinks, and Wi-Fi will be provided.
            </p>
          </div>
          <div className="event-info__venue-perks">
            <span className="event-info__perk">🍕 Meals & snacks</span>
            <span className="event-info__perk">📶 High-speed Wi-Fi</span>
            <span className="event-info__perk">🔌 Power outlets</span>
            <span className="event-info__perk">🛋️ Rest areas</span>
          </div>
        </div>
      </section>

      {/* Key Dates */}
      <section
        className={`event-info__dates ${visibleSections.has('dates') ? 'event-info__section--visible' : ''}`}
        data-section="dates"
      >
        <h2 className="event-info__section-title">Key Dates</h2>
        <ul className="event-info__dates-list">
          <li>
            <strong>Registration Opens</strong>
            <span>Now</span>
          </li>
          <li>
            <strong>Registration Deadline</strong>
            <span>March 15, 2025</span>
          </li>
          <li>
            <strong>Event Dates</strong>
            <span>April 12–14, 2025</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section
        className={`event-info__faq ${visibleSections.has('faq') ? 'event-info__section--visible' : ''}`}
        data-section="faq"
      >
        <h2 className="event-info__section-title">FAQ</h2>
        <div className="event-info__faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`event-info__faq-item ${expandedFaq === faq.id ? 'event-info__faq-item--open' : ''}`}
            >
              <button
                type="button"
                className="event-info__faq-trigger"
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                aria-expanded={expandedFaq === faq.id}
              >
                {faq.q}
                <span className="event-info__faq-icon" aria-hidden="true" />
              </button>
              <div className="event-info__faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className={`event-info__cta ${visibleSections.has('cta') ? 'event-info__section--visible' : ''}`}
        data-section="cta"
      >
        <h2>Ready to join?</h2>
        <p>Create your account, complete your profile, and apply today.</p>
        <Link to="/sign-up" className="event-info__btn">
          Get Started
        </Link>
      </section>
    </div>
  )
}
