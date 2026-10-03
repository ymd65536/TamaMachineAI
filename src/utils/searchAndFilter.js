const normalizeText = (value = '') => value.toLowerCase().trim();

export function filterEvents(events, filters) {
  const keyword = normalizeText(filters.keyword);
  const region = normalizeText(filters.region);
  const platform = normalizeText(filters.platform);
  const mode = filters.onlineMode;
  const status = filters.status;

  return events.filter((event) => {
    const textFields = [
      event.title,
      event.summary,
      event.category,
      event.organizer,
      event.location,
      ...event.listings.map((listing) => listing.platform),
    ]
      .join(' ')
      .toLowerCase();

    const keywordMatch = !keyword || textFields.includes(keyword);
    const regionMatch = !region || !event.region || normalizeText(event.region).includes(region);
    const platformMatch = !platform || event.platforms.some((p) => normalizeText(p) === platform);
    const modeMatch = mode === 'all' || (mode === 'online' ? event.isOnline : !event.isOnline);
    const statusMatch = !status || status === 'all' || event.overallStatus === status;

    const startAt = new Date(event.startAt);
    const endAt = new Date(filters.toDate);
    const fromAt = new Date(filters.fromDate);
    const withinDateScope = Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || Number.isNaN(fromAt.getTime())
      ? true
      : startAt >= fromAt && startAt <= endAt;

    return keywordMatch && regionMatch && platformMatch && modeMatch && statusMatch && withinDateScope;
  });
}

export function sortEvents(events, sortKey) {
  const list = [...events];

  switch (sortKey) {
    case 'applicants':
      return list.sort((a, b) => b.aggregatedApplicants - a.aggregatedApplicants);
    case 'fillRate':
      return list.sort((a, b) => calculateFillRate(b) - calculateFillRate(a));
    case 'relevance':
      return list.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    case 'date':
    default:
      return list.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  }
}

export function calculateFillRate(event) {
  const totalCapacity = event.listings.reduce((sum, listing) => sum + listing.capacity, 0);
  if (!totalCapacity) return 0;
  const totalApplicants = event.listings.reduce((sum, listing) => sum + listing.applicants, 0);
  return Math.round((totalApplicants / totalCapacity) * 100);
}
