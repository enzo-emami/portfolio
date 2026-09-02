import { ShaderAnimation } from "@/components/ui/shader-animation";

export function Hero() {
  return (
    <header id="top">
      <div className="hero-bg" aria-hidden="true">
        <ShaderAnimation />
      </div>
      <div className="field-fade" aria-hidden="true" />
      <div className="wrap hero-content">
        <div className="mono hero-eyebrow">
          <span className="status-dot" aria-hidden="true" />
          HARDWARE · PRODUCT · MECHANICAL DESIGN
        </div>
        <h1>Enzo Emami</h1>
        <p className="hero-sub">
          Hardware and product designer at <b>UC Berkeley</b> — from tested wearables and paid client
          hardware to competition robots and embedded R&amp;D systems.
        </p>
        <div className="hero-cta">
          <a className="btn btn-resume-lg" href="assets/resume.pdf" target="_blank" rel="noopener">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Open resume
          </a>
          <a className="btn btn-ghost" href="#work">
            View my work ↓
          </a>
        </div>
        <div className="hero-context">
          $11K AMD ENGAGEMENT · 7 PRESSURE ANGLES TESTED · 7+ ROBOTS · TOP-4 AT FIRST WORLDS
        </div>
      </div>
    </header>
  );
}
