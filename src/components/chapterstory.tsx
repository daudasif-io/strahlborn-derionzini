"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ChapterData {
  number: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  year: string;
  story: string[];
  nextSlug: string | null;
  nextTitle: string | null;
}

export default function ChapterStory({ chapter }: { chapter: ChapterData }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );

      // Each paragraph fades in on scroll
      paragraphRefs.current.forEach((para) => {
        if (!para) return;
        gsap.fromTo(
          para,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: para,
              start: "top 88%",
            },
          }
        );
      });

      // Next chapter block
      gsap.fromTo(
        nextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <article
      className="relative min-h-screen px-6 pt-32 pb-24"
      style={{ background: "linear-gradient(to bottom, #080c14 0%, #0a0f18 100%)" }}
    >
      {/* Ghost roman numeral background */}
      <div
        className="fixed top-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden
        style={{ zIndex: 0 }}
      >
        <span
          className="font-serif font-bold text-white/[0.02]"
          style={{
            fontSize: "clamp(200px, 35vw, 500px)",
            fontFamily: "var(--font-cormorant)",
            lineHeight: 1,
          }}
        >
          {chapter.romanNumeral}
        </span>
      </div>

      <div className="relative max-w-2xl mx-auto" style={{ zIndex: 1 }}>

        {/* Back to chapters */}
        <Link
          href="/chapters"
          className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-gold/40 hover:text-gold/70 transition-colors duration-300 mb-16 group"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-1 transition-transform duration-300">
            <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span style={{ letterSpacing: "0.3em" }}>All Chapters</span>
        </Link>

        {/* Chapter header */}
        <div ref={headerRef} className="mb-16 opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs tracking-[0.45em] uppercase text-gold/40">
              Chapter {chapter.number}
            </span>
            <div className="flex-1 h-px bg-gold/15" />
            <span className="text-xs tracking-widest text-gold/30 font-serif italic">
              {chapter.year}
            </span>
          </div>

          <h1
            className="font-serif italic text-4xl md:text-6xl text-white/90 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {chapter.title}
          </h1>

          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-10" style={{ letterSpacing: "0.35em" }}>
            {chapter.subtitle}
          </p>

          {/* Ornament divider */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gold/20" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8L5 0Z" fill="#c9a84c" fillOpacity="0.5" />
            </svg>
            <div className="w-16 h-px bg-gold/20" />
          </div>
        </div>

        {/* Story paragraphs */}
        <div className="space-y-7">
          {chapter.story.map((paragraph, i) => (
            <p
              key={i}
              ref={(el) => { paragraphRefs.current[i] = el; }}
              className="font-serif leading-loose text-white/65 opacity-0"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "18px",
                // First paragraph slightly larger and brighter
                ...(i === 0 && {
                  fontSize: "20px",
                  color: "rgba(255,255,255,0.8)",
                }),
                // Dialogue lines slightly indented
                ...(paragraph.startsWith("'") && {
                  paddingLeft: "1.5rem",
                  borderLeft: "1px solid rgba(201,168,76,0.15)",
                  color: "rgba(255,255,255,0.75)",
                }),
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* End ornament */}
        <div className="flex items-center justify-center gap-4 mt-16 mb-16">
          <div className="w-24 h-px bg-gold/15" />
          <span className="text-gold/30 text-xl">❧</span>
          <div className="w-24 h-px bg-gold/15" />
        </div>

        {/* Next chapter */}
        <div ref={nextRef} className="opacity-0">
          {chapter.nextSlug ? (
            <Link
              href={`/chapters/${chapter.nextSlug}`}
              className="group flex flex-col items-center text-center gap-4 border border-gold/10 hover:border-gold/25 py-10 px-8 transition-all duration-500"
              style={{ borderRadius: "1px" }}
            >
              <span className="text-xs tracking-[0.4em] uppercase text-gold/30 group-hover:text-gold/50 transition-colors duration-500">
                Continue Reading
              </span>
              <span
                className="font-serif italic text-2xl md:text-3xl text-white/60 group-hover:text-white/85 transition-colors duration-500"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {chapter.nextTitle}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-gold/25 group-hover:text-gold/50 transition-colors duration-500 group-hover:translate-y-1 transition-transform"
              >
                <path d="M8 1v14M1 8l7 7 7-7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </Link>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 border border-gold/10 py-10 px-8"
              style={{ borderRadius: "1px" }}>
              <span className="text-xs tracking-[0.4em] uppercase text-gold/30">
                End of Current Archive
              </span>
              <p className="font-serif italic text-lg text-white/30" style={{ fontFamily: "var(--font-cormorant)" }}>
                Further chapters are being assembled from the archive.
              </p>
              <Link
                href="/chapters"
                className="mt-2 text-xs tracking-widest uppercase text-gold/40 hover:text-gold/70 transition-colors duration-300"
              >
                Return to Chapters
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}