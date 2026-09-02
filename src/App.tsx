import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CommunityGrid } from "@/components/CommunityGrid";
import { Modal } from "@/components/Modal";
import { Footer } from "@/components/Footer";
import { projects, community } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <Nav />
      <Hero />

      <section id="work">
        <div className="wrap">
          <div className="section-head">
            <h2>Selected Hardware</h2>
            <p className="section-note">
              Hover a card for the short version — click for the full story, CAD, and links.
            </p>
          </div>
          <ProjectGrid projects={projects} onOpen={setActiveProject} />
        </div>
      </section>

      <section id="community" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Products &amp; Ventures</h2>
            <p className="section-note">Founder and leadership work, kept separate from the hardware portfolio.</p>
          </div>
          <CommunityGrid projects={community} onOpen={setActiveProject} />
        </div>
      </section>

      <Footer />

      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
