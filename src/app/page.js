import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";
import HeroSection from "./components/HeroSection";
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
      <main className="bg-[#0a0a0a]">
        <HeroSection />
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
