export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy border-t border-white/10 py-8 px-4 text-center">
      <p className="text-white/40 text-xs max-w-lg mx-auto">
        © {year} SailTripGuide.com · This site contains affiliate links. When you click through and book, we may earn a commission at no extra cost to you.
      </p>
    </footer>
  );
}
