import type { Project } from "@/data/projects";
import { Card } from "@/components/Card";

export function CommunityGrid({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  return (
    <div className="grid grid-2" id="communityGrid" style={{ marginTop: 26 }}>
      {projects.map((p) => (
        <Card key={p.id} project={p} hidden={false} onOpen={onOpen} />
      ))}
    </div>
  );
}
