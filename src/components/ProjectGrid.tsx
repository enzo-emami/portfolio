import { useState } from "react";
import type { Project } from "@/data/projects";
import { Card } from "@/components/Card";

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "robots", label: "Robots" },
  { key: "cad", label: "CAD & Surfacing" },
  { key: "aero", label: "Aero" },
];

export function ProjectGrid({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter${filter === f.key ? " active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid" id="projectGrid">
        {projects.map((p) => (
          <Card
            key={p.id}
            project={p}
            hidden={filter !== "all" && !p.cats.includes(filter)}
            onOpen={onOpen}
          />
        ))}
      </div>
    </>
  );
}
