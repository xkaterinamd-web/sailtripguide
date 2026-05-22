'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// ─── Update affiliate URLs here when you have the exact destination format ───
const PLATFORMS: Record<string, { name: string; baseUrl: string; bgColor: string; textColor: string }> = {
  getmyboat: {
    name: 'GetMyBoat',
    baseUrl: 'https://getmyboat.com/?ref=sailtripguide',
    bgColor: 'bg-sky-500',
    textColor: 'text-sky-400',
  },
  boatsetter: {
    name: 'Boatsetter',
    baseUrl: 'https://boatsetter.com/?ref=sailtripguide',
    bgColor: 'bg-teal-500',
    textColor: 'text-teal-400',
  },
  boatbookings: {
    name: 'Boatbookings',
    baseUrl: 'https://www.boatbookings.com/?affiliate=sailtripguide',
    bgColor: 'bg-indigo-500',
    textColor: 'text-indigo-400',
  },
};

const COUNTDOWN = 3;

export default function RedirectPage({ platform: platformKey }: { platform: string }) {
  const searchParams = useSearchParams();
  const destination = searchParams.get('destination');

  const platform = PLATFORMS[platformKey?.toLowerCase()];

  // Build affiliate URL — append ?destination= once you have exact format per platform
  const affiliateUrl = platform
    ? destination
      ? `${platform.baseUrl}&destination=${encodeURIComponent(destination)}`
      : platform.baseUrl
    : '/';

  const [count, setCount] = useState(COUNTDOWN);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!platform) return;
    const startTime = Date.now();
    const duration = COUNTDOWN * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      setCount(Math.max(Math.ceil((duration - elapsed) / 1000), 0));

      if (elapsed >= duration) {
        clearInterval(interval);
        window.location.href = affiliateUrl;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [affiliateUrl, platform]);

  if (!platform) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
        <p className="text-white/60 mb-4">Platform not found.</p>
        <Link href="/" className="text-teal-400 hover:underline text-sm">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl ${platform.bgColor} flex items-center justify-center mx-auto mb-8 shadow-lg`}>
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M15 4 L15 20 L4 20 Z" fill="white" opacity="0.9"/>
            <path d="M17 6 L17 20 L26 18 Z" fill="white"/>
            <rect x="15" y="3" width="2" height="18" rx="1" fill="white" opacity="0.5"/>
            <path d="M3 22 L6 27 L26 27 L29 22 Z" fill="white" opacity="0.8"/>
          </svg>
        </div>

        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Taking you to</p>
        <h1 className={`text-3xl font-bold mb-1 ${platform.textColor}`}>{platform.name}</h1>

        {destination && (
          <p className="text-white/40 text-sm mb-6">Searching: {destination}</p>
        )}
        {!destination && <div className="mb-6" />}

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className={`h-full ${platform.bgColor} rounded-full`}
            style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
          />
        </div>

        <p className="text-white/40 text-sm mb-8">Redirecting in {count}s…</p>

        <a
          href={affiliateUrl}
          className={`inline-flex items-center gap-2 ${platform.bgColor} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-opacity`}
        >
          Continue now →
        </a>

        <div className="mt-8">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Back to SailTripGuide
          </Link>
        </div>
      </div>
    </div>
  );
}
