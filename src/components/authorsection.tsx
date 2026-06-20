"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "1998",
    title: "The Discovery",
    description:
      "Alexandra first encountered the Strahlborn family name in a dusty parish record at the State Archive of St. Petersburg. A single handwritten entry changed the direction of her research forever.",
  },
  {
    year: "2004",
    title: "The Journey to Vienna",
    description:
      "A six-month residency at the Austrian National Library unearthed the De Rionzini correspondence — 47 letters, three of which had never been catalogued.",
  },
  {
    year: "2011",
    title: "The Portrait",
    description:
      "A painting discovered in a private collection outside Warsaw confirmed what the letters only suggested: the two families had been far more intertwined than any official record admitted.",
  },
  {
    year: "2019",
    title: "The Archive Goes Digital",
    description:
      "After two decades of fieldwork, Alexandra began the process of converting the physical archive into this living digital estate — preserving every detail for those who come after.",
  },
];

const stats = [
  { value: "47", label: "Original Letters" },
  { value: "200+", label: "Years Documented" },
  { value: "12", label: "Archives Visited" },
  { value: "3", label: "Undiscovered Records" },
];

export default function AuthorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait reveal — scale up from slightly smaller
      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 0.88, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 80%",
          },
        }
      );

      // Name slides in from left
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 85%",
          },
        }
      );

      // Bio paragraphs fade up
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
          },
          delay: 0.2,
        }
      );

      // Stats count up
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
          }
        );
      });

      // Timeline vertical line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.8,
          ease: "power2.inOut",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
          },
        }
      );

      // Timeline items stagger in
      timelineItemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  id="author"
  ref={sectionRef}
  className="relative overflow-hidden py-28 px-6"
      style={{
        background:
          "linear-gradient(to bottom, #080c14 0%, #0a0f1a 40%, #080c14 100%)",
      }}
    >
      {/* Background parchment texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Section Label ── */}
        <div className="flex flex-col items-center mb-20">
          <span
            className="text-xs tracking-[0.5em] uppercase text-gold/50 mb-4"
            style={{ letterSpacing: "0.45em" }}
          >
            The Researcher
          </span>
          <h2
            className="font-serif italic text-4xl md:text-6xl text-white/90 mb-4 text-center"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The Author
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-px bg-gold/20" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect
                x="5"
                y="0"
                width="7"
                height="7"
                transform="rotate(45 5 5)"
                fill="#c9a84c"
                fillOpacity="0.4"
              />
            </svg>
            <div className="w-20 h-px bg-gold/20" />
          </div>
        </div>

        {/* ── Portrait + Bio Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Portrait left */}
          <div ref={portraitRef} className="flex justify-center opacity-0">
            <div className="relative">

              {/* Outer decorative frame */}
              <div
                className="absolute -inset-3 border border-gold/10"
                style={{ borderRadius: "1px" }}
              />
              <div
                className="absolute -inset-6 border border-gold/5"
                style={{ borderRadius: "1px" }}
              />

              {/* Corner ornaments */}
              {[
                "top-0 left-0",
                "top-0 right-0 rotate-90",
                "bottom-0 right-0 rotate-180",
                "bottom-0 left-0 -rotate-90",
              ].map((pos, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`absolute ${pos} text-gold/40`}
                  style={{ margin: "-10px" }}
                >
                  <path
                    d="M0 10 L10 0 M0 6 L6 0"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                </svg>
              ))}

{/* Portrait image */}
<div
  className="relative w-72 h-96 md:w-80 md:h-[420px] overflow-hidden"
  style={{ borderRadius: "1px" }}
>
  <Image
    src="/author.jpg"
    alt="Alexandra Fomicheva"
    fill
    className="object-cover object-top"
  />

  {/* Bottom fade over image */}
  <div
    className="absolute bottom-0 left-0 right-0 h-24"
    style={{
      background:
        "linear-gradient(to top, rgba(8,12,20,0.95) 0%, transparent 100%)",
    }}
  />

  {/* Name plate */}
  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
    <div className="w-16 h-px bg-gold/30 mb-2" />
    <span
      className="text-xs tracking-[0.3em] text-gold/50 uppercase font-serif"
      style={{ letterSpacing: "0.3em" }}
    >
      A. Fomicheva
    </span>
  </div>
              </div>
            </div>
          </div>

          {/* Bio right */}
          <div>
            <h3
              ref={nameRef}
              className="font-serif italic text-3xl md:text-4xl text-white/90 mb-2 opacity-0"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Alexandra Fomicheva
            </h3>

            <p
              className="text-xs tracking-[0.35em] uppercase text-gold/50 mb-8"
              style={{ letterSpacing: "0.3em" }}
            >
              Historian · Archivist · Digital Estate Builder
            </p>

            <div
              ref={bioRef}
              className="space-y-5 opacity-0"
            >
              <p
                className="font-serif text-base md:text-lg leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}
              >
                For over two decades, Alexandra Fomicheva has traced the intertwined histories
                of the Strahlborn and De Rionzini families — two aristocratic lineages whose
                fates crossed, diverged, and merged again across the turbulent years of
                late eighteenth-century Europe.
              </p>
              <p
                className="font-serif text-base md:text-lg leading-relaxed text-white/45"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}
              >
                Her work is not biography. It is forensic memory — the patient reconstruction
                of lives from the debris they left behind: letters, ledgers, portraits with
                no names on the back, and parish records that contradict each other in ways
                that are far too deliberate to be accidental.
              </p>
              <p
                className="font-serif text-base md:text-lg leading-relaxed text-white/45"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}
              >
                This digital archive is both her life&apos;s work and her invitation —
                to anyone willing to read carefully — to draw their own conclusions.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-end gap-4">
              <svg
                width="120"
                height="50"
                viewBox="0 0 120 50"
                fill="none"
                className="opacity-40"
              >
                <path
                  d="M8 38 Q20 10 35 28 Q45 40 55 20 Q65 5 80 22 Q90 32 105 18"
                  stroke="#c9a84c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M12 42 Q30 44 50 42 Q70 40 95 43"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span
                className="text-xs tracking-widest text-gold/30 mb-1 font-serif italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Alexandra Fomicheva, 2019
              </span>
            </div>

            {/* Contact CTA */}
            <div className="mt-8">
              <button
                className="group flex items-center gap-4 border border-gold/15 hover:border-gold/35 px-8 py-3 transition-all duration-500"
                style={{ borderRadius: "1px" }}
              >
                <span
                  className="text-xs tracking-[0.35em] uppercase text-gold/50 group-hover:text-gold/80 transition-colors duration-500 font-serif"
                  style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.35em" }}
                >
                  Commission Your Own Estate
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-gold/30 group-hover:text-gold/60 transition-colors"
                >
                  <path
                    d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/5 mb-24">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="flex flex-col items-center justify-center py-10 px-4 opacity-0"
              style={{ background: "rgba(8, 12, 20, 0.95)" }}
            >
              <span
                className="font-serif text-4xl md:text-5xl text-gold/80 mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-[0.3em] uppercase text-white/30"
                style={{ letterSpacing: "0.25em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Research Timeline ── */}
        <div className="flex flex-col items-center mb-8">
          <span
            className="text-xs tracking-[0.5em] uppercase text-gold/40 mb-4"
            style={{ letterSpacing: "0.45em" }}
          >
            The Research
          </span>
          <h3
            className="font-serif italic text-3xl md:text-4xl text-white/80 mb-12 text-center"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A Life in Archives
          </h3>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">

          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/15 origin-top"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
          />

          <div className="space-y-12">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                ref={(el) => { timelineItemRefs.current[i] = el; }}
                className={`relative flex items-start gap-8 opacity-0 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}
                >
                  <span
                    className="text-xs tracking-[0.4em] uppercase text-gold/40 mb-2 block"
                    style={{ letterSpacing: "0.35em" }}
                  >
                    {event.year}
                  </span>
                  <h4
                    className="font-serif italic text-xl text-white/80 mb-3"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {event.title}
                  </h4>
                  <p
                    className="font-serif text-sm leading-relaxed text-white/40"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "15px",
                    }}
                  >
                    {event.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 top-1 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border border-gold/50 bg-manor-bg" />
                </div>

                {/* Empty spacer for opposite side */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}