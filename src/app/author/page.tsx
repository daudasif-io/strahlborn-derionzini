import Navbar from "@/components/navbar";
import AuthorSection from "@/components/authorsection";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";

export default function AuthorPage() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <div className="pt-24">
        <AuthorSection />
      </div>
      <ParticleStars />
    </main>
  );
}