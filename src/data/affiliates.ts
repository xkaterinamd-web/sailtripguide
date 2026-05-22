// ─── Affiliate URL builder ────────────────────────────────────────────────────
// TODO: Replace baseUrl values with your actual destination-search URL format
// once you have confirmed affiliate links from each program.
// city = display name (e.g. "Miami"), country = (e.g. "United States")

export const PLATFORM_NAMES: Record<string, string> = {
  getmyboat: 'GetMyBoat',
  boatsetter: 'Boatsetter',
  boatbookings: 'Boatbookings',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildAffiliateUrl(platform: string, city: string, country: string): string {
  // Using homepage affiliate links until destination-specific URLs are confirmed
  switch (platform) {
    case 'getmyboat':
      return 'https://getmyboat.com/?ref=sailtripguide';
    case 'boatsetter':
      return 'https://boatsetter.com/?ref=sailtripguide';
    case 'boatbookings':
      return 'https://www.boatbookings.com/?affiliate=sailtripguide';
    default:
      return '/';
  }
}
