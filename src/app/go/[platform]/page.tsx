import { Suspense } from 'react';
import RedirectPage from './RedirectPage';

export function generateStaticParams() {
  return [
    { platform: 'getmyboat' },
    { platform: 'boatsetter' },
    { platform: 'boatbookings' },
  ];
}

export default async function Page({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <RedirectPage platform={platform} />
    </Suspense>
  );
}
