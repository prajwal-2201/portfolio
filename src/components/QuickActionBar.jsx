import { motion } from 'framer-motion';
import { Mail, FileText, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function QuickActionBar() {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 bottom-1/4 z-50 flex flex-col gap-4"
    >
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('open-terminal'))}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-neon-green hover:border-neon-green/50 transition-all group"
        title="Access System Terminal"
      >
        <Terminal size={20} className="group-hover:scale-110 transition-transform animate-pulse" />
      </button>
      
      <a 
        href="https://github.com/prajwal-2201" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all group"
        title="GitHub"
      >
        <FaGithub size={20} className="group-hover:scale-110 transition-transform" />
      </a>
      
      <a 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-neon-green hover:border-neon-green/50 transition-all group"
        title="Resume"
      >
        <FileText size={20} className="group-hover:scale-110 transition-transform" />
      </a>
      
      <a 
        href="mailto:vprajwal2204@gmail.com" 
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-neon-purple hover:border-neon-purple/50 transition-all group"
        title="Email"
      >
        <Mail size={20} className="group-hover:scale-110 transition-transform" />
      </a>
    </motion.div>
  );
}
