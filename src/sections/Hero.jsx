import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Powerful entrance
      gsap.fromTo(bgRef.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" }
      );

      gsap.fromTo(textRefs.current,
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.5 }
      );

      // Parallax text shrinking on scroll
      gsap.to(textRefs.current, {
        y: -100,
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="h-screen w-full relative flex flex-col justify-center overflow-hidden bg-[#020202]">
      {/* Clean, subtle gradient background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#020202_70%)] opacity-60" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <h1 className="flex flex-col uppercase text-white font-black leading-[0.85] tracking-tighter w-full">
          <div className="overflow-hidden py-2">
            <span ref={el => textRefs.current[0] = el} className="block text-4xl md:text-5xl lg:text-6xl text-slate-500 font-medium tracking-tight mb-4">Prajwal V.</span>
          </div>
          <div className="overflow-hidden py-2">
            <span ref={el => textRefs.current[1] = el} className="block text-7xl md:text-[8rem] lg:text-[10rem]">Security</span>
          </div>
          <div className="overflow-hidden py-2">
            <span ref={el => textRefs.current[2] = el} className="block text-7xl md:text-[8rem] lg:text-[10rem]">Architect</span>
          </div>
        </h1>
      </div>
      
      {/* Absolute Bottom minimal text */}
      <div className="absolute bottom-12 px-6 md:px-12 lg:px-24 w-full flex justify-between items-end z-20">
        <p className="text-slate-400 font-light text-sm md:text-lg max-w-sm">
          Specializing in threat detection, SOC pipelines, and defensive infrastructure.
        </p>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
