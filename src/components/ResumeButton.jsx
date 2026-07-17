import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function ResumeButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="/Prajwal_resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 left-8 z-[200] flex items-center gap-2 px-4 py-3 bg-[#050505] border border-amber-500/30 text-amber-500 text-[9px] font-mono uppercase tracking-[0.25em] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:border-amber-500/70 hover:bg-amber-950/20 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      title="Download Resume"
    >
      <Download size={12} className="flex-shrink-0" />
      <span>Resume</span>
    </a>
  );
}
