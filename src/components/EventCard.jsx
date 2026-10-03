import { useMemo, useState } from 'react';
import { calculateFillRate } from '../utils/searchAndFilter.js';

const formatDate = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const buildStatusLabel = (status) => {
  const map = {
    open: 'Open',
    limited: 'Limited',
    full: 'Full',
    upcoming: 'Upcoming',
  };
  return map[status] || 'Open';
};

export default function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);
  const fillRate = useMemo(() => calculateFillRate(event), [event]);
  const listingCount = event.listings.length;
  const totalApplicants = event.listings.reduce((sum, listing) => sum + listing.applicants, 0);
  const totalCapacity = event.listings.reduce((sum, listing) => sum + listing.capacity, 0);

  return (
    <article className="event-card">
      <div className="card-topbar">
        <span className="category-pill">{event.category}</span>
        <div className="platform-flag">
          {event.platformCount} platforms
        </div>
      </div>

      <div className="card-header">
        <div>
          <h3>{event.title}</h3>
          <p className="event-date">{formatDate(event.startAt)}</p>
        </div>
        <span className={`status-pill ${event.overallStatus}`}>{buildStatusLabel(event.overallStatus)}</span>
      </div>

      <div className="meta-grid">
        <div>
          <span className="label">Location</span>
          <strong>{event.location}</strong>
        </div>
        <div>
          <span className="label">Organizer</span>
          <strong>{event.organizer}</strong>
        </div>
        <div>
          <span className="label">Capacity</span>
          <strong>{totalCapacity}</strong>
        </div>
        <div>
          <span className="label">Applicants</span>
          <strong>{totalApplicants}</strong>
        </div>
        <div>
          <span className="label">Fill rate</span>
          <strong>{fillRate}%</strong>
        </div>
        <div>
          <span className="label">Platform</span>
          <strong>{event.platforms.join(', ')}</strong>
        </div>
      </div>

      <div className="card-actions">
        <button type="button" className="expand-button" onClick={() => setExpanded((current) => !current)}>
          {expanded ? 'Hide listing details' : `View ${listingCount} listing${listingCount > 1 ? 's' : ''}`}
        </button>
        <a href={event.listings[0]?.url} target="_blank" rel="noreferrer">Event details</a>
      </div>

      {expanded && (
        <div className="platform-list">
          {event.listings.map((listing) => (
            <div key={`${event.id}-${listing.platform}`} className="platform-row">
              <div>
                <span className="platform-name">{listing.platform}</span>
                <span className="inline-status">{buildStatusLabel(listing.status)}</span>
              </div>
              <div className="platform-metrics">
                <span>{listing.capacity} cap</span>
                <span>{listing.applicants} applicants</span>
                <span>{listing.fillRate}% filled</span>
              </div>
              <a href={listing.url} target="_blank" rel="noreferrer">Open</a>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
