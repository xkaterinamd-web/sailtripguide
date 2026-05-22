import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { destinations } from '@/data/destinations';
import { buildAffiliateUrl, PLATFORM_NAMES } from '@/data/affiliates';
import DestinationBridge from './DestinationBridge';

const PLATFORMS = ['getmyboat', 'boatsetter', 'boatbookings'];

export function generateStaticParams() {
  const params: { destination: string; platform: string }[] = [];
  for (const dest of destinations) {
    for (const platform of PLATFORMS) {
      params.push({ destination: dest.slug, platform });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ destination: string; platform: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { destination, platform } = await params;
  const dest = destinations.find(d => d.slug === destination);
  const platformName = PLATFORM_NAMES[platform] ?? platform;
  if (!dest) return {};
  return {
    title: `Boat Rentals in ${dest.city} — ${platformName}`,
    robots: { index: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { destination, platform } = await params;
  const dest = destinations.find(d => d.slug === destination);
  const platformName = PLATFORM_NAMES[platform];

  if (!dest || !platformName) notFound();

  const affiliateUrl = buildAffiliateUrl(platform, dest.city, dest.country);

  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <DestinationBridge
        slug={dest.slug}
        city={dest.city}
        country={dest.country}
        tagline={dest.tagline}
        platform={platform}
        platformName={platformName}
        affiliateUrl={affiliateUrl}
      />
    </Suspense>
  );
}
