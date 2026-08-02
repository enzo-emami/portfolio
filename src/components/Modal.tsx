import { useEffect } from "react";
import type { Project } from "@/data/projects";

export function Modal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const open = project !== null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const src = project ? project.modalImg || project.img : null;

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="modal-wrap">
          <button className="modal-close" onClick={onClose}>
            ESC / CLOSE
          </button>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            {src ? (
              <div className="modal-img" style={{ backgroundImage: `url('${src}')` }} />
            ) : (
              <div className="modal-img placeholder">
                <span>Media — to be supplied</span>
              </div>
            )}
            <div className="modal-body">
              <h3 id="modalTitle">{project.title}</h3>
              <div className="modal-meta">{project.meta || project.year}</div>
              <div>
                {project.text.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
                {project.video && (
                  <div className="modal-video">
                    <iframe
                      src={project.video}
                      title={`${project.title} — video`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                )}
              </div>
              <div className="modal-links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
