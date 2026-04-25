import { motion } from 'framer-motion';
import { Mail, FileText, Download } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-10 md:p-16 text-center border-neon-blue/20 relative overflow-hidden group hover:border-neon-blue/40 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none group-hover:from-neon-blue/10 transition-colors duration-500" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white relative z-10 leading-tight">
            Let's build secure systems.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 text-2xl md:text-4xl mt-4 block font-medium">
              —or break them and make them stronger.
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-light relative z-10">
            Let’s connect if you're working on security systems, SOC teams, or threat detection problems.
          </p>

          {/* Primary Actions (Hire Me / Resume) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <a 
              href="mailto:vprajwal2204@gmail.com" 
              className="interactive w-full sm:w-auto px-10 py-5 bg-white text-cyber-dark font-bold rounded-lg hover:bg-neon-blue hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2 scale-105"
            >
              <Mail size={20} />
              Hire Me / Contact
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="interactive w-full sm:w-auto px-10 py-5 bg-cyber-darker border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-neon-purple/50 hover:shadow-[0_0_25px_rgba(176,38,255,0.2)] transition-all flex items-center justify-center gap-2 group/btn"
            >
              <Download size={20} className="text-neon-purple group-hover/btn:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </div>

          {/* Secondary Actions (Socials) */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex gap-4">
              <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="interactive px-4 py-2 rounded-full bg-cyber-dark flex items-center justify-center hover:bg-white/5 hover:text-neon-blue hover:border-neon-blue/50 transition-all border border-white/10 gap-2 group/icon text-sm">
                <Github size={16} className="group-hover/icon:scale-110 transition-transform" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/prajwal-v-b975952a0/" target="_blank" rel="noopener noreferrer" className="interactive px-4 py-2 rounded-full bg-cyber-dark flex items-center justify-center hover:bg-white/5 hover:text-neon-blue hover:border-neon-blue/50 transition-all border border-white/10 gap-2 group/icon text-sm">
                <Linkedin size={16} className="group-hover/icon:scale-110 transition-transform" />
                LinkedIn
              </a>
            </div>
            
            <div className="text-slate-400 text-sm font-mono flex items-center gap-3 bg-cyber-darker px-4 py-2 rounded-full border border-white/5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              STATUS: READY FOR DEPLOYMENT
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
