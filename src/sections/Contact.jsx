import { Mail, FileText, Download, Send, Globe, Shield } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel relative overflow-hidden border border-white/5">
          {/* HUD Accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-50" />
          <div className="absolute top-4 left-4 text-[8px] font-mono text-slate-700 uppercase tracking-[0.4em]">Establish_Secure_Channel</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Call to Action */}
            <div className="p-10 md:p-16 border-r border-white/5">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Let's Build <span className="text-neon-blue">Secure</span> Systems.
              </h2>
              <p className="text-lg text-slate-500 font-mono uppercase tracking-widest leading-relaxed mb-12">
                Available for SOC engineering, detection research, and systems security projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:vprajwal2204@gmail.com"
                  className="px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-neon-blue transition-all group"
                >
                  <Send size={16} />
                  Send_Transmission
                </a>
                <a 
                  href="/Prajwal_resume.pdf"
                  target="_blank"
                  className="px-8 py-5 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                >
                  <Download size={16} />
                  Download_Briefing
                </a>
              </div>
            </div>

            {/* Right Side - Socials & Status */}
            <div className="p-10 md:p-16 bg-black/40 flex flex-col justify-between">
              <div className="space-y-8">
                <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-blue/50 transition-colors">
                      <Github size={20} />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Repository</div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">GITHUB // PRAJWAL-2201</div>
                    </div>
                  </div>
                  <Globe size={16} className="text-slate-700 group-hover:text-neon-blue transition-colors" />
                </a>

                <a href="https://www.linkedin.com/in/prajwal-v-b975952a0/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-purple/50 transition-colors">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Professional</div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">LINKEDIN // PRAJWAL-V</div>
                    </div>
                  </div>
                  <Globe size={16} className="text-slate-700 group-hover:text-neon-purple transition-colors" />
                </a>
              </div>

              <div className="mt-12 p-6 bg-cyber-dark border border-white/5 rounded relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-green" />
                <div className="flex items-center gap-4">
                  <div className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                  </div>
                  <div>
                    <div className="text-[8px] font-mono text-neon-green uppercase tracking-widest">Operator_Status</div>
                    <div className="text-xs font-bold text-white uppercase tracking-tight">Ready_For_Deployment // 2024_Q4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-600 font-mono text-[8px] uppercase tracking-[0.4em]">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-neon-blue/40" /> SEC_OPS_PORTFOLIO_V2.0
          </div>
          <div>ESTABLISHED_LINK // 127.0.0.1:2024</div>
        </div>
      </div>
    </section>
  );
}
