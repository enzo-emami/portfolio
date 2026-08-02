export function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="mono" style={{ marginBottom: 10 }}>
              CONTACT
            </div>
            <div className="foot-big">
              Building hardware?
              <br />
              Let's talk.
            </div>
          </div>
          <div className="foot-contact">
            <a href="mailto:emamienzo@gmail.com">emamienzo@gmail.com</a>
            <a href="tel:9493176621">(949) 317-6621</a>
            <a href="https://www.linkedin.com/in/enzo-e-b515a1251" target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a href="assets/resume.pdf" target="_blank" rel="noopener">
              Resume ↗
            </a>
            <span style={{ color: "var(--text-muted)", fontSize: 15 }}>SF Bay Area, CA</span>
          </div>
        </div>
        <div className="foot-fine">
          <span className="mono">© 2026 Enzo Emami</span>
          <span className="mono">EN · FR · FA · ES · DE</span>
        </div>
      </div>
    </footer>
  );
}
