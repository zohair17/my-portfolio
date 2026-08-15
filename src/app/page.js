import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PhilosophySection from "./components/PhilosophySection";
import SkillsSection from "./components/SkillsSection";
import FeaturedProjects from "./components/FeaturedProjects";
import ProductionProjects from "./components/ProductionProjects";
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
      <main className="relative z-10 bg-transparent">
        <HeroSection />
        <AboutSection />
        {/* Work comes straight after the intro — a visitor who has just read
            who I am should hit the projects next, not three more preamble
            sections. */}
        <FeaturedProjects />
        <PhilosophySection />
        <SkillsSection />
        {/* <ProductionProjects /> */}
        <BehindScenes />
        <ProcessSection />
        <Testimonials />
        <NumbersSection />
        <TechPlayground />
        {/* <Footer /> */}
      </main>
    </SmoothScroll>
  );
}
