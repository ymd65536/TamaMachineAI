export default function AnalyticsPanel({ summary, categoryBreakdown }) {
  const summaryCards = [
    { label: 'Matching events', value: summary.totalEvents },
    { label: 'Total capacity', value: summary.totalCapacity },
    { label: 'Published applicants', value: summary.totalApplicants },
    { label: 'Platforms used', value: summary.platformCount },
  ];

  return (
    <div className="analytics-panel">
      <div className="analytics-summary">
        {summaryCards.map((card) => (
          <div key={card.label} className="kpi-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <div className="category-panel">
        <h3>Category view</h3>
        <div className="category-list">
          {categoryBreakdown.map((category) => (
            <div key={category.name} className="category-item">
              <span>{category.name}</span>
              <strong>{category.count}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
