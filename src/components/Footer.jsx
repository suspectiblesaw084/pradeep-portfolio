export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-black border-t border-neutral-950 font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left branding line */}
        <div>
          <span>Pradeep V &mdash; Visual Designer</span>
        </div>

        {/* Right copyright notice */}
        <div>
          <span>&copy; {currentYear} All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
