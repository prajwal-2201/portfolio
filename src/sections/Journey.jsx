import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, ShieldAlert, Rocket } from 'lucide-react';

const journeyPhases = [
  {
    id: 1,
    title: "Curiosity",
    subtitle: "The Foundation",
    description: "Questioned the black box. Mastered computer science fundamentals, algorithms, and web architecture to understand how digital environments operate.",
    icon: Search,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Building",
    subtitle: "Full-Stack Exploration",
    description: "Engineered complete systems. Developed robust web applications, designed scalable APIs, and managed databases to see the full software lifecycle.",
    icon: PenTool,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Cybersecurity Mindset",
    subtitle: "The Attacker's Perspective",
    description: "Discovered building wasn't enough. Audited systems for vulnerabilities, implemented Intrusion Detection, and applied ethical hacking to harden defenses.",
    icon: ShieldAlert,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 4,
    title: "Present",
    subtitle: "Final Year & Ready",
    description: "Bridging development and defense. Actively seeking cybersecurity opportunities to deploy my Blue Team skills and secure critical infrastructures.",
    icon: Rocket,
    color: "from-neon-blue to-neon-purple"
  }
];

export default function Journey() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 50%"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" ref={targetRef} className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Evolution</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            Learning to build. Learning to break. Learning to secure.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full" />
          
          <motion.div 
            style={{ scaleY: pathLength, transformOrigin: "top" }}
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-blue -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(176,38,255,0.5)]"
          />

          <div className="space-y-24">
            {journeyPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={phase.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-cyber-dark border-4 border-cyber-light flex items-center justify-center z-10"
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${phase.color} opacity-30 absolute inset-0 blur-md`} />
                    <Icon size={20} className="text-white z-10" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                    className={`ml-20 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}
                  >
                    <div className="glass-panel p-8 hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] transition-all group relative overflow-hidden">
                      <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b ${phase.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2">{phase.subtitle}</span>
                      <h3 className="text-2xl font-bold mb-3">{phase.title}</h3>
                      <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors">{phase.description}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
