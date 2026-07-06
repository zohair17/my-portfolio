import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";
import AuroraBackground from "./components/AuroraBackground";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PhilosophySection from "./components/PhilosophySection";
import SkillsSection from "./components/SkillsSection";
import FeaturedProjects from "./components/FeaturedProjects";
import BehindScenes from "./components/BehindScenes";
import ProcessSection from "./components/ProcessSection";
import Testimonials from "./components/Testimonials";
import NumbersSection from "./components/NumbersSection";
import TechPlayground from "./components/TechPlayground";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <main className="relative bg-[#070707]">
        {/* Colourful flowing aurora — a fixed backdrop behind every section
            from About down to the Footer. The hero sits opaque on top and hides
            it, so the wave only appears once you scroll past the hero. */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <AuroraBackground className="absolute inset-0 h-full w-full opacity-70 [filter:blur(30px)]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <HeroSection />
        <AboutSection />
        <PhilosophySection />
        <SkillsSection />
        <FeaturedProjects />
        <BehindScenes />
        <ProcessSection />
        <Testimonials />
        <NumbersSection />
        <TechPlayground />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
