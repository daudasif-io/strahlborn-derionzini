"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

export default function SeasonOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rotate the entire orbit container
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const radius = 90; // px from center

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {/* Rotating season labels */}
      <div
        ref={orbitRef}
        className="absolute inset-0"
        style={{ transformOrigin: "center center" }}
      >
        {seasons.map((season, i) => {
          const angle = (i / seasons.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const rotateDeg = (i / seasons.length) * 360;

          return (
            <div
              key={season}
              className="absolute text-xs tracking-widest text-gold/70 font-serif italic select-none"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${rotateDeg + 90}deg)`,
                fontSize: "11px",
                letterSpacing: "0.15em",
              }}
            >
              {season}
            </div>
          );
        })}
      </div>

      {/* Center monogram */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
        }}
      >
        {/* Decorative circle behind monogram */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="absolute"
          style={{ opacity: 0.15 }}
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#c9a84c"
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="4 6"
          />
        </svg>

        {/* SD Monogram */}
        <span
          className="font-serif text-gold text-4xl font-bold select-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            textShadow: "0 0 20px rgba(201,168,76,0.4)",
            letterSpacing: "-0.05em",
          }}
        >
          SD
        </span>
      </div>
    </div>
  );
}