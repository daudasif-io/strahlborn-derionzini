import Navbar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import SocialSidebar from "@/components/socialsidebar";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";
import ThunderEffect from "@/components/thundereffect";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <SocialSidebar />
      <Navbar />
      <HeroSection />
      <ParticleStars />
      <ThunderEffect />
    </main>
  );
}