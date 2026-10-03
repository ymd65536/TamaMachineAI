import { useMemo, useState } from 'react';
import AnalyticsPanel from './components/AnalyticsPanel.jsx';
import EventCard from './components/EventCard.jsx';
import SearchFilters from './components/SearchFilters.jsx';
import { mockEvents } from './data/mockEvents.js';
import { summarizeByCategory, summarizeEvents } from './utils/analytics.js';
import { filterEvents, sortEvents } from './utils/searchAndFilter.js';
import { normalizeEvents } from './utils/normalizeEvents.js';

const addDays = (date, offset) => {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
};

const today = new Date();
const defaultFrom = today.toISOString().slice(0, 10);
const defaultTo = addDays(today, 30).toISOString().slice(0, 10);

const defaultFilters = {
  keyword: '',
  region: 'Tokyo',
  platform: 'all',
  onlineMode: 'all',
  status: 'all',
  fromDate: defaultFrom,
  toDate: defaultTo,
};

function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortKey, setSortKey] = useState('date');

  const normalizedEvents = useMemo(() => normalizeEvents(mockEvents), []);

  const filteredEvents = useMemo(() => {
    const scoped = filterEvents(normalizedEvents, {
      ...filters,
      fromDate: new Date(filters.fromDate),
      toDate: new Date(filters.toDate),
    });
    return sortEvents(scoped, sortKey);
  }, [filters, sortKey, normalizedEvents]);

  const summary = useMemo(() => summarizeEvents(filteredEvents), [filteredEvents]);
  const categoryBreakdown = useMemo(() => summarizeByCategory(filteredEvents), [filteredEvents]);

  const handleSearch = () => {
    return filteredEvents;
  };

  return (
    <div className="app-shell">
      <SearchFilters
        filters={filters}
        onChange={setFilters}
        onSubmit={handleSearch}
      />

      <div className="results-toolbar">
        <div className="summary-copy">
          <h2>Results</h2>
          <span>{filteredEvents.length} events matched</span>
        </div>

        <label className="sort-control">
          <span>Sort</span>
          <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
            <option value="date">Event date</option>
            <option value="applicants">Applicants</option>
            <option value="fillRate">Fill rate</option>
            <option value="relevance">Relevance</option>
          </select>
        </label>
      </div>

      <AnalyticsPanel summary={summary} categoryBreakdown={categoryBreakdown} />

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div className="empty-state">No matching events found for the selected filters.</div>
        )}
      </div>
    </div>
  );
}

export default App;
