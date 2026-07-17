import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOG_LINES = [
  { t: 0,    level: 'INFO',  msg: 'NEXUS v3.1 — Threat Detection Engine started',       color: 'text-slate-500' },
  { t: 120,  level: 'INFO',  msg: 'Loading correlation rules... [847 rules active]',     color: 'text-slate-500' },
  { t: 280,  level: 'INFO',  msg: 'Ingesting telemetry stream... 15,847 EPS',            color: 'text-slate-400' },
  { t: 480,  level: 'WARN',  msg: 'Anomalous process injection detected: PID 4412',      color: 'text-yellow-500' },
  { t: 620,  level: 'WARN',  msg: 'Suspicious network beacon: 192.168.1.44 → C2 match', color: 'text-yellow-500' },
  { t: 800,  level: 'ALERT', msg: 'YARA MATCH: APT29_CozyBear_Memory_Dropper TRIGGERED', color: 'text-red-400' },
  { t: 960,  level: 'ALERT', msg: 'Endpoint: WIN-SRV-DC-01 · Severity: CRITICAL',        color: 'text-red-400' },
  { t: 1100, level: 'INFO',  msg: 'Isolating endpoint from network segment...',           color: 'text-slate-400' },
  { t: 1250, level: 'INFO',  msg: 'Incident created: IR-2025-04 [P1] · Analyst notified',color: 'text-slate-400' },
  { t: 1450, level: 'OK',    msg: 'THREAT CONTAINED · MTTR: 4 min 17 sec',               color: 'text-green-400' },
];

const LEVEL_STYLES = {
  INFO:  'text-blue-400/70',
  WARN:  'text-yellow-500',
  ALERT: 'text-red-400',
  OK:    'text-green-400',
};

function Timestamp() {
  const now = new Date();
  return (
    <span className="text-slate-600">
      [{String(now.getHours()).padStart(2,'0')}:
      {String(now.getMinutes()).padStart(2,'0')}:
      {String(now.getSeconds()).padStart(2,'0')}]
    </span>
  );
}

export default function TerminalSection() {
  const sectionRef  = useRef(null);
  const overlayRef  = useRef(null);
  const termBoxRef  = useRef(null);
  const cursorRef   = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [active, setActive]   = useState(false);
  const [done, setDone]       = useState(false);
  const timersRef = useRef([]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => {
      if (cursorRef.current)
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0';
    }, 530);
    return () => clearInterval(id);
  }, []);

  // Run log stream
  const runStream = () => {
    setVisibleLines([]);
    setDone(false);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    LOG_LINES.forEach(({ t, level, msg, color }) => {
      const id = setTimeout(() => {
        setVisibleLines(prev => [...prev, { level, msg, color }]);
      }, t);
      timersRef.current.push(id);
    });

    const doneId = setTimeout(() => setDone(true), LOG_LINES[LOG_LINES.length - 1].t + 400);
    timersRef.current.push(doneId);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Phase 1: Fade the section background to deep black + slide terminal in
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          setActive(true);
          // Fade overlay
          gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.inOut' }
          );
          // Terminal slides up
          gsap.fromTo(termBoxRef.current,
            { y: 60, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power4.out', delay: 0.3,
              onComplete: runStream }
          );
        },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="terminal"
      className="relative py-32 px-6 z-10 bg-[#020202] border-t border-white/5 overflow-hidden"
    >
      {/* Dark cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,0,0,0.95),rgba(2,2,2,1))] pointer-events-none opacity-0"
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)' }}
      />

      <div className="max-w-4xl mx-auto relative z-20">

        {/* Label */}
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em] mb-10">
          // Live incident simulation · NEXUS detection engine
        </p>

        {/* Terminal window */}
        <div
          ref={termBoxRef}
          className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] opacity-0"
        >
          {/* Chrome */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/8">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] font-mono text-slate-600">nexus_threat_monitor — bash — 120×35</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500 shadow-[0_0_6px_#22c55e] animate-pulse' : 'bg-slate-700'}`} />
              <span className="text-[9px] font-mono text-slate-600">{active ? 'LIVE' : 'STANDBY'}</span>
            </div>
          </div>

          {/* Log body */}
          <div className="p-6 min-h-[320px] font-mono text-[11px] md:text-xs space-y-1.5 leading-relaxed">
            {visibleLines.map((line, i) => (
              <div key={i} className="flex gap-3 items-start animate-fade-in">
                <Timestamp />
                <span className={`${LEVEL_STYLES[line.level]} w-12 shrink-0`}>[{line.level}]</span>
                <span className={line.color}>{line.msg}</span>
              </div>
            ))}

            {/* Blinking cursor on last line while streaming */}
            {active && !done && (
              <div className="flex gap-3 items-center">
                <span className="text-slate-600">[........]</span>
                <span
                  ref={cursorRef}
                  className="inline-block w-2 h-3.5 bg-green-400/80"
                />
              </div>
            )}

            {/* Done state */}
            {done && (
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
                <span className="text-green-400 text-[10px] uppercase tracking-widest">
                  Incident closed · IR-2025-04 · MTTR: 4m 17s
                </span>
                <button
                  onClick={runStream}
                  className="ml-auto text-[9px] font-mono text-slate-600 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-3 py-1 rounded hover:border-white/30"
                >
                  Re-run
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-[10px] font-mono text-slate-700 mt-4 text-center">
          Simulated detection pipeline based on the Nexus Threat Platform architecture
        </p>
      </div>
    </section>
  );
}
