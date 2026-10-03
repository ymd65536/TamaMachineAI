export function summarizeEvents(events) {
  const totalEvents = events.length;
  const totalCapacity = events.reduce((sum, event) => sum + event.listings.reduce((s, listing) => s + listing.capacity, 0), 0);
  const totalApplicants = events.reduce((sum, event) => sum + event.listings.reduce((s, listing) => s + listing.applicants, 0), 0);
  const platformCount = new Set(events.flatMap((event) => event.platforms)).size;

  return {
    totalEvents,
    totalCapacity,
    totalApplicants,
    platformCount,
  };
}

export function summarizeByCategory(events) {
  const categories = new Map();

  events.forEach((event) => {
    const label = event.category;
    if (!categories.has(label)) {
      categories.set(label, 0);
    }
    categories.set(label, categories.get(label) + 1);
  });

  return [...categories.entries()].map(([name, count]) => ({ name, count }));
}
