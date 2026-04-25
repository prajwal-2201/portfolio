import { motion } from 'framer-motion';
import { Mail, FileText, Download } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-10 md:p-16 text-center border-neon-blue/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Let's build secure systems. <br />
            <span className="text-slate-500 text-2xl md:text-3xl mt-4 block">Or break them and make them stronger.</span>
          </h2>
          
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-light relative z-10">
            Currently actively seeking a cybersecurity or cloud security internship to apply and expand my real-world skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <a 
              href="mailto:vprajwal2204@gmail.com" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-cyber-dark font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group"
            >
              <Mail size={18} />
              Hire Me / Contact
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
            >
              <Download size={18} className="text-neon-blue group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex gap-4">
              <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyber-dark flex items-center justify-center hover:bg-neon-blue/10 hover:text-neon-blue transition-colors border border-white/10 group">
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/prajwal-v-b975952a0/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyber-dark flex items-center justify-center hover:bg-neon-blue/10 hover:text-neon-blue transition-colors border border-white/10 group">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-cyber-dark flex items-center justify-center hover:bg-neon-blue/10 hover:text-neon-blue transition-colors border border-white/10 group">
                <FileText size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            <div className="text-slate-500 text-sm font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              STATUS: READY FOR DEPLOYMENT
            </div>
          </div>
        </motion.div>
      </div>
      
      <footer className="text-center mt-20 text-slate-500 text-sm font-mono">
        <p>Built with React, Tailwind & Framer Motion.</p>
        <p className="mt-2 text-xs opacity-50">© {new Date().getFullYear()} Prajwal V. All rights reserved.</p>
      </footer>
    </section>
  );
}
