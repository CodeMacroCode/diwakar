import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InfoSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Text container animation
    gsap.from(".info-text", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".info-text",
        start: "top 80%", // slightly before it hits viewport center
        toggleActions: "play none none none" // distinct from whileInView but fits 'once: true'
      }
    });

    // Image container animation
    gsap.from(".info-image", {
      scale: 0.9,
      opacity: 0,
      rotation: 5,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".info-image",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Optional: add hover effect logic locally if needed, but CSS hover handles the rotate-0

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-12 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="info-text space-y-8">
          <div className="border-t border-slate-300 w-12 mb-4"></div>
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-500">
            A Journey of Love
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif leading-tight">
            Every moment with you is a work of art.
          </h3>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            From the small laughs to the big adventures, you've colored my world in ways I never imagined. This isn't just about a single day; it's about celebrating the person who makes every day feel like a masterpiece.
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            I wanted to create something as special as you are to ask you something very important...
          </p>
        </div>

        <div className="info-image relative">
          {/* Polaroid Style Image */}
          <div className="relative bg-white p-4 md:p-6 shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
            <div className="aspect-[4/5] overflow-hidden bg-gray-200">
              <img
                src="/WhatsApp Image 2026-02-01 at 10.41.49 PM (2).jpeg"
                alt="Artistic couple"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-6 pb-2 text-center font-handwriting text-2xl text-slate-800 font-serif italic">
              You & Me
            </div>
          </div>

          {/* Decorative elements behind */}
          <div className="absolute -z-10 top-12 -right-12 w-full h-full border-2 border-slate-900 opacity-20"></div>
          <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

      </div>
    </section>
  );
};

export default InfoSection;