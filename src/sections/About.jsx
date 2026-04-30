import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current.innerText.split("");
      textRef.current.innerHTML = "";
      
      chars.forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = 0.1;
        textRef.current.appendChild(span);
      });

      gsap.to(textRef.current.children, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-40 px-6 relative z-10 bg-[#050505] flex items-center justify-center min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white uppercase"
        >
          I DON'T JUST FIND VULNERABILITIES. I ARCHITECT RESILIENCE. I BUILD AUTOMATED DEFENSES THAT ELIMINATE THREATS BEFORE THEY COMPROMISE THE SYSTEM.
        </h2>
        <div className="mt-20 w-[1px] h-32 bg-gradient-to-b from-white to-transparent mx-auto opacity-20" />
      </div>
    </section>
  );
}
