import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { FaGithub as Github, FaStar } from 'react-icons/fa';
import useGithubRepos from '../hooks/useGithubRepos';

export default function Missions() {
  const { repos, loading, error } = useGithubRepos('prajwal-2201');

  // Specific hardcoded projects from resume if we want to ensure they appear
  // We'll map GitHub repos, but fallback/supplement with resume data if needed
  // Since requirements say "fetch from GitHub API", we will rely primarily on the API

  return (
    <section id="missions" className="py-32 px-6 relative z-10">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-300">Missions</span></h2>
            <p className="text-slate-400 text-lg max-w-xl font-light">
              Real problems. Real systems. Real solutions.
            </p>
          </div>
          
          <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neon-blue hover:text-white transition-colors group">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => {
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-panel p-8 group hover:-translate-y-2 hover:border-neon-blue/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                    <Terminal size={120} />
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-blue/50 transition-colors">
                      <Terminal size={24} className="text-neon-blue" />
                    </div>
                    <div className="flex gap-3 relative z-20">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-blue transition-colors truncate">{repo.name}</h3>
                  
                  <div className="mb-8 flex-grow">
                    <p className="text-slate-300 text-sm font-light line-clamp-4">
                      {repo.description || "No description provided for this mission."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {repo.language && (
                        <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-slate-300">
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
          </div>
        )}
      </div>
    </section>
  );
}
