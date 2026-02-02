import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<number[]>([]);

  useLayoutEffect(() => {
    setHearts(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  useGSAP(() => {
    if (hearts.length === 0) return;

    const heartElements = containerRef.current?.querySelectorAll('.heart-item');
    heartElements?.forEach((heart) => {
      // Random initial properties
      const startX = Math.random() * window.innerWidth;
      const scale = Math.random() * 0.5 + 0.5;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;

      gsap.set(heart, {
        x: startX,
        y: "120vh",
        scale: scale,
        opacity: 0,
        rotation: 0
      });

      // Main floating animation
      gsap.to(heart, {
        y: "-20vh",
        duration: duration,
        repeat: -1,
        delay: delay,
        ease: "none",
        onRepeat: () => {
          // Reset X to random on repeat if desired, but for continuous flow simpler is fine.
          // If we want to randomize X again we'd need a more complex loop or onRepeat
          gsap.set(heart, { x: Math.random() * window.innerWidth });
        }
      });

      // Rotation animation
      gsap.to(heart, {
        rotation: 360,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        ease: "linear",
        delay: delay
      });

      // Opacity animation (fade in then out)
      // Since it moves continuously, we can keyframe opacity or just use a tween timeline
      // Constructing a timeline for opacity to sync with the main movement is a bit tricky with delay.
      // Easiest is to animate 0 -> 1 -> 0 over the duration.

      const opacityDuration = duration; // Match the movement duration approximately

      const tl = gsap.timeline({ repeat: -1, delay: delay });
      tl.to(heart, { opacity: 1, duration: duration * 0.2 })
        .to(heart, { opacity: 1, duration: duration * 0.6 }) // hold
        .to(heart, { opacity: 0, duration: duration * 0.2 });

    });
  }, { scope: containerRef, dependencies: [hearts] });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((i) => (
        <div
          key={i}
          className="heart-item absolute text-pink-200/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={Math.random() * 40 + 20} // Note: This random works on render, effectively static per heart
            height={Math.random() * 40 + 20} // Ideally should match width for aspect ratio if needed, but separate is fine
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            style={{ width: Math.random() * 40 + 20, height: Math.random() * 40 + 20 }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;