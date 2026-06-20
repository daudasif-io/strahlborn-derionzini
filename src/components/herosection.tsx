"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SeasonOrbit from "./seasonorbit";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP text entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
  }, []);

  // Blinking scroll line animation
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, opacity: 1, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.2,
      }
    );
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    if (!bg || !overlay) return;

    const BG_STRENGTH = 28;
    const OVERLAY_STRENGTH = 10;

    let targetBgX = 0;
    let targetBgY = 0;
    let targetOvX = 0;
    let targetOvY = 0;
    let currentBgX = 0;
    let currentBgY = 0;
    let currentOvX = 0;
    let currentOvY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetBgX = -nx * BG_STRENGTH;
      targetBgY = -ny * BG_STRENGTH;
      targetOvX = -nx * OVERLAY_STRENGTH;
      targetOvY = -ny * OVERLAY_STRENGTH;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentBgX = lerp(currentBgX, targetBgX, 0.06);
      currentBgY = lerp(currentBgY, targetBgY, 0.06);
      currentOvX = lerp(currentOvX, targetOvX, 0.08);
      currentOvY = lerp(currentOvY, targetOvY, 0.08);
      bg.style.transform = `scale(1.08) translate(${currentBgX}px, ${currentBgY}px)`;
      overlay.style.transform = `translate(${currentOvX}px, ${currentOvY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* FIXED background — stays locked while page scrolls */}
      <div
        ref={bgRef}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/manor-bg.jpg')",
          filter: "brightness(0.75) saturate(0.9)",
          transform: "scale(1.08) translate(0px, 0px)",
          zIndex: 0,
        }}
      />

      {/* Fixed atmospheric overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(13,17,23,0.1) 0%, rgba(13,17,23,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Fixed dark bottom fade */}
      <div
        className="fixed bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, #0d1117 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* SCROLLABLE content on top of fixed bg */}
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ zIndex: 3 }}
      >
        {/* Hero content */}
        <div className="relative flex flex-col items-center text-center px-4 max-w-4xl mx-auto">

          {/* Season orbit + monogram */}
          <SeasonOrbit />

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-white mt-4 opacity-0"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.8)",
              letterSpacing: "-0.01em",
            }}
          >
            Strahlborn and De Rionzini
          </h1>

          {/* Archival saga */}
          <p
            ref={subtitleRef}
            className="mt-3 text-xs tracking-[0.4em] uppercase text-gold/80 opacity-0"
            style={{ letterSpacing: "0.35em" }}
          >
            ✦ &nbsp; An Archival Saga &nbsp; ✦
          </p>

          {/* Chapter title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-6 text-2xl md:text-3xl font-serif font-medium text-gold"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
          >
            From Funeral to Ball
          </motion.h2>

          {/* Quote */}
          <div ref={quoteRef} className="mt-5 opacity-0">
            <p
              className="font-serif italic text-base md:text-lg text-white/75 leading-relaxed max-w-xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              Let us no longer idle on —
              <br />
              With idle gossip, empty talk.
              <br />
              I&apos;ve dreamed of this — confess I must —
              <br />
              To paint the town ball, just once.
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-3 flex flex-col items-center gap-3"
          >
            <span
              className="text-xs tracking-[0.4em] uppercase text-white/30"
              style={{ letterSpacing: "0.4em" }}
            >
              Scroll
            </span>

            {/* Blinking cursor line */}
            <div className="relative w-px h-16 bg-white/10 overflow-hidden">
              <div
                ref={lineRef}
                className="absolute top-0 left-0 w-full bg-gold"
                style={{
                  height: "100%",
                  transformOrigin: "top center",
                  transform: "scaleY(0)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Year + heart bottom left */}
        <div className="absolute bottom-12 left-8 flex flex-col items-center gap-1">
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            className="text-gold/60"
          >
            <path
              d="M20 35s-14-9-14-20a8 8 0 0116 0 8 8 0 0116 0c0 11-14 20-18 20z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 12c2-3 6-4 8 0"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs tracking-widest text-gold/50 font-serif">
            1779
          </span>
        </div>

        {/* Bottom copyright */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30">
            © Designed & Researched by Alexandra Fomicheva
          </p>
          <p className="text-xs italic text-white/20 mt-1">
            Contact me to build a proper digital estate for your own history.
          </p>
        </div>
      </section>

      {/* Below hero scrollable content — background stays fixed */}
      <div className="relative" style={{ zIndex: 3 }}>

        {/* Dark overlay so text is readable over fixed bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(8,12,20,0.92)" }}
        />

        <div className="relative max-w-3xl mx-auto px-6 py-32 flex flex-col items-center text-center">

          {/* Ornament */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-px bg-gold/20" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                fill="#c9a84c"
                fillOpacity="0.5"
              />
            </svg>
            <div className="w-16 h-px bg-gold/20" />
          </div>

          <h2
            className="font-serif italic text-3xl md:text-5xl text-white/80 mb-8"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A Story Told in Fragments
          </h2>

          <p
            className="font-serif text-base md:text-lg text-white/45 leading-loose mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}
          >
            The archive you are entering is not a museum. It is a living record —
            assembled over two decades from letters, parish documents, portraits
            without names, and ledgers that contradict themselves in ways too
            deliberate to be accidental.
          </p>

          <p
            className="font-serif text-base md:text-lg text-white/35 leading-loose mb-16"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}
          >
            What happened between the Strahlborn and De Rionzini families between
            1779 and 1801 has never been fully told. Until now.
          </p>

          {/* Explore links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
            {[
              { label: "Read the Prologue", href: "/prologue" },
              { label: "Meet the Author", href: "/author" },
              { label: "Browse Chapters", href: "/chapters" },
            ].map((item) => (
              
               <a key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-3 border border-gold/10 hover:border-gold/30 py-6 px-4 transition-all duration-500"
                style={{ borderRadius: "1px" }}
              >
                <span
                  className="font-serif italic text-sm text-white/40 group-hover:text-gold/70 transition-colors duration-500"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
                >
                  {item.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold/20 group-hover:text-gold/50 transition-colors">
                  <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}