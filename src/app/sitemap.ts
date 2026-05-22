import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sailtripguide.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/go/getmyboat`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/go/boatsetter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/go/boatbookings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
