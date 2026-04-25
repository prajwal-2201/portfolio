import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Journey', href: '#journey' },
  { name: 'Missions', href: '#missions' },
  { name: 'Simulations', href: '#simulations' },
  { name: 'Arsenal', href: '#arsenal' },
  { name: 'Source', href: '#github' },
  { name: 'Learning', href: '#learning' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'py-4 glass-panel border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center rounded">
            <Shield size={20} className="text-neon-blue" />
          </div>
          <div className="font-mono leading-none">
            <div className="text-lg font-black text-white tracking-tighter">PRAJWAL_V</div>
            <div className="text-[8px] text-neon-blue tracking-[0.4em] uppercase">Security_Operations</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all relative ${
                activeItem === item.name ? 'text-neon-blue' : 'text-slate-500 hover:text-white'
              }`}
            >
              {activeItem === item.name && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-px bg-neon-blue shadow-[0_0_10px_#00f0ff]"
                />
              )}
              {item.name}
            </a>
          ))}
          
          <div className="ml-6 pl-6 border-l border-white/10">
            <div className="flex items-center gap-2 px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[8px] font-mono text-neon-green uppercase tracking-widest">System_Live</span>
            </div>
          </div>
        </div>
        
        <div className="lg:hidden">
          <Menu size={24} className="text-white" />
        </div>
      </div>
    </motion.nav>
  );
}
