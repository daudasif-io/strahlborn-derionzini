"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Prologue", href: "/prologue", hasDropdown: true },
  { label: "Author", href: "/author", hasDropdown: true },
  { label: "Chapters", href: "/chapters", hasDropdown: true },
  { label: "Tree Template", href: "/tree-template", hasDropdown: false },
  { label: "Guest Publications", href: "/publications", hasDropdown: true },
];

export default function Navbar() {
  const [emailValue, setEmailValue] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background: isHome
          ? "linear-gradient(to bottom, rgba(13,17,23,0.7) 0%, transparent 100%)"
          : "rgba(8, 12, 20, 0.95)",
        backdropFilter: isHome ? "none" : "blur(10px)",
        borderBottom: isHome ? "none" : "1px solid rgba(201,168,76,0.08)",
      }}
    >
      {/* Logo — clicking goes home */}
      <Link href="/" className="flex items-center gap-2 border-b border-gold/40 pb-1">
        <input
          type="email"
          placeholder="Your email..."
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className="bg-transparent text-sm font-serif text-gold/70 placeholder:text-gold/40 outline-none w-36 tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 4c-2 2-4 4-6 12L9 11c8-2 10-4 11-7z" />
          <path d="M9 11L4 20" />
          <path d="M11 13l-1.5 4" />
        </svg>
      </Link>

      {/* Center nav links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-sm tracking-widest font-medium transition-colors duration-300"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "15px",
                color: isActive ? "#c9a84c" : "rgba(255,255,255,0.8)",
              }}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown size={12} className="text-gold/60" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right: glasses + vertical line */}
      <div className="flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(201,168,76,0.7)"
          strokeWidth="1.5"
        >
          <circle cx="6" cy="14" r="4" />
          <circle cx="18" cy="14" r="4" />
          <path d="M2 14h0M22 14h0M10 14h4" />
          <path d="M6 10V8M18 10V8" />
        </svg>
        <div className="w-px h-8 bg-gold/30" />
      </div>
    </motion.nav>
  );
}