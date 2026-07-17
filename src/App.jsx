import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Fingerprint } from 'lucide-react';

// Eagerly loaded (above-fold / critical path)
import Navbar          from './components/Navbar';
import ParallaxLayers  from './components/ParallaxLayers';
import Hero            from './sections/Hero';
import About           from './sections/About';
import Journey         from './sections/Journey';
import Experience      from './sections/Experience';
import Arsenal         from './sections/Arsenal';
import Contact         from './sections/Contact';
import Certifications  from './sections/Certifications';
import LoadingScreen   from './components/LoadingScreen';
import ScrollProgress  from './components/ScrollProgress';
import ResumeButton    from './components/ResumeButton';
import ForensicTerminal from './components/ForensicTerminal';

// Lazily loaded (below-fold — reduces initial bundle ~40%)
const SignatureScene = lazy(() => import('./sections/SignatureScene'));
const Featured       = lazy(() => import('./sections/Featured'));
const GithubStats    = lazy(() => import('./sections/GithubStats'));
const Research       = lazy(() => import('./sections/Research'));
const Operations     = lazy(() => import('./sections/Operations'));

const SectionFallback = () => (
  <div className="py-32 flex items-center justify-center">
    <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest animate-pulse">Loading artifact...</span>
  </div>
);

// Force scroll to top on refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function App() {
  const uvLightRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cursor trail (Luminol spatter)
  useEffect(() => {
    // Explicitly jump to top on mount
    window.scrollTo(0, 0);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const addDot = (e) => {
      dotsRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1, r: Math.random() * 3 + 1 });
      if (dotsRef.current.length > 80) dotsRef.current.shift();
    };
    window.addEventListener('mousemove', addDot);

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current = dotsRef.current.filter(d => d.alpha > 0.01);
      dotsRef.current.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${dot.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(6,182,212,0.6)';
        ctx.fill();
        dot.alpha *= 0.88;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', addDot);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Root easter egg keypress + Konami code
  useEffect(() => {
    let keys = '';
    const secretCode = 'root';
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIdx = 0;

    const triggerRootAccess = () => {
      const overlay = document.createElement('div');
      overlay.id = 'konami-overlay';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;overflow:hidden;';
      overlay.innerHTML = '<div id="konami-text" style="color:#0ff;font-size:1.5rem;font-weight:bold;text-align:center;line-height:2;text-shadow:0 0 20px #0ff;padding:2rem;"></div>';
      document.body.appendChild(overlay);

      const lines = [
        '> ROOT ACCESS GRANTED',
        '> BYPASSING AUTHENTICATION...',
        '> LOADING MAINFRAME...',
        '> DECRYPTING EVIDENCE VAULT...',
        '> WELCOME, ADMINISTRATOR.',
        '> Redirecting to GitHub...'
      ];
      let lineIdx = 0;
      const textEl = document.getElementById('konami-text');

      const interval = setInterval(() => {
        if (lineIdx < lines.length) {
          textEl.innerHTML += lines[lineIdx] + '<br/>';
          lineIdx++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            overlay.remove();
            window.open('https://github.com/prajwal-2201', '_blank');
          }, 600);
        }
      }, 350);
    };

    const handleKeyDown = (e) => {
      // Konami code check
      if (e.key === konamiCode[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiCode.length) {
          konamiIdx = 0;
          triggerRootAccess();
          return;
        }
      } else {
        konamiIdx = 0;
      }

      // Root code check
      if (e.key.length === 1) {
        keys += e.key.toLowerCase();
        if (keys.length > secretCode.length) {
          keys = keys.substring(keys.length - secretCode.length);
        }
        if (keys === secretCode) {
          alert("ACCESS GRANTED. Welcome to the mainframe, Administrator.");
          document.body.style.filter = "sepia(1) hue-rotate(90deg) saturate(3)";
          setTimeout(() => { document.body.style.filter = "none"; }, 5000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // UV light mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (uvLightRef.current) {
        uvLightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Glitch-on-scroll (fires every ~3 scroll events)
  useEffect(() => {
    let scrollCount = 0;
    let glitching = false;
    const handleScroll = () => {
      scrollCount++;
      if (scrollCount % 3 === 0 && !glitching) {
        glitching = true;
        document.body.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`;
        document.body.style.filter = 'brightness(1.3) contrast(1.2)';
        setTimeout(() => {
          document.body.style.transform = '';
          document.body.style.filter = '';
          glitching = false;
        }, 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Forensic Boot Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div className={`relative min-h-screen bg-[#020202] text-slate-300 overflow-x-hidden font-sans selection:bg-white selection:text-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Luminol cursor trail canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[101] hidden md:block"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Global UV Light Cursor */}
        <div 
          ref={uvLightRef} 
          className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full z-[100] mix-blend-screen opacity-60 transition-opacity duration-300 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
            willChange: 'transform'
          }}
        />
        
        {/* Global Hidden Fingerprints (UV Light interaction) */}
        <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
           {[
             { top: '15%', left: '25%', size: 48 },
             { top: '35%', left: '80%', size: 64 },
             { top: '65%', left: '15%', size: 32 },
             { top: '85%', left: '70%', size: 56 },
             { top: '50%', left: '50%', size: 72 },
             { top: '25%', left: '60%', size: 40 },
             { top: '75%', left: '35%', size: 60 },
             { top: '10%', left: '90%', size: 48 },
             { top: '90%', left: '10%', size: 52 },
           ].map((fp, i) => (
             <div 
               key={i} 
               className="absolute opacity-[0.02] text-white hover:opacity-100 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-500 cursor-crosshair pointer-events-auto"
               style={{ top: fp.top, left: fp.left }}
             >
               <Fingerprint size={fp.size} strokeWidth={1} />
             </div>
           ))}
        </div>

        <Navbar />
        <ParallaxLayers />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Journey />
          <Experience />
          <Arsenal />
          
          {/* Below-fold: lazy loaded */}
          <Suspense fallback={<SectionFallback />}>
            <SignatureScene />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Featured />
          </Suspense>
          <Certifications />
          <Suspense fallback={<SectionFallback />}>
            <GithubStats />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Research />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Operations />
          </Suspense>
          <Contact />
        </main>
        
        <footer className="py-8 border-t border-white/10 bg-[#020202] text-center text-slate-500 text-[10px] uppercase tracking-[0.3em] relative z-10 flex flex-col items-center justify-center gap-2">
          <p>PRAJWAL V. © {new Date().getFullYear()}</p>
          <p className="text-white/20">DIGITAL FORENSICS · INCIDENT RESPONDER</p>
          <a href="/security.txt" target="_blank" rel="noopener noreferrer" className="text-white/10 hover:text-cyan-600 transition-colors text-[8px] tracking-widest mt-1">/.well-known/security.txt ↗</a>
        </footer>

        {/* Forensic CLI Terminal Widget */}
        <ForensicTerminal />
        {/* Floating Resume Download */}
        <ResumeButton />
      </div>
    </>
  );
}

export default App;
