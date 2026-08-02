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
          ROBOTICS · CAD · MANUFACTURING · BAY AREA
        </div>
        <h1>Enzo Emami</h1>
        <p className="hero-sub">
          <b>UC Berkeley College of Engineering</b> student building robots, UAVs, wearables, and
          manufactured hardware — and organizing BattleBots-style competitions in my free time.
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
          UC Berkeley College of Engineering · Robotics · CAD · Manufacturing · Community competition
          organizing
        </div>
      </div>
    </header>
  );
}
