export const EVENT_CATEGORIES = [
  'AI / LLM',
  'Cloud',
  'Data / Database',
  'DevOps / SRE',
  'Security',
  'Developer Tools',
];

export const EVENT_PLATFORMS = ['connpass', 'Luma', 'Doorkeeper', 'Peatix'];

export const EVENT_STATUS = ['open', 'limited', 'full', 'upcoming'];

export function createListing({
  platform,
  url,
  capacity,
  applicants,
  status = 'open',
  location,
  formattedDate,
}) {
  const fillRate = capacity > 0 ? Math.round((applicants / capacity) * 100) : 0;

  return {
    platform,
    url,
    capacity,
    applicants,
    status,
    location,
    formattedDate,
    fillRate,
  };
}

export function createCanonicalEvent({
  id,
  title,
  category,
  summary,
  region,
  city,
  location,
  isOnline,
  organizer,
  startAt,
  endAt,
  relevanceScore,
  listings,
}) {
  const aggregatedCapacity = listings.reduce((sum, listing) => sum + listing.capacity, 0);
  const aggregatedApplicants = listings.reduce((sum, listing) => sum + listing.applicants, 0);
  const platforms = [...new Set(listings.map((listing) => listing.platform))];
  const overallStatus = listings.some((listing) => listing.status === 'open')
    ? 'open'
    : listings.some((listing) => listing.status === 'limited')
      ? 'limited'
      : listings.some((listing) => listing.status === 'upcoming')
        ? 'upcoming'
        : 'full';

  return {
    id,
    title,
    category,
    summary,
    region,
    city,
    location,
    isOnline,
    organizer,
    startAt,
    endAt,
    relevanceScore,
    listings,
    platformCount: platforms.length,
    platforms,
    aggregatedCapacity,
    aggregatedApplicants,
    overallStatus,
  };
}
