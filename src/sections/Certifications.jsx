import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certs = [
  {
    id: 1,
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "/EthicalHackerUpdate20260318-33-peh44c.pdf",
    image: "/ethical-hacker.png"
  },
  {
    id: 2,
    title: "Introduction to Penetration Testing",
    issuer: "Security Blue Team",
    date: "2026",
    link: "/Introduction to Penetration Testing-course.pdf",
    icon: Award
  },
  {
    id: 3,
    title: "Cybersecurity Course",
    issuer: "Tech Mahindra Foundation (Skill India)",
    date: "2026",
    link: "/certificate_9390e20a-9cac-48f7-9fb4-35eddca4aeae.pdf",
    icon: Award
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 relative z-10">
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Credentials</span></h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
            Proof of continuous learning and practical skill acquisition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-panel p-8 group hover:-translate-y-2 hover:border-neon-purple/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer"
                onClick={() => window.open(cert.link, '_blank')}
              >
                <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                  {cert.image ? (
                    <img src={cert.image} alt="badge" className="w-24 h-24 opacity-20 object-contain" />
                  ) : (
                    <Award size={120} />
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-purple/50 transition-colors p-2">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
                    ) : (
                      <Icon size={28} className="text-neon-purple" />
                    )}
                  </div>
                  <div className="flex gap-3 relative z-20">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{cert.title}</h3>
                
                <div className="mb-4 flex-grow">
                  <p className="text-slate-300 font-light">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center mt-auto">
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Issued: {cert.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
