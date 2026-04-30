import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Arsenal from './sections/Arsenal';
import Featured from './sections/Featured';
import TerminalSection from './sections/TerminalSection';
import Research from './sections/Research';
import Operations from './sections/Operations';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-[#020202] text-slate-300 overflow-hidden font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Arsenal />
        <TerminalSection />
        <Featured />
        <Research />
        <Operations />
        <Contact />
      </main>
      
      <footer className="py-8 border-t border-white/10 bg-[#020202] text-center text-slate-500 text-[10px] uppercase tracking-[0.3em] relative z-10 flex flex-col items-center justify-center gap-2">
        <p>PRAJWAL V. © {new Date().getFullYear()}</p>
        <p className="text-white/20">SECURITY ARCHITECT · DETECTION ENGINEER</p>
      </footer>
    </div>
  );
}

export default App;
