"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Archive: ["Prologue", "Chapters", "Tree Template", "Guest Publications"],
  Research: ["Methodology", "Primary Sources", "Parish Records", "Correspondence"],
  Connect: ["About the Author", "Commission an Estate", "Contact", "Newsletter"],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </svg>
    ),
  },
  {
    label: "Copy Link",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top gold bar draws in
      gsap.fromTo(
        topBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Monogram fades in with scale
      gsap.fromTo(
        monogramRef.current,
        { opacity: 0, scale: 0.7, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
          delay: 0.3,
        }
      );

      // Quote line by line
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
          delay: 0.5,
        }
      );

      // Email newsletter block
      gsap.fromTo(
        emailRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 90%",
          },
          delay: 0.2,
        }
      );

      // Links columns fade up stagger
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 90%",
          },
        }
      );

      // Bottom bar
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
          },
          delay: 0.3,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #080c14 0%, #050810 60%, #020408 100%)",
      }}
    >
      {/* Top gold hairline */}
      <div
        ref={topBarRef}
        className="w-full h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, #c9a84c, transparent)" }}
      />

      {/* Background ghost text */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-serif font-bold text-white/[0.015] leading-none"
          style={{
            fontSize: "clamp(80px, 14vw, 220px)",
            fontFamily: "var(--font-cormorant)",
            lineHeight: 0.85,
          }}
        >
          1779
        </span>
      </div>

      {/* ── Hero footer block ── */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">

        {/* Monogram */}
        <div ref={monogramRef} className="relative mb-8 opacity-0">
          {/* Outer ring */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="absolute -inset-5"
            style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
          >
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="#c9a84c"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="3 8"
              opacity="0.2"
            />
            <circle
              cx="60"
              cy="60"
              r="46"
              stroke="#c9a84c"
              strokeWidth="0.4"
              fill="none"
              opacity="0.1"
            />
          </svg>

          <span
            className="relative z-10 font-serif text-gold text-6xl font-bold"
            style={{
              fontFamily: "var(--font-cormorant)",
              textShadow: "0 0 40px rgba(201,168,76,0.25)",
              letterSpacing: "-0.03em",
            }}
          >
            SD
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-serif italic text-3xl md:text-5xl text-white/85 mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Strahlborn and De Rionzini
        </h2>

        <p
          className="text-xs tracking-[0.45em] uppercase text-gold/40 mb-10"
          style={{ letterSpacing: "0.4em" }}
        >
          An Archival Saga · Est. 1779
        </p>

        {/* Closing quote */}
        <div ref={quoteRef} className="opacity-0 max-w-xl mx-auto mb-14">
          <p
            className="font-serif italic text-lg md:text-xl text-white/40 leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &ldquo;Every family has a story it does not know how to tell.
            <br />
            This is ours.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-12 h-px bg-gold/20" />
            <span className="text-xs tracking-widest text-gold/30 font-serif italic">
              A. Fomicheva
            </span>
            <div className="w-12 h-px bg-gold/20" />
          </div>
        </div>

        {/* Email subscribe */}
        <div ref={emailRef} className="w-full max-w-md mx-auto mb-20 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4" style={{ letterSpacing: "0.3em" }}>
            Follow the Archive
          </p>
          <div
            className="flex items-center border border-gold/15 hover:border-gold/25 transition-colors duration-500"
            style={{ borderRadius: "1px" }}
          >
            <input
              type="email"
              placeholder="Your email address..."
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white/50 placeholder:text-white/20 outline-none font-serif"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
            />
            <button
              className="px-5 py-3.5 border-l border-gold/15 text-xs tracking-[0.3em] uppercase text-gold/50 hover:text-gold/80 hover:bg-gold/5 transition-all duration-400 font-serif whitespace-nowrap"
              style={{ letterSpacing: "0.3em" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Links + Social row ── */}
      <div
        className="relative border-t border-white/5"
        style={{ background: "rgba(2,4,8,0.6)" }}
      >
        <div
          ref={linksRef}
          className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-0"
        >
          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs tracking-[0.4em] uppercase text-gold/40 mb-6 font-serif"
                style={{ letterSpacing: "0.4em" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    
                   <a   href="#"
                      className="font-serif text-sm text-white/35 hover:text-white/70 transition-colors duration-400 block"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h4
              className="text-xs tracking-[0.4em] uppercase text-gold/40 mb-6 font-serif"
              style={{ letterSpacing: "0.4em" }}
            >
              Social
            </h4>
            <ul className="space-y-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  
                   <a href={social.href}
                    aria-label={social.label}
                    className="flex items-center gap-3 text-white/30 hover:text-gold/70 transition-colors duration-400 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span
                      className="font-serif text-sm"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
                    >
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        ref={bottomRef}
        className="relative border-t border-white/5 opacity-0"
        style={{ background: "rgba(2,4,8,0.8)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left — copyright */}
          <p
            className="text-xs tracking-[0.25em] uppercase text-white/20 font-serif"
            style={{ letterSpacing: "0.25em" }}
          >
            © Designed & Researched by Alexandra Fomicheva
          </p>

          {/* Center — ornament */}
          <div className="flex items-center gap-3 opacity-30">
            <div className="w-8 h-px bg-gold/40" />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3L4 0Z"
                fill="#c9a84c"
              />
            </svg>
            <div className="w-8 h-px bg-gold/40" />
          </div>

          {/* Right — contact line */}
          <p className="text-xs italic text-white/15 font-serif" style={{ fontFamily: "var(--font-cormorant)" }}>
            Contact me to build a proper digital estate for your own history.
          </p>
        </div>
      </div>
    </footer>
  );
}