import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Shield, Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  const bg1X = useTransform(smoothX, [-0.5, 0.5], [-50, 50]);
  const bg1Y = useTransform(smoothY, [-0.5, 0.5], [-50, 50]);
  
  const bg2X = useTransform(smoothX, [-0.5, 0.5], [50, -50]);
  const bg2Y = useTransform(smoothY, [-0.5, 0.5], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 px-6 overflow-hidden">
      {/* Parallax Backgrounds */}
      <motion.div 
        style={{ x: bg1X, y: bg1Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        style={{ x: bg2X, y: bg2Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/3 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[100px] -z-10" 
      />

      <motion.div 
        className="max-w-5xl mx-auto z-10 w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 backdrop-blur-sm mb-6 animate-pulse shadow-[0_0_15px_rgba(0,255,102,0.2)]">
          <span className="w-2 h-2 rounded-full bg-neon-green" />
          <span className="text-xs font-mono text-neon-green tracking-wider uppercase font-semibold">Open to Opportunities</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-xl md:text-2xl font-mono text-neon-blue mb-2">Prajwal V</h2>
          <p className="text-sm md:text-base font-mono text-slate-400 uppercase tracking-[0.3em]">Cybersecurity & Full-Stack Developer</p>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
          I build systems.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">I break them.</span><br />
          I make them stronger.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
          Final-year engineer focused on securing real-world systems. 
          Bridging the gap between software development and proactive defense.
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
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-neon-blue/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
