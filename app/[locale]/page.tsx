import { Hero } from "@/components/hero";
import { ProjectIndex } from "@/components/project-index";
import { StackSection } from "@/components/stack-section";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectIndex />
      <StackSection />
      <CtaBand />
    </main>
  );
}
