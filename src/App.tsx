import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Modal } from "@/components/Modal";
import { Footer } from "@/components/Footer";
import { projects, community } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const allProjects = [...projects, ...community];

  return (
    <>
      <Nav />
      <Hero />

      <section id="work">
        <div className="wrap">
          <div className="section-head">
            <h2>Projects / Products</h2>
            <p className="section-note">
              Hover a card for the short version — click for the full story, CAD, and links.
            </p>
          </div>
          <ProjectGrid projects={allProjects} onOpen={setActiveProject} />
        </div>
      </section>

      <Footer />

      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
