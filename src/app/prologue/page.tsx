import Navbar from "@/components/navbar";
import PrologueSection from "@/components/prologuesection";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";

export default function ProloguePage() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <div className="pt-24">
        <PrologueSection />
      </div>
      <ParticleStars />
    </main>
  );
}