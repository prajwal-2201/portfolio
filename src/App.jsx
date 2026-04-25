import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Missions from './sections/Missions';
import LabReports from './sections/LabReports';
import Arsenal from './sections/Arsenal';
import GithubHighlights from './sections/GithubHighlights';
import LearningNow from './sections/LearningNow';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import TerminalModal from './components/TerminalModal';
import QuickActionBar from './components/QuickActionBar';

function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-300 bg-grid">
      <TerminalModal />
      <QuickActionBar />
      <div className="scanline" />
      
      {/* Decorative Overlay - Lowered Z-Index */}
      <div className="fixed inset-0 pointer-events-none z-0 border-[10px] border-white/[0.02]" />
      
      <Navbar />
      <Hero />
      
      <main className="relative z-10">
        <Journey />
        <Missions />
        <LabReports />
        <Arsenal />
        <GithubHighlights />
        <LearningNow />
        <Certifications />
        <Contact />
      </main>
      
      <footer className="py-12 border-t border-white/5 bg-[#020202] text-center text-slate-500 font-mono text-[10px] uppercase tracking-widest relative z-10">
        <p>© 2025 SECURITY_OPERATIONS_CENTER // PRAJWAL_V</p>
      </footer>
    </div>
  );
}

export default App;
