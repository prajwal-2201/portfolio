import { useState, useEffect, useRef } from 'react';
import { Terminal, X, ChevronRight } from 'lucide-react';

const COMMANDS = {
  help: {
    output: [
      '  Available commands:',
      '  whois prajwal   — Subject profile',
      '  skills --list   — Forensic toolkit',
      '  contact --email — Secure channel',
      '  evidence --log  — Case history',
      '  clear           — Wipe terminal',
    ]
  },
  'whois prajwal': {
    output: [
      '  ┌─ SUBJECT PROFILE ────────────────────────────┐',
      '  │ Name:    Prajwal V                           │',
      '  │ Role:    Digital Forensics Analyst            │',
      '  │ Base:    Bengaluru, India (UTC+5:30)          │',
      '  │ Status:  ACTIVELY SEEKING                     │',
      '  │ Mail:    vprajwal2204@gmail.com               │',
      '  └──────────────────────────────────────────────┘',
    ]
  },
  'skills --list': {
    output: [
      '  [DFIR]      Windows Artifact Analysis, MFT Parsing,',
      '              Memory Forensics, Log2Timeline, Volatility',
      '  [MALWARE]   Static Analysis, YARA Rules, PE Inspection',
      '  [SOC]       SIEM Engineering, Sigma Rules, 500+ EPS',
      '  [CODE]      Python, C++, FastAPI, React, Docker',
      '  [CERTS]     CEH, PenTest+, eJPT (in progress)',
    ]
  },
  'contact --email': {
    output: [
      '  Initiating secure channel...',
      '  ----------------------------------------',
      '  Email:    vprajwal2204@gmail.com',
      '  GitHub:   github.com/prajwal-2201',
      '  LinkedIn: linkedin.com/in/prajwal-v-b975952a0',
      '  ----------------------------------------',
      '  Channel secured. Encrypt before transmitting.',
    ]
  },
  'evidence --log': {
    output: [
      '  CASE LOG // SHA-256 VERIFIED',
      '  [2024-02-14] Frostbyte — DFIR Framework (Python)',
      '  [2023-11-05] Nexus — SOC Platform (FastAPI/WS)',
      '  [2023-05-22] AegisTriage — Static Malware Analyzer',
      '  [2023-01-10] PQC FedLearn — Anomaly Detection Model',
      '  All artifacts verified. Chain of custody intact.',
    ]
  },
  clear: { output: [] }
};

export default function ForensicTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'FORENSIC CLI v2.4.1 — DeepTrace Query Interface' },
    { type: 'system', text: 'Type "help" to list available commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Sudo easter egg listener
  useEffect(() => {
    let keys = '';
    const handleGlobalKey = (e) => {
      // Ignore if typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      keys += e.key.toLowerCase();
      if (keys.length > 4) keys = keys.slice(-4);
      
      if (keys === 'sudo') {
        setIsOpen(true);
        keys = ''; // Reset
      }
    };
    
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: `forensic@prajwal:~$ ${cmd}` }];
    setCmdHistory(prev => [cmd, ...prev]);
    setCmdIdx(-1);

    const match = COMMANDS[cmd];
    if (match) {
      if (cmd === 'clear') {
        setHistory([{ type: 'system', text: 'Terminal cleared. Evidence preserved.' }]);
      } else {
        match.output.forEach(line => newHistory.push({ type: 'output', text: line }));
        setHistory(newHistory);
      }
    } else {
      newHistory.push({ type: 'error', text: `  bash: ${cmd}: command not found. Try "help".` });
      setHistory(newHistory);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] || '');
    } else if (e.key === 'ArrowDown') {
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(cmdHistory[next] || '');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] w-12 h-12 md:w-14 md:h-14 bg-[#050505] border border-cyan-500/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:border-cyan-500/60 transition-all group"
        title="Open Forensic Terminal"
      >
        <Terminal size={18} className="text-cyan-500 group-hover:scale-110 transition-transform md:w-[20px] md:h-[20px]" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-500 rounded-full" />
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-28 md:right-8 z-[200] w-[calc(100vw-32px)] md:w-[420px] max-w-[420px] bg-[#030303] border border-cyan-900/40 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#050505] border-b border-cyan-900/30">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest">forensic_cli — prajwal@deeptrace</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={14} className="text-slate-500 hover:text-white transition-colors" />
            </button>
          </div>

          {/* Terminal Body */}
          <div ref={bodyRef} className="h-72 overflow-y-auto p-4 font-mono text-[11px] space-y-1 scroll-smooth">
            {history.map((line, i) => (
              <div key={i} className={
                line.type === 'input'  ? 'text-cyan-400' :
                line.type === 'error'  ? 'text-red-400' :
                line.type === 'system' ? 'text-amber-400/70' :
                'text-slate-400'
              }>
                {line.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-cyan-900/30 px-4 py-3 flex items-center gap-2 bg-[#030303]">
            <ChevronRight size={12} className="text-cyan-500 flex-shrink-0" />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[11px] font-mono text-cyan-400 outline-none placeholder:text-slate-700 caret-cyan-500"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </>
  );
}
