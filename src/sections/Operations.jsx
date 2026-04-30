import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, GitFork, Shield, RefreshCw, ChevronDown, ExternalLink, Terminal } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Auto-classifier ──────────────────────────────────────────────────────────
const SECURITY_KEYWORDS = [
  'security','cyber','forensic','malware','exploit','threat','soc','siem',
  'pentest','penetration','vuln','yara','sigma','incident','dfir','detection',
  'edr','firewall','ctf','reverse','osint','recon','payload','bypass','inject',
  'nmap','metasploit','burp','wazuh','splunk','sentinel','nexus','cybersentinel',
  'infosec','appsec','devsecops',
];
const BLOCKED = [
  'wanderluxe','portfolio','profolioilo','petsentinel',
  'pet-health','pet-app','syncflow','weather','blog',
];
const isSecurityRepo = r => {
  const h = [r.name, r.description ?? '', ...(r.topics ?? [])].join(' ').toLowerCase();
  return SECURITY_KEYWORDS.some(k => h.includes(k));
};
const isBlocked = r => BLOCKED.some(b => r.name.toLowerCase().includes(b));

const LANG_COLORS = {
  Python:'#3572A5', JavaScript:'#f1e05a', TypeScript:'#3178c6',
  'C++':'#f34b7d', C:'#555555', Go:'#00ADD8', Rust:'#dea584', Shell:'#89e051',
};

// Status labels — maps to a "mission status"
const missionStatus = (repo) => {
  const updated = new Date(repo.updated_at);
  const days = (Date.now() - updated) / 86400000;
  if (days < 7)  return { label: 'ACTIVE',   color: 'text-green-400',  dot: 'bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]' };
  if (days < 60) return { label: 'ONGOING',  color: 'text-yellow-400', dot: 'bg-yellow-500' };
  return              { label: 'ARCHIVED',  color: 'text-slate-600',  dot: 'bg-slate-700' };
};

// ─── Single Case File Card ────────────────────────────────────────────────────
function CaseFile({ repo, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const cardRef = useRef(null);
  const status  = missionStatus(repo);

  const toggle = () => {
    if (!open) {
      setOpen(true);
      // Expand animation runs after state update + DOM paint
      requestAnimationFrame(() => {
        gsap.fromTo(bodyRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0, opacity: 0, duration: 0.4, ease: 'power3.in',
        onComplete: () => setOpen(false),
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group border rounded-xl overflow-hidden transition-colors duration-300 cursor-pointer
        ${open ? 'border-white/20 bg-[#0e0e0e]' : 'border-white/8 bg-[#0a0a0a] hover:border-white/15'}`}
      onClick={toggle}
    >
      {/* Header row — always visible */}
      <div className="flex items-center gap-4 p-5">
        {/* Mission number */}
        <span className="text-[10px] font-mono text-slate-700 w-8 shrink-0 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Status dot */}
        <div className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />

        {/* Repo name */}
        <h3 className="text-sm font-semibold text-white flex-1 capitalize tracking-tight line-clamp-1">
          {repo.name.replace(/[-_]/g, ' ')}
        </h3>

        {/* Language */}
        {repo.language && (
          <span className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-600 font-mono shrink-0">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? '#64748b' }} />
            {repo.language}
          </span>
        )}

        {/* Status label */}
        <span className={`text-[9px] font-mono uppercase tracking-widest shrink-0 ${status.color}`}>
          {status.label}
        </span>

        {/* Stars */}
        <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-700 shrink-0">
          <Star size={10} /> {repo.stargazers_count}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className={`text-slate-600 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Expandable case file body */}
      {open && (
        <div ref={bodyRef} style={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <div className="px-5 pb-5 border-t border-white/5">

            {/* Fake case file header */}
            <div className="flex items-center gap-2 mt-4 mb-4">
              <Terminal size={12} className="text-slate-600" />
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                CASE FILE · {repo.full_name.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 font-light leading-relaxed mb-5">
              {repo.description || 'Security tooling — see repository for detailed documentation.'}
            </p>

            {/* Topics */}
            {repo.topics?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {repo.topics.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[9px] font-mono text-slate-500 border border-white/8 bg-white/[0.02] uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Meta row */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-5">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Star size={10}/> {repo.stargazers_count} stars</span>
                <span className="flex items-center gap-1"><GitFork size={10}/> {repo.forks_count} forks</span>
              </div>
              <span>Updated {new Date(repo.updated_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}</span>
            </div>

            {/* CTA */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[11px] font-mono text-white border border-white/15 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-200 uppercase tracking-widest"
            >
              <ExternalLink size={12} /> Open Repository
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Operations() {
  const sectionRef = useRef(null);
  const listRef    = useRef(null);
  const [repos, setRepos]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [lastFetch, setLastFetch] = useState(null);
  const animatedOnce = useRef(false);

  const fetchRepos = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res  = await fetch(
        'https://api.github.com/users/prajwal-2201/repos?sort=updated&per_page=50',
        { headers: { Accept: 'application/vnd.github+json' } }
      );
      const data = await res.json();
      if (!Array.isArray(data)) return;
      const filtered = data
        .filter(r => !r.fork)
        .filter(r => !isBlocked(r))
        .filter(r => isSecurityRepo(r))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 12);
      setRepos(filtered);
      setLastFetch(new Date());
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchRepos(); }, [fetchRepos]);

  // Poll every 5 min
  useEffect(() => {
    const id = setInterval(() => fetchRepos(true), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchRepos]);

  // Stagger cards on first appear
  useEffect(() => {
    if (loading || !listRef.current || animatedOnce.current) return;
    animatedOnce.current = true;
    setTimeout(() => ScrollTrigger.refresh(), 120);

    const ctx = gsap.context(() => {
      gsap.fromTo([...listRef.current.children],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-32 px-6 relative z-10 bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.012] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] mb-3 font-mono">
              // 03 · Operations · Live Feed
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-2">
              Active <span className="font-semibold">Operations</span>
            </h2>
            <p className="text-slate-500 text-sm font-light max-w-sm leading-relaxed">
              Security projects pulled live from GitHub. Click any operation to open its case file.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">Live Feed</span>
            </div>
            {lastFetch && (
              <div className="flex items-center gap-2 text-[10px] text-slate-700 font-mono">
                <span>Synced {lastFetch.toLocaleTimeString()}</span>
                <button onClick={() => fetchRepos(true)} className="hover:text-white transition-colors" title="Sync now">
                  <RefreshCw size={10} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6 text-[9px] font-mono text-slate-700 uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Ongoing</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-700" /> Archived</span>
          <span className="ml-auto">Click to expand case file</span>
        </div>

        {/* Case Files list */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3">
            <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Fetching operations…</span>
          </div>
        ) : repos.length === 0 ? (
          <p className="text-slate-700 text-xs font-mono text-center py-20">No active operations found.</p>
        ) : (
          <div ref={listRef} className="space-y-2">
            {repos.map((repo, i) => (
              <CaseFile key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/prajwal-2201"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/12 text-white text-[10px] font-mono uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors rounded-full"
          >
            <Github size={13} /> All Operations
          </a>
        </div>
      </div>
    </section>
  );
}
