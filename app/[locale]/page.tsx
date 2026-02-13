import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}
