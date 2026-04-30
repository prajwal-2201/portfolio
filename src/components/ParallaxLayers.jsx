import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxLayers() {
  const containerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow background layer
      gsap.to(layer1Ref.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Faster mid layer
      gsap.to(layer2Ref.current, {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 1: Distant Grid / Hex */}
      <div ref={layer1Ref} className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-white rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-white rounded-full blur-[150px]" />
      </div>

      {/* Layer 2: Floating Elements */}
      <div ref={layer2Ref} className="absolute inset-0 opacity-[0.05]">
         <div className="absolute top-[40%] right-[15%] font-mono text-[10vw] text-white font-black select-none">0x847</div>
         <div className="absolute bottom-[30%] left-[10%] font-mono text-[8vw] text-white font-black select-none">IR-04</div>
         <div className="absolute top-[70%] right-[5%] font-mono text-[5vw] text-white font-black select-none opacity-20">NEXUS_CORE</div>
      </div>
    </div>
  );
}
