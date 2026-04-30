import { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="min-h-screen py-32 px-6 relative z-10 bg-[#020202] flex flex-col justify-center overflow-hidden border-t border-white/5">
      
      <div ref={contentRef} className="max-w-4xl mx-auto w-full relative z-10 text-center">
        
        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-8">
          Let's Build <span className="font-medium">Secure.</span>
        </h2>
        
        <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Available for SOC engineering, detection research, and systems security roles.
          Open to full-time, contract, and remote-first opportunities.
        </p>

        {/* Quick logistics — saves recruiters a follow-up email */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-14 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
            Available Now
          </span>
          <span className="text-white/10">·</span>
          <span>IST (UTC +5:30) · India</span>
          <span className="text-white/10">·</span>
          <span>Remote / Hybrid</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="mailto:vprajwal2204@gmail.com"
            className="px-10 py-4 bg-white text-black text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors rounded-full w-full sm:w-auto"
          >
            <Send size={16} />
            Get in touch
          </a>
          <a 
            href="/Prajwal_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-transparent border border-white/20 text-white text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors rounded-full w-full sm:w-auto"
          >
            View Resume ↗
          </a>
        </div>

        <div className="flex items-center justify-center gap-12 mt-20 pt-12 border-t border-white/5">
          <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-3 group">
            <Github size={28} />
            <span className="text-xs tracking-widest uppercase">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/prajwal-v-b975952a0/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-3 group">
            <Linkedin size={28} />
            <span className="text-xs tracking-widest uppercase">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
