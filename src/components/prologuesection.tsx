"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prologueLines = [
  "It began, as most stories do,",
  "not with thunder or proclamation —",
  "but with a letter left unopened on a silver tray.",
  "",
  "The year was 1779.",
  "The estate was cold.",
  "And two families, long entwined by blood and secret,",
  "were about to be tested by something far older:",
  "",
  "the weight of memory.",
];

const prologueClosing = `
  What you hold here is not fiction.
  It is an archive — assembled from letters, parish records,
  portraits and silence — of a world that breathed
  before we had the words to name it.
`;

export default function PrologueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Ornament draw
      gsap.fromTo(
        ornamentRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Line by line reveal
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0, y: 18, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
            delay: i * 0.12,
          }
        );
      });

      // Closing paragraph
      gsap.fromTo(
        closingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  id="prologue"
  ref={sectionRef}
  className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0d1117 0%, #0a0f18 50%, #0d1117 100%)" }}
    >
      {/* Background texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.3) 40px)",
        }}
      />

      {/* Side ornament left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-20">
        <div className="w-px h-32 bg-gold" />
        <span className="text-gold text-xs tracking-[0.3em] rotate-90 whitespace-nowrap" style={{ fontFamily: "var(--font-cormorant)" }}>
          PROLOGUE
        </span>
        <div className="w-px h-32 bg-gold" />
      </div>

      {/* Section label */}
      <div ref={labelRef} className="mb-10 flex flex-col items-center gap-3 opacity-0">
        <span className="text-xs tracking-[0.5em] uppercase text-gold/60" style={{ letterSpacing: "0.45em" }}>
          Prologue
        </span>
        {/* Ornament line */}
        <div
          ref={ornamentRef}
          className="flex items-center gap-3 origin-center"
          style={{ opacity: 0 }}
        >
          <div className="w-16 h-px bg-gold/30" />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#c9a84c" fillOpacity="0.6" />
          </svg>
          <div className="w-16 h-px bg-gold/30" />
        </div>
      </div>

      {/* Main prologue text — line by line */}
      <div className="max-w-2xl w-full mx-auto text-center">
        <div className="font-serif text-xl md:text-2xl leading-relaxed text-white/85 mb-12">
          {prologueLines.map((line, i) =>
            line === "" ? (
              <br key={i} />
            ) : (
              <span
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                className="block opacity-0"
                style={{ display: "block", fontFamily: "var(--font-cormorant)" }}
              >
                {line}
              </span>
            )
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-24 h-px bg-gold/20" />
          <span className="text-gold/40 text-lg">❧</span>
          <div className="w-24 h-px bg-gold/20" />
        </div>

        {/* Closing paragraph */}
        <p
          ref={closingRef}
          className="font-serif italic text-base md:text-lg text-white/50 leading-loose opacity-0 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {prologueClosing.trim().split("\n").map((line, i) => (
            <span key={i} className="block">{line.trim()}</span>
          ))}
        </p>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <button
            className="group flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-gold/70 hover:text-gold transition-colors duration-500"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.3em" }}
          >
            <span>Enter the Archive</span>
            <span className="block w-8 h-px bg-gold/40 group-hover:w-14 transition-all duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}