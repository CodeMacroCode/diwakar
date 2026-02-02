import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryImage } from '../types';

gsap.registerPlugin(ScrollTrigger);

const images: GalleryImage[] = [
  { id: 1, url: '/8GMxXhn71HnZEV5pnQD5q.1020.IRZXSOY.jpg', title: 'Us', subtitle: 'Beautiful Moments' },
  { id: 2, url: '/IMG-20251103-WA0024.jpg.jpeg', title: 'Memories', subtitle: 'Time flies' },
  { id: 3, url: '/MBPeQmGe2CQrGHwqCrOA3.1020.IRZXSOY.jpg', title: 'Together', subtitle: 'Always' },
  { id: 4, url: '/WhatsApp Image 2026-02-01 at 10.30.16 PM (1).jpeg', title: 'Love', subtitle: 'Undefined' },
  { id: 5, url: '/WhatsApp Image 2026-02-01 at 10.30.16 PM.jpeg', title: 'Smile', subtitle: 'Radiant' },
  // { id: 6, url: '/WhatsApp Image 2026-02-01 at 10.41.49 PM (1).jpeg', title: 'Joy', subtitle: 'Pure' },
  // { id: 7, url: '/WhatsApp Image 2026-02-01 at 10.41.49 PM (2).jpeg', title: 'Walks', subtitle: 'Hand in hand' },
  // { id: 8, url: '/WhatsApp Image 2026-02-01 at 10.41.49 PM.jpeg', title: 'Gaze', subtitle: 'In your eyes' },
  { id: 9, url: '/WhatsApp Image 2026-02-01 at 10.41.50 PM (1).jpeg', title: 'Laughs', subtitle: 'Loud & Clear' },
  { id: 10, url: '/WhatsApp Image 2026-02-01 at 10.41.50 PM (2).jpeg', title: 'Trips', subtitle: 'Far away' },
  { id: 11, url: '/WhatsApp Image 2026-02-01 at 10.41.50 PM.jpeg', title: 'Home', subtitle: 'Is you' },
  { id: 12, url: '/WhatsApp Image 2026-02-01 at 10.41.51 PM (1).jpeg', title: 'Silly', subtitle: 'Just being us' },
  { id: 13, url: '/WhatsApp Image 2026-02-01 at 10.41.51 PM (2).jpeg', title: 'Warmth', subtitle: 'Your hug' },
  { id: 14, url: '/WhatsApp Image 2026-02-01 at 10.41.51 PM.jpeg', title: 'Crazy', subtitle: 'In love' },
  { id: 15, url: '/WhatsApp Image 2026-02-01 at 10.41.52 PM (1).jpeg', title: 'Dates', subtitle: 'Night out' },
  { id: 16, url: '/WhatsApp Image 2026-02-01 at 10.41.52 PM (2).jpeg', title: 'Party', subtitle: 'Dancing' },
  { id: 17, url: '/WhatsApp Image 2026-02-01 at 10.41.52 PM.jpeg', title: 'Peace', subtitle: 'Quiet moments' },
  { id: 18, url: '/WhatsApp Image 2026-02-01 at 10.41.53 PM (1).jpeg', title: 'Roads', subtitle: 'Traveled' },
  { id: 19, url: '/WhatsApp Image 2026-02-01 at 10.41.53 PM (2).jpeg', title: 'Sky', subtitle: 'Above us' },
  { id: 20, url: '/WhatsApp Image 2026-02-01 at 10.41.53 PM.jpeg', title: 'Stars', subtitle: 'Shining' },
  { id: 21, url: '/WhatsApp Image 2026-02-01 at 10.41.54 PM (1).jpeg', title: 'Food', subtitle: 'Yummy' },
  { id: 22, url: '/WhatsApp Image 2026-02-01 at 10.41.54 PM (2).jpeg', title: 'Drinks', subtitle: 'Cheers' },
  { id: 23, url: '/WhatsApp Image 2026-02-01 at 10.41.54 PM (3).jpeg', title: 'Selfie', subtitle: 'Click' },
  { id: 24, url: '/WhatsApp Image 2026-02-01 at 10.41.54 PM.jpeg', title: 'Candid', subtitle: 'Natural' },
  { id: 25, url: '/WhatsApp Image 2026-02-01 at 10.41.55 PM (2).jpeg', title: 'Dreamy', subtitle: 'Vibes' },
  { id: 26, url: '/WhatsApp Image 2026-02-01 at 10.41.55 PM.jpeg', title: 'Magic', subtitle: 'Sparks' },
  { id: 27, url: '/WhatsApp Image 2026-02-01 at 10.41.56 PM (1).jpeg', title: 'Future', subtitle: 'Ours' },
];

const Gallery3D: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Horizontal Scroll
    const totalWidth = containerRef.current?.scrollWidth || 0;
    const viewportWidth = window.innerWidth;
    const xMovement = -(totalWidth - viewportWidth + 100); // 100px buffer or adjust based on padding

    gsap.to(containerRef.current, {
      x: () => - (containerRef.current?.scrollWidth || 0) + window.innerWidth, // Move until end is visible
      ease: "none",
      scrollTrigger: {
        trigger: targetRef.current,
        pin: true,
        scrub: 1,
        // The scroll length determines the speed/duration of the horizontal movement relative to vertical scroll
        end: () => "+=" + (containerRef.current?.scrollWidth || window.innerWidth),
        invalidateOnRefresh: true,
      }
    });

  }, { scope: targetRef, dependencies: [] });

  return (
    <section ref={targetRef} className="relative bg-slate-950 overflow-hidden">
      {/* Helper text overlay - absolute so it pins with the section but stays in place visually? 
            Actually if we pin the section, absolute children stay. 
        */}
      <div className="absolute top-12 left-12 z-10 mix-blend-difference text-white pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-serif">Our Collection</h2>
        <p className="text-xl opacity-70">A timeline of happiness</p>
      </div>

      {/* The container that actually moves */}
      <div className="h-screen flex items-center overflow-hidden">
        <div ref={containerRef} className="flex gap-12 px-24 pl-12 min-w-max">
          {/* Added min-w-max to ensure it calculates width correctly */}
          {images.map((img, index) => (
            <ImageCard key={img.id} img={img} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-10 text-white/50 text-sm animate-pulse">
        Keep Scrolling →
      </div>
    </section>
  );
};

const ImageCard: React.FC<{ img: GalleryImage; index: number }> = ({ img, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial state
    gsap.set(innerRef.current, { rotateY: 15 });

    // Hover cleanup needs manual handling or context safe, but direct event handlers work too.
    // However, GSAP `contextSafe` is better if we attach listeners in JSX.
    // Or we can just use `useEffect` style listeners.
    // Simplest: bind events to GSAP tweens.

  }, { scope: cardRef });

  const onEnter = () => {
    gsap.to(innerRef.current, { scale: 1.05, rotateY: 0, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(innerRef.current, { scale: 1, rotateY: 15, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      className="relative h-[50vh] w-[35vh] md:h-[65vh] md:w-[45vh] flex-shrink-0 bg-slate-800 overflow-visible" // overflow-visible for 3d
      style={{
        perspective: 1000,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative group cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 border-[12px] border-white shadow-2xl z-10 bg-white">
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Caption Overlay */}
        {/* <div className="absolute -bottom-16 -left-8 z-20 bg-white p-6 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform rotate-2"> */}
          {/* <h3 className="text-2xl font-serif text-slate-900">{img.title}</h3> */}
          {/* <p className="text-sm font-sans text-slate-500 uppercase tracking-wide">{img.subtitle}</p> */}
        {/* </div> */}

        {/* Film Strip Decor */}
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-black z-20 flex flex-col justify-between py-2 opacity-80">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-white mx-auto rounded-sm opacity-50"></div>
          ))}
        </div>
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-black z-20 flex flex-col justify-between py-2 opacity-80">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-white mx-auto rounded-sm opacity-50"></div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Gallery3D;