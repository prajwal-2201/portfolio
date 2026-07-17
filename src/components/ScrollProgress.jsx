import { useEffect, useState, useRef } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[150] h-[2px] bg-transparent pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-cyan-950/30" />
      {/* Fill */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-[width] duration-100 ease-out shadow-[0_0_8px_rgba(6,182,212,0.7)]"
        style={{ width: `${progress}%` }}
      />
      {/* Badge */}
      {progress > 2 && (
        <div
          className="absolute top-2 text-[7px] font-mono text-cyan-500/70 uppercase tracking-widest transition-all duration-100"
          style={{ left: `clamp(0px, ${progress}% - 40px, calc(100% - 80px))` }}
        >
          {progress}%
        </div>
      )}
    </div>
  );
}
