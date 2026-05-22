'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';

// ─── Universal boat/sailing photos — beautiful regardless of destination ──────
// Each destination gets one deterministically based on its slug so it's consistent.
const BOAT_PHOTOS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85', // aerial turquoise with boats
  'https://images.unsplash.com/photo-1559827291-72416316937c?auto=format&fit=crop&w=1600&q=85', // catamaran sailing
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85', // sailing yacht blue sea
  'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1600&q=85', // turquoise water from above
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85', // white sand turquoise water
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=85', // aerial tropical island
  'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=85', // coastal old town
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1600&q=85', // cliffside coastal
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85', // skyline waterfront
  'https://images.unsplash.com/photo-1570077188670-e3b613d3d77e?auto=format&fit=crop&w=1600&q=85', // Mediterranean town
];

function pickPhoto(slug: string): string {
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return BOAT_PHOTOS[hash % BOAT_PHOTOS.length];
}

const DURATION = 2000; // ms after image loads

const PLATFORM_COLORS: Record<string, { bg: string; glow: string; badge: string }> = {
  getmyboat:    { bg: 'from-sky-500 to-cyan-400',     glow: 'shadow-sky-500/40',    badge: 'bg-sky-500' },
  boatsetter:   { bg: 'from-teal-500 to-emerald-400', glow: 'shadow-teal-500/40',   badge: 'bg-teal-500' },
  boatbookings: { bg: 'from-indigo-500 to-blue-400',  glow: 'shadow-indigo-500/40', badge: 'bg-indigo-500' },
};

interface Props {
  slug: string;
  city: string;
  country: string;
  tagline: string;
  platform: string;
  platformName: string;
  affiliateUrl: string;
}

export default function DestinationBridge({
  slug, city, country, tagline, platform, platformName, affiliateUrl,
}: Props) {
  const photo = pickPhoto(slug);
  const colors = PLATFORM_COLORS[platform] ?? PLATFORM_COLORS.getmyboat;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launched, setLaunched] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (rafRef.current) return; // already running
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      // Ease-in-out for a satisfying sweep
      const eased = pct < 0.5 ? 2 * pct * pct : 1 - Math.pow(-2 * pct + 2, 2) / 2;
      setProgress(eased * 100);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setLaunched(true);
        window.location.href = affiliateUrl;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [affiliateUrl]);

  // Start timer as soon as image is loaded
  useEffect(() => {
    if (imageLoaded) startTimer();
  }, [imageLoaded, startTimer]);

  // Fallback: if image hasn't loaded in 1.5s, start anyway
  useEffect(() => {
    const t = setTimeout(() => {
      setImageLoaded(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero photo */}
      <img
        src={photo}
        alt={city}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setImageLoaded(true)}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{country}</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
          {city}
        </h1>
        <p className="text-white/75 text-base mb-8 leading-relaxed">{tagline}</p>

        {/* Platform pill */}
        <div className={`inline-flex items-center gap-2 ${colors.badge} text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-lg ${colors.glow}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M15 4 L15 20 L4 20 Z" fill="currentColor" opacity="0.9"/>
            <path d="M17 6 L17 20 L26 18 Z" fill="currentColor"/>
            <rect x="15" y="3" width="2" height="18" rx="1" fill="white" opacity="0.6"/>
            <path d="M3 22 L6 27 L26 27 L29 22 Z" fill="white" opacity="0.8"/>
          </svg>
          {imageLoaded ? `Opening ${platformName}…` : 'Loading…'}
        </div>

        {/* Progress bar with glowing dot */}
        <div className="relative w-full h-1 bg-white/20 rounded-full overflow-visible mb-6">
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.bg} rounded-full`}
            style={{ width: `${progress}%`, transition: 'none' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.6)]"
            style={{ left: `calc(${progress}% - 6px)`, opacity: progress > 2 ? 1 : 0, transition: 'none' }}
          />
        </div>

        <a
          href={affiliateUrl}
          className={`inline-flex items-center gap-2 bg-gradient-to-r ${colors.bg} text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity`}
        >
          {launched ? 'Going now…' : 'Skip — go now →'}
        </a>

        <div className="mt-6">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Back to SailTripGuide
          </Link>
        </div>
      </div>
    </div>
  );
}
