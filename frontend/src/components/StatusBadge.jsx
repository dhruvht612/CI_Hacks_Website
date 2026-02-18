import './StatusBadge.css'

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    className: 'status-badge--pending',
  },
  accepted: {
    label: 'Accepted',
    className: 'status-badge--accepted',
  },
  rejected: {
    label: 'Rejected',
    className: 'status-badge--rejected',
  },
}

export default function StatusBadge({ status = 'pending', size = 'default' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending

  return (
    <span
      className={`status-badge ${config.className} status-badge--${size}`}
      role="status"
      aria-label={`Application status: ${config.label}`}
    >
      {config.label}
    </span>
  )
}
