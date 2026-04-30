import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, ArrowRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const yaraRule = `rule APT29_CozyBear_Memory_Dropper {
    meta:
        author      = "Prajwal V"
        description = "Detects in-memory execution of APT29 custom droppers
                       via obfuscated payload structures and decryption stubs."
        reference   = "Internal IR Report #IR-2025-04"
        severity    = "CRITICAL"
        date        = "2025-10-14"
    strings:
        $magic              = { 4D 5A }
        $decryption_routine = { 31 C0 8B 0C 24 85 C9 74 05 31 14 0A 42 EB F4 }
        $winhttp_wide       = "W\\x00i\\x00n\\x00H\\x00T\\x00T\\x00P" wide ascii
        $valloc_wide        = "V\\x00i\\x00r\\x00t\\x00u\\x00a\\x00l\\x00A\\x00l\\x00l\\x00o\\x00c" wide ascii
    condition:
        $magic at 0
        and $decryption_routine
        and 1 of ($winhttp_wide, $valloc_wide)
        and filesize < 500KB
}`;

export default function Research() {
  const containerRef = useRef(null);
  const leftRef      = useRef(null);
  const codeRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
      tl.fromTo(leftRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      ).fromTo(codeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="research"
      className="py-32 px-6 relative z-10 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left — copy */}
          <div className="w-full lg:w-[45%]" ref={leftRef}>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] mb-4">02 — Research</p>

            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
              Threat Hunting<br />
              <span className="font-medium">&amp; Detection Logic</span>
            </h2>

            <p className="text-slate-400 font-light text-base leading-relaxed mb-5">
              Detection engineers don't just <em>respond</em> to alerts — they write the logic that decides what becomes an alert. This YARA rule was authored during a live forensic investigation into a fileless dropper campaign attributed to APT29 (Cozy Bear).
            </p>

            <p className="text-slate-400 font-light text-base leading-relaxed mb-10">
              By matching on the in-memory decryption stub and wide-char WinHTTP strings, the rule catches the dropper <strong className="text-slate-300 font-medium">before it touches disk</strong> — a key capability against modern fileless attacks that evade signature-based AV.
            </p>

            {/* Prominent CTA */}
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/prajwal-2201/CyberSentinel#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 px-6 py-5 bg-white text-black rounded-2xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Read Full Technical Write-up</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">APT29 Dropper Analysis · IR-2025-04</p>
                  </div>
                </div>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-[11px] text-slate-600 font-light pl-1">
                Covers methodology, IOC extraction, and evasion bypass technique.
              </p>
            </div>
          </div>

          {/* Right — code block */}
          <div className="w-full lg:w-[55%]" ref={codeRef}>
            <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

              {/* Window chrome */}
              <div className="bg-white/[0.04] border-b border-white/10 px-5 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono">
                  <Code size={13} />
                  apt29_cozy_bear_dropper.yar
                </div>
                <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">YARA v4.4</span>
              </div>

              {/* Line numbers + code */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-[11px] md:text-xs leading-[1.8] text-slate-300 whitespace-pre">
                  <code>{yaraRule}</code>
                </pre>
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 px-5 py-3 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-600">rule active · 0 false positives in 30-day production run</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
