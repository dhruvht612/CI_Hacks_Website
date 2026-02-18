import { useState } from 'react'
import './Schedule.css'

const COLUMNS = ['Time', 'Big Event', 'Sponsor Workshop', 'Other Workshop', 'Activities #1', 'Activities #2', 'Food']

const EVENTS = [
  { day: 0, start: '5:00 PM', end: '6:30 PM', col: 'big', title: 'Registration', location: 'Main Atrium' },
  { day: 0, start: '5:00 PM', end: '6:30 PM', col: 'sponsor', title: 'Sponsor: Hacker Refuel', location: 'Main Atrium' },
  { day: 0, start: '5:00 PM', end: '6:00 PM', col: 'activities1', title: 'Icebreakers', location: 'Room 1120' },
  { day: 0, start: '6:30 PM', end: '7:00 PM', col: 'big', title: 'OPENING CEREMONY', location: 'Main Hall' },
  { day: 0, start: '7:00 PM', end: '8:00 PM', col: 'other', title: 'Acing the Technical Interview', location: 'Room 1350' },
  { day: 0, start: '8:00 PM', end: '10:30 PM', col: 'big', title: 'Hacking Begins @ 8PM', location: 'All Areas' },
  { day: 0, start: '8:00 PM', end: '9:00 PM', col: 'food', title: 'Dinner', location: 'Room 2140' },
  { day: 0, start: '9:00 PM', end: '10:00 PM', col: 'activities1', title: 'Karaoke', location: 'Room 1220' },
  { day: 1, start: '8:00 AM', end: '9:00 AM', col: 'food', title: 'Breakfast', location: 'Room 2140' },
  { day: 1, start: '9:00 AM', end: '10:00 AM', col: 'sponsor', title: 'Sponsor Workshop: APIs & Tools', location: 'Room 1350' },
  { day: 1, start: '9:00 AM', end: '9:30 AM', col: 'activities2', title: 'Morning Yoga', location: 'Courtyard' },
  { day: 1, start: '10:00 AM', end: '11:00 AM', col: 'other', title: 'Intro to AI/ML', location: 'Room 1350' },
  { day: 1, start: '12:00 PM', end: '1:00 PM', col: 'food', title: 'Lunch', location: 'Room 2140' },
  { day: 1, start: '2:00 PM', end: '4:00 PM', col: 'big', title: 'Office Hours with Mentors', location: 'All Areas' },
  { day: 1, start: '6:00 PM', end: '7:00 PM', col: 'food', title: 'Dinner', location: 'Room 2140' },
  { day: 1, start: '8:00 PM', end: '10:00 PM', col: 'activities1', title: 'Game Night', location: 'Room 1220' },
  { day: 2, start: '8:00 AM', end: '9:00 AM', col: 'food', title: 'Breakfast', location: 'Room 2140' },
  { day: 2, start: '10:00 AM', end: '11:00 AM', col: 'big', title: 'Project Submissions Close', location: 'Online' },
  { day: 2, start: '11:00 AM', end: '1:00 PM', col: 'big', title: 'Project Demos', location: 'Main Hall' },
  { day: 2, start: '1:00 PM', end: '2:00 PM', col: 'food', title: 'Lunch', location: 'Room 2140' },
  { day: 2, start: '2:00 PM', end: '3:30 PM', col: 'big', title: 'CLOSING CEREMONY', location: 'Main Hall' },
]

const DAYS = ['Friday, April 12', 'Saturday, April 13', 'Sunday, April 14']

const COL_INDEX = { big: 1, sponsor: 2, other: 3, activities1: 4, activities2: 5, food: 6 }

function toMinutes(t) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return 0
  let h = parseInt(m[1], 10)
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0
  return h * 60 + parseInt(m[2] || 0, 10)
}

function getSlots(dayEvents) {
  const times = new Set()
  dayEvents.forEach((e) => {
    times.add(e.start)
    const startM = toMinutes(e.start)
    const endM = toMinutes(e.end)
    let m = startM + 30
    while (m < endM) {
      const h = Math.floor(m / 60)
      const mm = m % 60
      const am = h < 12
      times.add(`${h % 12 || 12}:${mm.toString().padStart(2, '0')} ${am ? 'AM' : 'PM'}`)
      m += 30
    }
  })
  return [...times].sort((a, b) => toMinutes(a) - toMinutes(b))
}

export default function Schedule() {
  const [compact, setCompact] = useState(false)

  return (
    <div className={`schedule ${compact ? 'schedule--compact' : ''}`}>
      <div className="schedule__toolbar">
        <button
          type="button"
          className="schedule__view-toggle"
          onClick={() => setCompact((c) => !c)}
        >
          {compact ? 'Expanded view' : 'Compact view'}
        </button>
      </div>

      <div className="schedule__content">
        {DAYS.map((dayLabel, dayIdx) => {
          const dayEvents = EVENTS.filter((e) => e.day === dayIdx)
          const slots = getSlots(dayEvents)

          const occupied = {}
          slots.forEach((_, i) => {
            occupied[i] = {}
          })

          return (
            <section key={dayIdx} className="schedule__day">
              <h2 className="schedule__day-title">{dayLabel}</h2>
              <div className="schedule__grid-wrapper">
                <table className="schedule__table">
                  <thead>
                    <tr>
                      {COLUMNS.map((col) => (
                        <th key={col} className="schedule__header-cell">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slotTime, rowIdx) => (
                      <tr key={slotTime} className="schedule__slot-row">
                        <td className="schedule__time-cell">{slotTime}</td>
                        {[1, 2, 3, 4, 5, 6].map((colIdx) => {
                          if (occupied[rowIdx]?.[colIdx]) return null

                          const ev = dayEvents.find(
                            (e) =>
                              e.start === slotTime &&
                              COL_INDEX[e.col] === colIdx
                          )

                          let rowSpan = 1
                          if (ev) {
                            const startM = toMinutes(ev.start)
                            const endM = toMinutes(ev.end)
                            rowSpan = Math.max(1, Math.ceil((endM - startM) / 30))
                            for (let r = 0; r < rowSpan; r++) {
                              if (!occupied[rowIdx + r]) occupied[rowIdx + r] = {}
                              occupied[rowIdx + r][colIdx] = true
                            }
                          }

                          return (
                            <td
                              key={colIdx}
                              className="schedule__event-cell"
                              rowSpan={ev ? rowSpan : 1}
                              colSpan={ev ? 1 : 1}
                            >
                              {ev ? (
                                <div className="schedule__event-card">
                                  <h3 className="schedule__event-title">{ev.title}</h3>
                                  <p className="schedule__event-meta">
                                    <span className="schedule__event-time">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                      </svg>
                                      {ev.start} – {ev.end}
                                    </span>
                                    <span className="schedule__event-location">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                      </svg>
                                      {ev.location}
                                    </span>
                                  </p>
                                </div>
                              ) : null}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
