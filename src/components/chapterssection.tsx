"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  number: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  imageHue: string;
  parallaxSpeed: number;
  slug: string;
}

const chapters: Chapter[] = [
  {
    number: "01",
    romanNumeral: "I",
    title: "From Funeral to Ball",
    subtitle: "Winter, 1779",
    year: "1779",
    description:
      "A mourning procession winds through frost-hardened roads. By nightfall, the same family dresses for a grand ball — grief and celebration, separated only by silk.",
    imageHue: "200deg",
    parallaxSpeed: -40,
    slug: "from-funeral-to-ball",
  },
  {
    number: "02",
    romanNumeral: "II",
    title: "The Unopened Letter",
    subtitle: "Spring, 1780",
    year: "1780",
    description:
      "Found behind a false wall in the estate library — a letter addressed to no one, sealed with a crest that belonged to a family thought extinct for thirty years.",
    imageHue: "120deg",
    parallaxSpeed: -20,
    slug: "the-unopened-letter",
  },
  {
    number: "03",
    romanNumeral: "III",
    title: "A Portrait Without a Name",
    subtitle: "Summer, 1780",
    year: "1780",
    description:
      "The painting hangs in the east gallery. Every family member recognizes the face. Not one of them will say who she is.",
    imageHue: "30deg",
    parallaxSpeed: -60,
    slug: "a-portrait-without-a-name",
  },
  {
    number: "04",
    romanNumeral: "IV",
    title: "The Winter Inheritance",
    subtitle: "Autumn, 1781",
    year: "1781",
    description:
      "The estate passes hands. The debts are larger than the deed. And somewhere in the accounting ledgers, a name appears that should not exist.",
    imageHue: "260deg",
    parallaxSpeed: -30,
    slug: "the-winter-inheritance",
  },
];

export default function ChaptersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );

        const img = imageRefs.current[i];
        if (!img) return;
        gsap.to(img, {
          y: chapters[i].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0a0f18 0%, #080c14 100%)" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-white/[0.02] font-serif font-bold"
          style={{ fontSize: "clamp(120px, 20vw, 320px)", fontFamily: "var(--font-cormorant)" }}
        >
          Chapters
        </span>
      </div>

      <div
        ref={headerRef}
        className="max-w-6xl mx-auto mb-20 flex flex-col items-center text-center opacity-0"
      >
        <span className="text-xs tracking-[0.5em] uppercase text-gold/50 mb-4">
          The Archive
        </span>
        <h2
          className="font-serif italic text-4xl md:text-6xl text-white/90 mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Chapters
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-px bg-gold/20" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="5" y="0" width="7" height="7" transform="rotate(45 5 5)" fill="#c9a84c" fillOpacity="0.4" />
          </svg>
          <div className="w-20 h-px bg-gold/20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {chapters.map((chapter, i) => (
          <div
            key={chapter.number}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="group relative opacity-0 cursor-pointer"
          >
            <Link href={`/chapters/${chapter.slug}`}>
              <div
                className="relative overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-700"
                style={{ borderRadius: "2px" }}
              >
                {/* Image area */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className="absolute inset-0 scale-110"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08) 0%, transparent 60%),
                        linear-gradient(135deg, #0a0f18 0%, #111820 50%, #0d1117 100%)
                      `,
                      filter: `hue-rotate(${chapter.imageHue})`,
                    }}
                  >
                    <svg
                      className="absolute bottom-0 left-0 right-0 w-full opacity-20"
                      height="120"
                      viewBox="0 0 400 120"
                      preserveAspectRatio="xMidYMax meet"
                      fill="rgba(201,168,76,0.6)"
                    >
                      <path d="M0 120 L0 80 L20 80 L20 60 L30 60 L30 40 L40 40 L40 60 L60 60 L60 80 L80 80 L80 70 L100 70 L100 50 L110 40 L120 50 L120 70 L140 70 L140 60 L160 60 L160 80 L180 80 L180 75 L200 65 L220 75 L220 80 L240 80 L240 60 L260 60 L260 70 L280 70 L280 50 L290 40 L300 50 L300 70 L320 70 L320 80 L340 80 L340 60 L360 60 L360 80 L380 80 L380 70 L400 70 L400 120 Z" />
                    </svg>
                  </div>

                  <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                    style={{
                      background: "linear-gradient(to bottom, rgba(8,12,20,0.3) 0%, rgba(8,12,20,0.9) 100%)",
                    }}
                  />

                  <div className="absolute top-4 right-5 font-serif text-gold/20 text-5xl font-bold select-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}>
                    {chapter.romanNumeral}
                  </div>

                  <div className="absolute top-4 left-5">
                    <span className="text-xs tracking-widest text-gold/50 font-serif">
                      {chapter.year}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div
                  className="relative p-7"
                  style={{ background: "rgba(8, 12, 20, 0.95)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs tracking-[0.4em] text-gold/40 uppercase">
                      Chapter {chapter.number}
                    </span>
                    <div className="flex-1 h-px bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500" />
                  </div>

                  <h3
                    className="font-serif italic text-2xl text-white/90 mb-1 group-hover:text-gold/90 transition-colors duration-500"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {chapter.title}
                  </h3>

                  <p className="text-xs tracking-widest text-gold/40 mb-4 uppercase" style={{ letterSpacing: "0.25em" }}>
                    {chapter.subtitle}
                  </p>

                  <p
                    className="text-sm leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-500 font-serif"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
                  >
                    {chapter.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-xs tracking-[0.3em] text-gold/40 group-hover:text-gold/70 transition-colors duration-500 uppercase font-serif">
                      Read Chapter
                    </span>
                    <span
                      className="block h-px bg-gold/20 group-hover:bg-gold/50 transition-all duration-500"
                      style={{ width: "24px" }}
                    />
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-gold/30 group-hover:text-gold/60 transition-colors duration-500"
                    >
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16 flex justify-center">
        <button
          className="group flex items-center gap-4 border border-gold/15 hover:border-gold/30 px-10 py-4 transition-all duration-500"
          style={{ borderRadius: "1px" }}
        >
          <span
            className="text-xs tracking-[0.4em] uppercase text-gold/50 group-hover:text-gold/80 transition-colors duration-500 font-serif"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.4em" }}
          >
            View All Chapters
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold/30 group-hover:text-gold/60 transition-colors">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}