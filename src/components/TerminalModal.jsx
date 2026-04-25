import { useState, useEffect, useRef } from 'react';
import { X, Terminal as TermIcon, ChevronRight } from 'lucide-react';

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'output', content: 'Initializing connection to Prajwal_OS...' },
    { type: 'output', content: 'Authentication bypassed. Access granted.' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'h' && !isOpen) {
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Custom event to open from button
    const handleOpenTerminal = () => setIsOpen(true);
    window.addEventListener('open-terminal', handleOpenTerminal);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenTerminal);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsBooting(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsBooting(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isBooting]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: input }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', content: 'Available commands: [help, whoami, ls, clear, exit, hack]' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: 'USER: Prajwal V\nROLE: Cybersecurity & Full-Stack Developer\nSTATUS: Active / Open to Missions' });
        break;
      case 'ls':
      case 'dir':
        newHistory.push({ type: 'output', content: 'briefing_IDS_bypass.md\nresearch_CVE_2024.pdf\nautomation_framework.py\nsecret_notes.txt' });
        break;
      case 'clear':
        setHistory([{ type: 'output', content: 'Terminal cleared.' }]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case 'hack':
        newHistory.push({ type: 'output', content: 'Nice try. Real hacking happens in the shadows, not in a UI demo. But since you asked...' });
        newHistory.push({ type: 'output', content: '[!] ERROR: SOC INTERVENTION DETECTED' });
        break;
      default:
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0a0a0a] rounded-lg border border-neon-green/30 overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/10">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
            <TermIcon size={14} />
            <span>root@prajwal-os:~</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="p-6 h-[400px] overflow-y-auto font-mono text-sm md:text-base text-neon-green/90 leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {isBooting ? (
            <div className="flex flex-col gap-1">
              <p>BOOTING SYSTEM...</p>
              <p>LOADING KERNEL 5.15.0-generic</p>
              <p>NETWORK_PROTOCOL: SECURE</p>
              <p>WELCOME TO PRAJWAL_OS V2.0</p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {history.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    {line.type === 'input' && <span className="text-neon-blue">root@prajwal:~$</span>}
                    <span className="whitespace-pre-wrap">{line.content}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                <span className="text-neon-blue">root@prajwal:~$</span>
                <input 
                  ref={inputRef}
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-neon-green caret-neon-green"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
