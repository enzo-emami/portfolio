import { useEffect, useState } from "react";

const SECTIONS = ["work", "community", "contact"];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-name" href="#top">
          Enzo Emami
        </a>
        <div className="nav-links">
          {SECTIONS.map((id) => (
            <a
              key={id}
              className={`nav-link${active === id ? " active" : ""}`}
              href={`#${id}`}
              data-spy={id}
            >
              {id === "work" ? "Work" : id === "community" ? "Ventures" : "Contact"}
            </a>
          ))}
          <a className="nav-resume" href="assets/resume.pdf" target="_blank" rel="noopener">
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
