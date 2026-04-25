import { motion } from 'framer-motion';
import { MapPin, Compass, Eye } from 'lucide-react';

export default function Travel() {
  return (
    <section id="travel" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Abstract Map Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]"
        >
          <div className="absolute inset-0 border border-white/10 rounded-3xl bg-cyber-darker/50 p-8 overflow-hidden backdrop-blur-sm">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            {/* Connection Lines (Abstract Map) */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M20,80 L40,50 L30,30 L60,20 L80,40 L70,70 Z" fill="none" stroke="currentColor" className="text-neon-green" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M40,50 L70,70" fill="none" stroke="currentColor" className="text-neon-blue" strokeWidth="0.5" strokeDasharray="2,2" />
            </svg>

            {/* Map Points */}
            {[
              { top: '80%', left: '20%', label: 'Kerala' },
              { top: '50%', left: '40%', label: 'Tamil Nadu' },
              { top: '30%', left: '30%', label: 'Karnataka' },
              { top: '20%', left: '60%', label: 'Andhra' },
              { top: '40%', left: '80%', label: 'Telangana' },
              { top: '70%', left: '70%', label: 'Pondicherry' }
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="absolute flex flex-col items-center gap-2 group cursor-pointer"
                style={{ top: point.top, left: point.left }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 bg-neon-green/20 rounded-full animate-ping" />
                  <div className="w-2 h-2 bg-neon-green rounded-full z-10" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-neon-green transition-colors bg-cyber-darker/80 px-2 py-0.5 rounded">{point.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 mb-6">
            <Compass size={14} className="text-neon-green" />
            <span className="text-xs font-mono text-neon-green tracking-wider uppercase">Exploration Protocol</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Exploring real-world systems across <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">South India</span> before securing digital ones.
          </h2>
          
          <div className="space-y-6 text-slate-400 font-light text-lg">
            <p>
              Navigating different cultures, transit networks, and logistical challenges requires the same mindset as understanding a complex software architecture. 
            </p>
            <p>
              I've covered over <span className="text-white font-medium">85% of South India</span>, gathering diverse perspectives and learning how real systems interact, fail, and adapt.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="text-neon-green mb-2" size={24} />
              <div className="text-2xl font-bold text-white mb-1">85%</div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">South India Covered</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Eye className="text-cyan-400 mb-2" size={24} />
              <div className="text-2xl font-bold text-white mb-1">∞</div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Perspectives Gained</div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
