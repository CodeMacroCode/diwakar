import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    confetti: any;
  }
}

const Proposal: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Background hearts throb
    gsap.to(".bg-heart", {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (!accepted) {
      // Question mode animations
      // Heart throb
      gsap.to(heartRef.current, {
        rotation: 10,
        duration: 0.2, // fast wiggles
        repeat: -1,
        yoyo: true,
        ease: "linear"
      });

      // Note: rotation: [0, 10, -10, 0] in original is a wiggle. 
      // GSAP keyframes or just yoyo 10 to -10 works.
      gsap.fromTo(heartRef.current,
        { rotation: -10 },
        { rotation: 10, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true }
      );

      // Entrance if needed (e.g. initial load)
      gsap.from(questionRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    } else {
      // Celebration mode animations
      // Entrance
      gsap.fromTo(celebrationRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".celebration-icon", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
      });
    }
  }, { scope: containerRef, dependencies: [accepted] });

  // Confetti trigger
  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      if (window.confetti) {
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }
    }, 250);
  };

  const handleYesClick = () => {
    // Animate out question
    gsap.to(questionRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setAccepted(true);
        triggerConfetti();
      }
    });
  };

  const moveNoButton = () => {
    if (questionRef.current && noBtnRef.current) {
      // Don't calculate based on full container to avoid huge jumps
      // Use constrained values
      const safeXRange = 300; // Left/Right range
      const safeYRange = 250; // Up/Down range

      // Bias Y upwards (negative) because the button is already at the bottom
      const newX = (Math.random() - 0.5) * safeXRange;
      const newY = (Math.random() * -safeYRange) + 50; // mostly up (-200 to +50)

      gsap.to(noBtnRef.current, {
        x: newX,
        y: newY,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen relative flex items-center justify-center bg-[#2e0235] overflow-hidden py-20 font-sans">
      {/* Background Decor - Abstract Leaf/Floral Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left Leaves */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#4b0d4f] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFC2D1] rounded-full blur-2xl opacity-20"></div>

        {/* Bottom Right Leaves */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#4A0E4E] rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-[#FF3366] rounded-full blur-3xl opacity-20"></div>

        {/* Floating elements */}
        <div className="bg-heart absolute top-1/4 left-1/4 text-pink-500/20"><Heart size={40} /></div>
        <div className="bg-heart absolute top-3/4 right-1/4 text-purple-400/20"><Heart size={60} /></div>
        <div className="bg-heart absolute top-1/2 left-10 text-red-400/20"><Heart size={30} /></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center">

        {!accepted ? (
          <div
            key="question"
            ref={questionRef}
            className="relative z-20"
          >
            {/* Main Title Style */}
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-4 drop-shadow-xl uppercase leading-none">
              VALENTINE'S<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200">DAY</span>
            </h1>

            <div ref={heartRef} className="inline-block my-8">
              <Heart className="w-24 h-24 text-pink-400 fill-pink-600 drop-shadow-2xl filter blur-[1px]" />
            </div>

            <p className="text-xl md:text-2xl text-pink-100/80 mb-12 font-medium tracking-wide max-w-2xl mx-auto">
              WILL YOU BE MY VALENTINE?
            </p>

            <div className="relative h-32 flex items-center justify-center gap-6 mt-8">
              {/* YES BUTTON - 'START NOW' Style */}
              <button
                onClick={handleYesClick}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1 })}
                onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.1 })}
                className="bg-white text-[#4A0E4E] font-black py-4 px-12 rounded-full text-xl shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_60px_rgba(255,255,255,0.5)] transition-all z-20 uppercase tracking-wider"
              >
                Yes, Absolutely!
              </button>

              {/* NO BUTTON */}
              <button
                ref={noBtnRef}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="bg-transparent text-white/50 font-bold py-4 px-8 rounded-full text-lg border-2 border-white/20 hover:bg-white/10 z-20 uppercase tracking-widest"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div
            key="celebration"
            ref={celebrationRef}
            className="bg-white text-slate-900 p-12 rounded-3xl shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500"></div>

            <div className="flex justify-center gap-4 mb-6">
              <Sparkles className="celebration-icon w-12 h-12 text-yellow-400" />
              <Heart className="celebration-icon w-12 h-12 text-red-500 fill-red-500" />
              <Sparkles className="celebration-icon w-12 h-12 text-yellow-400" />
            </div>

            <h2 className="text-5xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-purple-600 mb-6">
              YAY! ❤️
            </h2>
            <p className="text-2xl text-slate-600 font-light mb-8">
              Best. Decision. Ever. I love you so much!
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <img src="/WhatsApp Image 2026-02-01 at 10.41.53 PM (2).jpeg" className="rounded-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-lg" alt="Happy" />
              <img src="/WhatsApp Image 2026-02-01 at 10.41.55 PM (1).jpeg" className="rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-lg" alt="Love" />
            </div>

            <div className="mt-8 text-sm text-slate-400 uppercase tracking-widest">
              Let the celebration begin
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Proposal;