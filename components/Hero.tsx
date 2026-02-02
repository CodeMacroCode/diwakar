import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart } from 'lucide-react';

const trailImages = [
  '/8GMxXhn71HnZEV5pnQD5q.1020.IRZXSOY.jpg',
  '/IMG-20251103-WA0024.jpg.jpeg',
  '/MBPeQmGe2CQrGHwqCrOA3.1020.IRZXSOY.jpg',
  '/WhatsApp Image 2026-02-01 at 10.30.16 PM (1).jpeg',
  '/WhatsApp Image 2026-02-01 at 10.30.16 PM.jpeg',
  '/WhatsApp Image 2026-02-01 at 10.41.49 PM (1).jpeg',
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef<{ x: number, y: number, time: number }>({ x: 0, y: 0, time: 0 });

  useGSAP(() => {
    // Background abstract shapes
    gsap.to(".bg-shape-1", {
      scale: 1.2,
      rotation: 10,
      duration: 10, // Slower for smoother feel
      repeat: -1,
      yoyo: true, // Auto reverse
      ease: "sine.inOut"
    });

    gsap.to(".bg-shape-2", {
      scale: 1.5,
      rotation: -20,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(".hero-heart", {
      y: 50,
      opacity: 0,
      duration: 0.8
    })
      .from(".hero-title", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8
      }, "-=0.4")
      .from(".hero-text", {
        opacity: 0,
        duration: 0.8
      }, "-=0.2")
      .from(".hero-scroll", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.2");

  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    const x = e.clientX; // Use clientX/Y for fixed position elements or relative to viewport
    // Calculate distance from last spawn
    const dx = x - lastSpawn.current.x;
    const dy = e.clientY - lastSpawn.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Thresholds: Distance > 50px OR Time > 100ms (but enforce some distance)
    if (dist > 50 && now - lastSpawn.current.time > 50) {
      lastSpawn.current = { x, y: e.clientY, time: now };

      if (trailRef.current) {
        const img = document.createElement("img");
        const randomImage = trailImages[Math.floor(Math.random() * trailImages.length)];
        img.src = randomImage;
        img.className = "absolute w-32 h-40 object-cover rounded-lg shadow-xl pointer-events-none z-20 border-2 border-pink-400/50";

        // Center on cursor
        const rotation = Math.random() * 30 - 15;

        gsap.set(img, {
          left: x,
          top: e.clientY,
          xPercent: -50,
          yPercent: -50,
          rotation: rotation,
          scale: 0,
          opacity: 0
        });

        trailRef.current.appendChild(img);

        // Animate
        const tl = gsap.timeline({
          onComplete: () => {
            if (img.parentNode) img.parentNode.removeChild(img);
          }
        });

        // Appear
        tl.to(img, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.5)"
        })
          // Glitch disappear
          .to(img, {
            scale: 1.2,
            opacity: 0,
            duration: 0.4,
            filter: "hue-rotate(90deg) blur(4px) invert(1)",
            skewX: 20,
            delay: 0.2, // stay visible briefly
            ease: "power2.in"
          });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 text-white cursor-none" // Added cursor-none for effect
    >
      {/* Trail Container */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-50"></div>

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="bg-shape-1 absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 origin-center"
        />
        <div
          className="bg-shape-2 absolute top-1/2 -right-32 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 origin-center"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="hero-heart flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full">
            <Heart className="text-pink-400 fill-pink-400 w-8 h-8 animate-pulse" />
          </div>
        </div>

        <h1 className="hero-title text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-pink-400 to-purple-400 drop-shadow-2xl">
          VALENTINE'S<br />DAY
        </h1>

        {/* <p className="hero-text text-xl md:text-2xl text-pink-100 font-light max-w-2xl mx-auto mt-6">
          A digital journey through our moments, memories, and a very special question.
        </p> */}

        <div className="hero-scroll mt-12">
          <div className="animate-bounce">
            <span className="text-sm uppercase tracking-widest text-white/60">Scroll Down</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;