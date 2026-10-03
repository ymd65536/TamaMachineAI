export default function SearchFilters({ filters, onChange, onSubmit }) {
  const handleInput = (field) => (event) => {
    onChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  return (
    <div className="search-panel">
      <div className="search-header">
        <div>
          <p className="eyebrow">Tech Event Discovery</p>
          <h1>Cross-platform event discovery</h1>
        </div>
      </div>

      <div className="filter-grid">
        <label className="field">
          <span>Keyword</span>
          <input value={filters.keyword} onChange={handleInput('keyword')} placeholder="AI, Cloud, Kubernetes..." />
        </label>

        <label className="field">
          <span>Region</span>
          <select value={filters.region} onChange={handleInput('region')}>
            <option value="Tokyo">Tokyo</option>
            <option value="Osaka">Osaka</option>
            <option value="Yokohama">Yokohama</option>
            <option value="All">All</option>
          </select>
        </label>

        <label className="field">
          <span>From</span>
          <input type="date" value={filters.fromDate} onChange={handleInput('fromDate')} />
        </label>

        <label className="field">
          <span>To</span>
          <input type="date" value={filters.toDate} onChange={handleInput('toDate')} />
        </label>

        <label className="field">
          <span>Platform</span>
          <select value={filters.platform} onChange={handleInput('platform')}>
            <option value="all">All</option>
            <option value="connpass">connpass</option>
            <option value="Luma">Luma</option>
            <option value="Doorkeeper">Doorkeeper</option>
            <option value="Peatix">Peatix</option>
          </select>
        </label>

        <label className="field">
          <span>Mode</span>
          <select value={filters.onlineMode} onChange={handleInput('onlineMode')}>
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select value={filters.status} onChange={handleInput('status')}>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="limited">Limited</option>
            <option value="full">Full</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>

        <div className="search-actions">
          <button type="button" onClick={onSubmit}>Search</button>
        </div>
      </div>
    </div>
  );
}
