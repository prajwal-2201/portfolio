import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/3 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        className="max-w-5xl mx-auto z-10 w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm mb-6">
          <Terminal size={14} className="text-neon-blue" />
          <span className="text-xs font-mono text-neon-blue tracking-wider uppercase">Prajwal V • Cybersecurity & Full-Stack</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Not just a developer. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            I build systems.
          </span>
          <br />I break them.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light">
          I build systems like a developer — and break them like an attacker. 
          Currently a final-year engineering student ready to secure digital infrastructures.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <a href="#missions" className="px-8 py-4 bg-white text-cyber-dark font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2 group">
            View Projects
            <Cpu size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </a>
          
          <a href="#contact" className="px-8 py-4 glass-panel hover:bg-white/10 transition-colors flex items-center gap-2 group">
            Contact Me
            <Shield size={18} className="text-neon-blue group-hover:scale-110 transition-transform duration-300" />
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Scroll to descend</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-neon-blue/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
