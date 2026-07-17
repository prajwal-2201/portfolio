import { useEffect, useState } from 'react';

const BOOT_STEPS = [
  { text: 'Mounting evidence drive...',           ms: 400  },
  { text: 'Verifying cryptographic hashes...',    ms: 900  },
  { text: 'Loading forensic artifacts...',         ms: 1400 },
  { text: 'Establishing secure channel...',        ms: 1900 },
  { text: 'Initializing DeepTrace engine...',      ms: 2400 },
  { text: 'CHAIN OF CUSTODY VERIFIED',            ms: 2900, done: true },
];

export default function LoadingScreen({ onComplete }) {
  const [steps, setSteps]     = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]       = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = BOOT_STEPS.map(({ text, ms, done: isDone }) =>
      setTimeout(() => {
        setSteps(prev => [...prev, { text, done: isDone }]);
        setProgress(Math.round((ms / 3200) * 100));
        if (isDone) {
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(onComplete, 600);
            }, 600);
          }, 300);
        }
      }, ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9998] bg-[#010101] flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(6,182,212,0.1) 2px,rgba(6,182,212,0.1) 4px)', backgroundSize: '100% 4px' }} />

      <div className="w-full max-w-lg px-8 font-mono">
        {/* Logo */}
        <div className="mb-12 text-center">
          <p className="text-[9px] text-cyan-700 uppercase tracking-[0.5em] mb-2">DeepTrace Forensic Framework</p>
          <h1 className="text-4xl font-black text-white tracking-tighter">PRAJWAL V</h1>
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] mt-1">Digital Forensics · Incident Response</p>
        </div>

        {/* Boot steps */}
        <div className="space-y-2 mb-10 min-h-[120px]">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 text-xs transition-all duration-300 ${step.done ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${step.done ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'bg-slate-600'}`} />
              {step.text}
            </div>
          ))}
          {!done && <div className="flex items-center gap-3 text-xs text-slate-700 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0" />
            <span>_</span>
          </div>}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[8px] text-slate-600 mb-2 uppercase tracking-widest">
            <span>Case progress</span>
            <span className={done ? 'text-cyan-400' : ''}>{progress}%</span>
          </div>
          <div className="h-px w-full bg-slate-900 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {done && (
          <p className="text-center text-[9px] text-cyan-500/60 uppercase tracking-[0.4em] animate-pulse mt-6">
            Evidence vault unlocked
          </p>
        )}
      </div>
    </div>
  );
}
