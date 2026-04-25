import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TermIcon } from 'lucide-react';

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [step, setStep] = useState(0);

  const fullText = [
    "Initializing connection to Prajwal_OS...",
    "Authentication bypassed. Access granted.",
    "",
    "USER_PROFILE: Prajwal V",
    "DESIGNATION: Cybersecurity & Full-Stack Developer",
    "",
    "CORE_SKILLS: [IDS, Pentesting, React, Node.js, Python]",
    "STATUS: Ready for deployment. Open to opportunities.",
    "",
    "> Systems are meant to be understood. And tested."
  ];

  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Trigger on 'h' or 'hack'
      if (e.key.toLowerCase() === 'h' && !isOpen) {
        setIsOpen(true);
      } else if (!isOpen) {
        keyBuffer += e.key.toLowerCase();
        if (keyBuffer.includes('hack')) {
          setIsOpen(true);
          keyBuffer = '';
        }
        if (keyBuffer.length > 5) keyBuffer = keyBuffer.slice(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setTypedText('');
      return;
    }

    if (step < fullText.length) {
      const line = fullText[step];
      let currentLength = 0;
      
      const typingInterval = setInterval(() => {
        if (currentLength <= line.length) {
          setTypedText((prev) => {
            const lines = prev.split('\n');
            lines[step] = line.slice(0, currentLength);
            return lines.join('\n');
          });
          currentLength++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypedText((prev) => prev + '\n');
            setStep((s) => s + 1);
          }, 300); // Wait before next line
        }
      }, 30); // Typing speed

      return () => clearInterval(typingInterval);
    }
  }, [isOpen, step]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#0a0a0a] rounded-lg border border-neon-green/30 overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.1)]"
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
            <div className="p-6 h-[400px] overflow-y-auto font-mono text-sm md:text-base text-neon-green/90 leading-relaxed whitespace-pre-wrap">
              {typedText}
              {step < fullText.length && (
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-4 bg-neon-green align-middle ml-1"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
