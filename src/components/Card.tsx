import type { Project } from "@/data/projects";

export function Card({
  project,
  hidden,
  onOpen,
}: {
  project: Project;
  hidden: boolean;
  onOpen: (project: Project) => void;
}) {
  const open = () => onOpen(project);

  return (
    <article
      className={`card${hidden ? " hidden" : ""}`}
      data-cats={project.cats.join(" ")}
      tabIndex={0}
      role="button"
      aria-label={`${project.title} — open details`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      {project.img ? (
        <div className="card-img" style={{ backgroundImage: `url('${project.img}')` }} />
      ) : (
        <div className="card-img placeholder">
          <span>Media — to be supplied</span>
        </div>
      )}
      <div className="card-base">
        <span className="card-title">{project.title}</span>
        <span className="card-year">{project.year}</span>
      </div>
      <div className="card-overlay">
        <span className="card-title">{project.title}</span>
        <p>{project.blurb}</p>
        <div className="card-tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <span className="card-hint">CLICK FOR DETAILS →</span>
      </div>
    </article>
  );
}
