import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-navy border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded" aria-label="SailTripGuide home">
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M15 4 L15 20 L4 20 Z" fill="#2dd4bf"/>
            <path d="M17 6 L17 20 L26 18 Z" fill="#5eead4"/>
            <rect x="15" y="3" width="2" height="18" rx="1" fill="#0f172a"/>
            <path d="M3 22 L6 27 L26 27 L29 22 Z" fill="#0f172a"/>
            <path d="M5 22 L7.5 26 L24.5 26 L27 22 Z" fill="#1e3a5f"/>
            <path d="M1 29 Q8 27 16 29 Q24 31 31 29" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-white text-base tracking-tight">SailTripGuide</span>
        </Link>
        <span className="text-white/40 text-xs hidden sm:block">Affiliate links — we may earn a commission</span>
      </div>
    </header>
  );
}
