import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { FaGithub as Github, FaStar } from 'react-icons/fa';
import useGithubRepos from '../hooks/useGithubRepos';

// Helper function to generate deterministic but varied content based on repo name
const generateRepoDetails = (repoName, repoDescription) => {
  const nameLower = repoName.toLowerCase();
  
  if (nameLower.includes('ids') || nameLower.includes('intrusion')) {
    return {
      problem: "Network vulnerabilities left systems exposed to unauthorized access.",
      solution: "Developed an Intrusion Detection System to monitor and flag malicious traffic.",
      impact: "Enhanced network defense visibility and response times."
    };
  }
  if (nameLower.includes('vuln') || nameLower.includes('scan')) {
    return {
      problem: "Manual security audits were too slow and inconsistent.",
      solution: "Built a vulnerability scanner to automate security checks against standard CVEs.",
      impact: "Reduced audit time significantly and improved baseline security."
    };
  }
  if (nameLower.includes('web') || nameLower.includes('dvwa') || nameLower.includes('test')) {
    return {
      problem: "Web applications often deploy with critical OWASP vulnerabilities.",
      solution: "Conducted deep penetration testing and documented exploitation paths.",
      impact: "Provided actionable remediation steps for secure development."
    };
  }
  if (nameLower.includes('chat') || nameLower.includes('lan') || nameLower.includes('vanish')) {
    return {
      problem: "Local network communication lacked privacy and persistence control.",
      solution: "Developed a lightweight LAN messenger with auto-deletion protocols.",
      impact: "Ensured secure, ephemeral communication across local subnets."
    };
  }
  if (nameLower.includes('portfolio') || nameLower.includes('site') || nameLower.includes('web')) {
    return {
      problem: "Needed a digital presence that reflects both development and security mindsets.",
      solution: "Designed and engineered an interactive, high-performance web platform.",
      impact: "Successfully communicated technical depth and professional branding."
    };
  }

  // Fallback generation based on string length to ensure variety
  const problems = [
    "Existing implementations were inefficient or lacked core security features.",
    "System architecture required a scalable, robust approach to handle data.",
    "User experience and data integrity needed significant improvement.",
    "A custom solution was needed to bridge gaps in existing workflows."
  ];
  
  const impacts = [
    "Successfully delivered a functional prototype that met core requirements.",
    "Deepened understanding of full-stack integration and secure coding practices.",
    "Optimized performance and established a strong architectural foundation.",
    "Solved the core problem with a clean, maintainable codebase."
  ];

  // Simple hash for pseudo-random deterministic selection
  let hash = 0;
  for (let i = 0; i < repoName.length; i++) {
    hash = repoName.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  return {
    problem: problems[hash % problems.length],
    solution: repoDescription || "Engineered a custom software solution to address the core requirements.",
    impact: impacts[hash % impacts.length]
  };
};

export default function Missions() {
  const { repos, loading, error } = useGithubRepos('prajwal-2201');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section id="missions" className="py-32 px-6 relative z-10">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-300">Missions</span></h2>
            <p className="text-slate-400 text-lg max-w-xl font-light">
              Real problems. Real systems. Real solutions.
            </p>
          </div>
          
          <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="interactive inline-flex items-center gap-2 text-neon-blue hover:text-white transition-colors group">
            <span className="font-mono text-sm tracking-widest uppercase">View All on GitHub</span>
            <Github size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-10 glass-panel border-red-500/50">
            <p className="text-red-400 font-mono">Error fetching missions: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {repos.map((repo) => {
              const details = generateRepoDetails(repo.name, repo.description);

              return (
                <motion.div
                  key={repo.id}
                  variants={cardVariants}
                  className="interactive glass-panel p-8 group hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-neon-blue/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 group-hover:-rotate-12">
                    <Terminal size={120} />
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-blue/80 transition-colors shadow-inner group-hover:shadow-[inset_0_0_10px_rgba(0,240,255,0.3)]">
                      <Terminal size={24} className="text-neon-blue" />
                    </div>
                    <div className="flex gap-3 relative z-20">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="interactive text-slate-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="interactive text-slate-400 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-blue transition-colors truncate">{repo.name}</h3>
                  
                  {/* Default simple view */}
                  <div className="mb-6 flex-grow transition-opacity duration-300 group-hover:hidden block">
                     <p className="text-slate-300 text-sm font-light line-clamp-3">
                      {repo.description || "No description provided for this mission."}
                    </p>
                  </div>

                  {/* Hover detail view */}
                  <div className="mb-6 flex-grow opacity-0 group-hover:opacity-100 hidden group-hover:flex flex-col gap-3 transition-opacity duration-300">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block mb-0.5">Problem</span>
                      <p className="text-slate-300 text-xs">{details.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neon-green uppercase tracking-widest block mb-0.5">Solution</span>
                      <p className="text-slate-300 text-xs">{details.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest block mb-0.5">Impact</span>
                      <p className="text-slate-300 text-xs">{details.impact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {repo.language && (
                        <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-cyber-dark/80 border border-white/10 text-slate-300 group-hover:border-neon-blue/30 transition-colors">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-slate-400 text-sm font-mono">
                        <FaStar className="text-yellow-500" />
                        {repo.stargazers_count}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
