import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Journey', href: '#journey' },
  { name: 'Missions', href: '#missions' },
  { name: 'Arsenal', href: '#arsenal' },
  { name: 'Travel', href: '#travel' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple scroll spy logic
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass-panel bg-cyber-dark/80 border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-bold font-mono tracking-tighter">
          <span className="text-white">SYS</span>
          <span className="text-neon-blue">_DEV</span>
        </div>
        
        <div className="hidden md:flex space-x-1 border border-white/10 rounded-full px-2 py-1 bg-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                activeItem === item.name ? 'text-cyber-dark' : 'text-slate-300 hover:text-white'
              }`}
            >
              {activeItem === item.name && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-neon-blue rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu toggle button could go here */}
          <div className="w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer">
            <span className="w-full h-0.5 bg-white block"></span>
            <span className="w-2/3 h-0.5 bg-white block ml-auto"></span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
