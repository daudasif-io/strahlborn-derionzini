import Navbar from "@/components/navbar";
import ChaptersSection from "@/components/chapterssection";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";

export default function ChaptersPage() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <div className="pt-24">
        <ChaptersSection />
      </div>
      <ParticleStars />
    </main>
  );
}