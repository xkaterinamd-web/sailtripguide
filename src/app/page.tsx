import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SailTripGuide — Find Your Boat Rental',
  alternates: { canonical: 'https://sailtripguide.com' },
};

const platforms = [
  {
    id: 'getmyboat',
    name: 'GetMyBoat',
    tagline: "World's largest marketplace",
    detail: '150,000+ boats · 184 countries · No booking fees',
    badge: 'Most listings',
    color: 'from-sky-500 to-cyan-400',
    ring: 'ring-sky-400',
  },
  {
    id: 'boatsetter',
    name: 'Boatsetter',
    tagline: 'Insurance on every rental',
    detail: '$1M liability coverage · Vetted captains · US-focused',
    badge: 'Safest choice',
    color: 'from-teal-500 to-emerald-400',
    ring: 'ring-teal-400',
  },
  {
    id: 'boatbookings',
    name: 'Boatbookings',
    tagline: 'Mediterranean & luxury experts',
    detail: '12,000+ yachts · Expert brokers · Europe-strong',
    badge: 'Best for Europe',
    color: 'from-indigo-500 to-blue-400',
    ring: 'ring-indigo-400',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.15)_0%,_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-teal-400 font-semibold text-xs tracking-widest uppercase mb-4">
            Boat Rental Deals
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Find the Best Boat Rental<br className="hidden sm:block" /> for Your Trip
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            We link directly to the top booking platforms — pick the one that fits your trip and get the best available price.
          </p>

          {/* Platform cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-2">
            {platforms.map((p) => (
              <Link
                key={p.id}
                href={`/go/${p.id}`}
                className={`group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:${p.ring} hover:ring-1 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400`}
              >
                {/* Badge */}
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${p.color} text-white mb-4`}>
                  {p.badge}
                </span>

                <h2 className="text-white font-bold text-xl mb-1 group-hover:text-teal-300 transition-colors">
                  {p.name}
                </h2>
                <p className="text-white/70 text-sm font-medium mb-2">{p.tagline}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-5">{p.detail}</p>

                <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${p.color} text-white text-sm font-semibold px-4 py-2 rounded-xl group-hover:opacity-90 transition-opacity`}>
                  See deals →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-10">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Pick a platform', desc: 'Choose the marketplace that fits your destination and budget.' },
              { n: '2', title: 'We redirect you', desc: 'A quick bridge page confirms where you\'re going, then takes you straight there.' },
              { n: '3', title: 'Book direct', desc: 'You book on the platform directly — no markup from us, ever.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mb-3 text-sm">
                  {n}
                </div>
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
