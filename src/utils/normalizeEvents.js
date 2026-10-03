export function normalizeEvents(rawEvents) {
  const grouped = new Map();

  rawEvents.forEach((event) => {
    const key = event.id || `${event.title}-${event.startAt}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        ...event,
        listings: [...event.listings],
      });
      return;
    }

    const existing = grouped.get(key);
    existing.listings.push(...event.listings);
    existing.platformCount = new Set(existing.listings.map((listing) => listing.platform)).size;
    existing.platforms = [...new Set(existing.listings.map((listing) => listing.platform))];
    existing.aggregatedCapacity = existing.listings.reduce((sum, listing) => sum + listing.capacity, 0);
    existing.aggregatedApplicants = existing.listings.reduce((sum, listing) => sum + listing.applicants, 0);
    existing.relevanceScore = Math.max(existing.relevanceScore || 0, event.relevanceScore || 0);
  });

  return [...grouped.values()];
}
