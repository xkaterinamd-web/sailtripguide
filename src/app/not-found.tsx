import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-6" role="img" aria-label="anchor">⚓</div>
      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-white/50 mb-8">This page drifted off.</p>
      <Link href="/" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
        Back to home
      </Link>
    </div>
  );
}
