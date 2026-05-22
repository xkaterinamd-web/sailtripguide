import { Suspense } from 'react';
import RedirectPage from './RedirectPage';

export function generateStaticParams() {
  return [
    { platform: 'getmyboat' },
    { platform: 'boatsetter' },
    { platform: 'boatbookings' },
  ];
}

export default function Page({ params }: { params: { platform: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <RedirectPage platform={params.platform} />
    </Suspense>
  );
}
