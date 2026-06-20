import Navbar from "@/components/navbar";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";

export default function PublicationsPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <CustomCursor />
      <Navbar />
      <ParticleStars />
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32">
        <span className="text-xs tracking-[0.5em] uppercase text-gold/50 mb-4">
          Community Voices
        </span>
        <h1
          className="font-serif italic text-5xl md:text-7xl text-white/90 mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Guest Publications
        </h1>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-20 h-px bg-gold/20" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="5" y="0" width="7" height="7" transform="rotate(45 5 5)" fill="#c9a84c" fillOpacity="0.4" />
          </svg>
          <div className="w-20 h-px bg-gold/20" />
        </div>
        <p
          className="font-serif italic text-lg text-white/40 max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Contributions from researchers, historians and descendants who have
          connected with the Strahlborn and De Rionzini archive.
        </p>
        <p className="mt-6 text-xs tracking-widest text-gold/30 uppercase">
          Submissions Opening Soon
        </p>
      </div>
    </main>
  );
}