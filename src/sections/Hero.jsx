import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        className="max-w-5xl mx-auto z-10 w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-neon-green tracking-wider uppercase font-semibold">Open to Opportunities</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-sm md:text-base font-mono text-slate-400 uppercase tracking-[0.3em]">Prajwal V</p>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.2] tracking-tight">
          Cybersecurity Engineer<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">| SOC & Detection Systems</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
          I build systems that detect, analyze, and respond to real-world cyber threats.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#missions" className="w-full sm:w-auto px-8 py-4 bg-white text-cyber-dark font-bold rounded-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            View Projects
          </a>
          
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/10 hover:border-neon-blue/50 transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Download size={18} className="text-neon-blue group-hover:-translate-y-1 transition-transform" />
            Resume
          </a>

          <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/10 hover:border-neon-purple/50 transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(176,38,255,0.2)]">
            <FaGithub size={18} className="text-neon-purple group-hover:scale-110 transition-transform" />
            GitHub
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-blue/30 to-transparent" />
      </motion.div>
    </section>
  );
}
