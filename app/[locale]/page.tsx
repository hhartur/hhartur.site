import { HeroSection } from "@/components/hero-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { SkillsSection } from "@/components/skills-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection />
      <CtaSection />
    </main>
  );
}
