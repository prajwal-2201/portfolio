import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About',         href: '#about' },
  { name: 'Experience',    href: '#experience' },
  { name: 'Capabilities',  href: '#arsenal' },
  { name: 'Architectures', href: '#featured' },
  { name: 'Research',      href: '#research' },
  { name: 'Contact',       href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
      let current = '';
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el.offsetTop <= scrollPosition) current = item.name;
      }
      setActiveItem(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
              <span className="text-black text-xs font-black">PV</span>
            </div>
            <div className="leading-none">
              <div className="text-sm font-semibold text-white tracking-tight">Prajwal V.</div>
              <div className="text-[9px] text-slate-500 tracking-[0.25em] uppercase">Security Architect</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-[11px] uppercase tracking-widest font-medium transition-all relative group ${
                  activeItem === item.name
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-px bg-white transition-all duration-300 ${
                    activeItem === item.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                  }`}
                />
              </a>
            ))}

            {/* Resume CTA */}
            <a
              href="/Prajwal_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-slate-200 transition-colors"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded transition-colors text-white z-[110]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-6 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`text-2xl font-light uppercase tracking-[0.3em] transition-colors ${
              activeItem === item.name ? 'text-white' : 'text-slate-500 hover:text-white'
            }`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            {item.name}
          </a>
        ))}

        <a
          href="/Prajwal_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          className="mt-8 px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-slate-200 transition-colors"
        >
          Resume ↗
        </a>
      </div>
    </>
  );
}
