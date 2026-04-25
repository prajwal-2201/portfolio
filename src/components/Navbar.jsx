import { useState, useEffect } from 'react';
import { Shield, Menu, X, Terminal, Cpu } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Dossier', href: '#journey' },
  { name: 'Missions', href: '#missions' },
  { name: 'Intel', href: '#simulations' },
  { name: 'Arsenal', href: '#arsenal' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(navItems[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center rounded transform group-hover:rotate-90 transition-transform duration-500">
              <Shield size={20} className="text-neon-blue" />
            </div>
            <div className="font-mono leading-none">
              <div className="text-lg font-black text-white tracking-tighter group-hover:text-neon-blue transition-colors">PRAJWAL_V</div>
              <div className="text-[8px] text-slate-500 tracking-[0.4em] uppercase group-hover:text-slate-300">Defense_Ops_Core</div>
            </div>
          </a>
          
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all relative group overflow-hidden ${
                  activeItem === item.name ? 'text-neon-blue' : 'text-slate-500 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeItem === item.name ? (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue shadow-[0_0_10px_#00f0ff]" />
                ) : (
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/20 group-hover:w-full transition-all duration-300" />
                )}
              </a>
            ))}
            
            <div className="ml-6 pl-6 border-l border-white/10 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neon-green/5 border border-neon-green/20 rounded-none">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_5px_#00ff66]" />
                <span className="text-[8px] font-mono text-neon-green uppercase tracking-widest">Live_Feed</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded transition-colors text-white z-[110]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-cyber-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
          
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-[0.2em] font-mono transition-all duration-300 ${
                activeItem === item.name ? 'text-neon-blue scale-110' : 'text-slate-500 hover:text-white'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-neon-blue/20 mr-4 font-mono text-sm">0{index + 1}</span>
              {item.name}
            </a>
          ))}

          <div className="mt-12 pt-12 border-t border-white/5 w-full max-w-xs flex flex-col items-center gap-6">
             <div className="flex items-center gap-3 text-neon-green text-[10px] font-mono animate-pulse">
                <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_10px_#00ff66]" />
                SYSTEM_ONLINE // PROTOCOL_V3
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
