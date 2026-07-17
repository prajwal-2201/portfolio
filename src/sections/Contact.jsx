import { useEffect, useRef, useState } from 'react';
import { FileSignature, Send } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const caseNumber = `CASE-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const to = 'vprajwal2204@gmail.com';
    const subject = encodeURIComponent(`Case ${caseNumber} — Forensic Intake from ${formState.name}`);
    const body = encodeURIComponent(
      `Subject Name: ${formState.name}\n` +
      `Contact Channel: ${formState.email}\n\n` +
      `Incident Description:\n${formState.message}`
    );
    
    // Use direct Gmail compose link instead of OS-level mailto (which often fails)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} id="contact" className="min-h-screen py-32 px-6 relative z-10 bg-[#020202] flex flex-col justify-center overflow-hidden border-t border-white/5">

      <div ref={contentRef} className="max-w-4xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileSignature size={16} className="text-cyan-500" />
            <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.4em]">Forensic Intake System</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-4">
            Submit <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Evidence</span>
          </h2>
          <p className="text-slate-400 font-light text-sm max-w-md mx-auto leading-relaxed">
            Open for DFIR roles, SOC engineering, and security research opportunities. All submissions are encrypted and analyzed.
          </p>
        </div>

        {/* Artifact Manifest Form */}
        <div className="bg-[#050505] border border-cyan-900/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.05)]">
          {/* Form Header */}
          <div className="px-8 py-4 border-b border-cyan-900/20 bg-cyan-950/10 flex items-center justify-between">
            <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.4em]">Artifact Manifest — Intake Form</span>
            <span className="text-[9px] font-mono text-slate-600">{caseNumber}</span>
          </div>

          {submitted ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">Evidence Submitted</h3>
              <p className="text-slate-500 text-sm font-mono">Case {caseNumber} is logged. Expect analysis within 24–48 hrs.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-mono text-cyan-700 uppercase tracking-[0.3em] mb-2">Subject Name *</label>
                  <input
                    required
                    value={formState.name}
                    onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                    placeholder="Full name of submitter"
                    className="w-full bg-transparent border-b border-cyan-900/40 pb-2 text-sm text-slate-300 font-mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-cyan-700 uppercase tracking-[0.3em] mb-2">Contact Channel *</label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                    placeholder="Secure email address"
                    className="w-full bg-transparent border-b border-cyan-900/40 pb-2 text-sm text-slate-300 font-mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-cyan-700 uppercase tracking-[0.3em] mb-2">Incident Description *</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  placeholder="Describe the nature of the case, role, or opportunity..."
                  className="w-full bg-transparent border border-cyan-900/30 rounded-lg p-4 text-sm text-slate-300 font-mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 border-t border-cyan-900/20">
                <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span>Secure channel active · IST (UTC+5:30)</span>
                </div>
                <button
                  type="submit"
                  className="px-10 py-3 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.3em] rounded-lg flex items-center gap-3 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all"
                >
                  <Send size={14} />
                  Submit for Analysis
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-12 mt-16 pt-12 border-t border-white/5">
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
