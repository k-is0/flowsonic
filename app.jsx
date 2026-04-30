/* global React, Device, Counter, Reveal, WaveViz */

const NAV_SECTIONS = [
  { id: "challenge", label: "01 / Challenge" },
  { id: "tech", label: "02 / Technology" },
  { id: "benefits", label: "03 / Benefits" },
  { id: "specs", label: "04 / Specs" },
  { id: "team", label: "05 / Team" },
  { id: "contact", label: "06 / Contact" },
];

const App = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = ["hero", "challenge", "tech", "benefits", "specs", "team", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Determine if nav is on-dark based on which section is in view
  const darkSections = ["hero", "tech", "specs", "contact"];
  const onDark = darkSections.includes(activeSection);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ---------- NAV ---------- */}
      <nav className={`nav ${scrolled ? "scrolled" : ""} ${onDark ? "on-dark" : ""}`}>
        <a href="#hero" className="logo">
          <span className="logo-mark"></span>
          <span>Flowsonic</span>
        </a>
        <ul className="nav-links">
          <li><a href="#challenge">Challenge</a></li>
          <li><a href="#tech">Technology</a></li>
          <li><a href="#benefits">Benefits</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <a href="#contact" className={`btn ${onDark ? "btn-blue" : ""}`}>
          Request a call
          <span className="btn-arrow">→</span>
        </a>
      </nav>

      {/* Side rail */}
      <div className={`side-rail ${onDark ? "on-dark" : ""}`}>
        {NAV_SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} className={`rail-item ${activeSection === s.id ? "active" : ""}`}>
            <span className="rail-dot"></span>
            <span>{s.label}</span>
          </a>
        ))}
      </div>

      {/* ---------- HERO ---------- */}
      <section id="hero" className="hero">
        <div className="hero-bg">
          <div className="hero-placeholder"></div>
        </div>

        <div className="hero-corners">
          <span className="corner corner-tl"></span>
          <span className="corner corner-tr"></span>
          <span className="corner corner-bl"></span>
          <span className="corner corner-br"></span>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            FLW-01 / FILTRATION UNIT
            <strong>Mk. 02 — 2026</strong>
          </div>
          <div className="hero-stat">
            ACTIVE BAND
            <strong>1 — 5 mm</strong>
          </div>
        </div>

        <div className="hero-device">
          <Device stroke="rgba(245, 242, 237, 0.85)" glow={true} />
        </div>

        <div className="hero-content">
          <h1 className="hero-headline">
            Catch what<br/>
            filters <span className="italic">miss.</span>
          </h1>
          <div className="hero-meta">
            <p>
              An ultrasonic interception system for industrial water — built for the 1–5&nbsp;mm microplastics today's screens let through.
            </p>
            <a href="#tech" className="btn btn-ghost">
              How it works
              <span className="btn-arrow">↓</span>
            </a>
          </div>
        </div>

        <div className="scroll-cue">Scroll</div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Unseen <span className="marquee-dot">●</span> Unnatural <span className="marquee-dot">●</span> Uncaptured <span className="marquee-dot">●</span> Until&nbsp;now <span className="marquee-dot">●</span> </span>
          <span>Unseen <span className="marquee-dot">●</span> Unnatural <span className="marquee-dot">●</span> Uncaptured <span className="marquee-dot">●</span> Until&nbsp;now <span className="marquee-dot">●</span> </span>
        </div>
      </div>

      {/* ---------- CHALLENGE ---------- */}
      <section id="challenge" className="challenge section-pad">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num"><strong>01 —</strong> The Challenge</div>
            </div>
            <h2 className="section-title">
              The threat is already <span className="italic">in your water.</span>
            </h2>
          </Reveal>

          <div className="challenge-grid">
            <Reveal className="challenge-lede">
              Every day, fragments of plastic slip into industrial water systems — from textile lines, recycling streams, laundry loops, and reused irrigation. The hardest range to capture is also the most common: <span className="blue">1–5 millimeters.</span>
            </Reveal>
            <Reveal className="challenge-body" delay={120}>
              <p>Particles in this band are too small to be screened, too large to settle, and too persistent to ignore. They migrate through pipework, accumulate in storage, and degrade reuse loops over time. Conventional fine filters block under real-world loads. Membranes demand pressure budgets nobody wants to pay for.</p>
              <p>What started as a fringe environmental concern is now an operational headache — one that shows up in maintenance schedules, compliance reports, and customer audits.</p>
            </Reveal>
          </div>

          <div className="problems">
            <Reveal className="problem">
              <div className="problem-num">P / 01</div>
              <h3>Microplastics slipping through filters</h3>
              <p>Conventional screens and WWTPs struggle in the 1–5&nbsp;mm range, leaving operators with persistent discharge risk.</p>
            </Reveal>
            <Reveal className="problem" delay={120}>
              <div className="problem-num">P / 02</div>
              <h3>Unreliable reuse quality</h3>
              <p>Microplastics degrade recycled water loops, undermining process stability and compliance confidence.</p>
            </Reveal>
            <Reveal className="problem" delay={240}>
              <div className="problem-num">P / 03</div>
              <h3>Clogging and downtime</h3>
              <p>Fine meshes block fast under real-world loads — driving up maintenance, labor, and unplanned downtime.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- TECH ---------- */}
      <section id="tech" className="tech section-pad">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num"><strong>02 —</strong> The Technology</div>
            </div>
            <h2 className="section-title">
              Standing waves.<br/><span className="italic">No moving parts.</span>
            </h2>
          </Reveal>

          <Reveal>
            <WaveViz />
          </Reveal>

          <div className="tech-stages">
            <Reveal className="stage active">
              <div className="stage-num">STAGE 01</div>
              <h4>Inlet</h4>
              <p>Untreated flow enters the active zone — particles suspended at random across the cross-section.</p>
            </Reveal>
            <Reveal className="stage" delay={100}>
              <div className="stage-num">STAGE 02</div>
              <h4>Standing wave</h4>
              <p>Piezo arrays generate a pressure field. No filters, no membranes, no contact with the medium.</p>
            </Reveal>
            <Reveal className="stage" delay={200}>
              <div className="stage-num">STAGE 03</div>
              <h4>Acoustic focus</h4>
              <p>Radiation force pushes particles toward pressure nodes, concentrating them into a narrow centerline stream.</p>
            </Reveal>
            <Reveal className="stage" delay={300}>
              <div className="stage-num">STAGE 04</div>
              <h4>Capture</h4>
              <p>A downstream probe siphons the focused stream while bulk flow continues clean and uninterrupted.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section id="benefits" className="benefits section-pad">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num"><strong>03 —</strong> Benefits</div>
            </div>
            <h2 className="section-title">
              Less maintenance.<br/>More <span className="italic">confidence.</span>
            </h2>
          </Reveal>

          <div className="benefit-grid">
            <Reveal className="benefit">
              <div className="benefit-num">i.</div>
              <div>
                <h3>Capture what others miss</h3>
                <p>Engineered specifically for the 1–5&nbsp;mm band where conventional screens, WWTPs, and fine filters fall short. Targeted interception, not brute-force filtration.</p>
              </div>
            </Reveal>
            <Reveal className="benefit" delay={120}>
              <div className="benefit-num">ii.</div>
              <div>
                <h3>Up to 50% less maintenance</h3>
                <p>By avoiding ultra-fine meshes, the system reduces clogging cycles and cleaning frequency — slashing labor and unplanned downtime in high-load applications.</p>
              </div>
            </Reveal>
            <Reveal className="benefit" delay={240}>
              <div className="benefit-num">iii.</div>
              <div>
                <h3>Energy-efficient by design</h3>
                <p>Ultrasonic interception works without high-pressure pumps or membranes — significantly less energy per cubic meter than fine filtration alternatives.</p>
              </div>
            </Reveal>
            <Reveal className="benefit" delay={360}>
              <div className="benefit-num">iv.</div>
              <div>
                <h3>Auditable performance</h3>
                <p>Before-and-after removal data supports permits and water-reuse programs with clear, defensible metrics for regulators and customers.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SPECS ---------- */}
      <section id="specs" className="specs section-pad">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num"><strong>04 —</strong> Specifications</div>
            </div>
            <h2 className="section-title">
              Built for the floor,<br/>not the <span className="italic">bench.</span>
            </h2>
          </Reveal>

          <div className="specs-layout">
            <Reveal>
              <div className="specs-device">
                <div className="specs-device-corner">FLW-01 / Mk. 02</div>
                <div style={{position:"absolute",inset:"0", display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Device stroke="rgba(245, 242, 237, 0.7)" glow={false} />
                </div>
                <div className="specs-device-label">[ Product render — replace with photography ]</div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="specs-list">
                <div className="spec-row">
                  <div className="spec-key">Target band</div>
                  <div className="spec-val"><span className="num">1 – 5</span></div>
                  <div className="spec-unit">mm</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Throughput</div>
                  <div className="spec-val"><span className="num">120</span></div>
                  <div className="spec-unit">m³ / hr</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Frequency</div>
                  <div className="spec-val"><span className="num">1.6</span></div>
                  <div className="spec-unit">MHz</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Pressure drop</div>
                  <div className="spec-val">&lt; <span className="num">0.4</span></div>
                  <div className="spec-unit">bar</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Footprint</div>
                  <div className="spec-val"><span className="num">1.4 × 0.8</span></div>
                  <div className="spec-unit">m</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Power draw</div>
                  <div className="spec-val"><span className="num">2.1</span></div>
                  <div className="spec-unit">kW</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="counters">
            <Reveal className="counter">
              <div className="counter-num">
                <Counter to={92} suffix="" decimals={0}/>
                <span className="unit">%</span>
              </div>
              <div className="counter-label">Capture in target band</div>
            </Reveal>
            <Reveal className="counter" delay={120}>
              <div className="counter-num">
                −<Counter to={50} suffix="" decimals={0}/>
                <span className="unit">%</span>
              </div>
              <div className="counter-label">Maintenance burden</div>
            </Reveal>
            <Reveal className="counter" delay={240}>
              <div className="counter-num">
                <Counter to={1.6} suffix="" decimals={1}/>
                <span className="unit">MHz</span>
              </div>
              <div className="counter-label">Operating frequency</div>
            </Reveal>
            <Reveal className="counter" delay={360}>
              <div className="counter-num">
                <Counter to={120} suffix="" decimals={0}/>
                <span className="unit">m³/h</span>
              </div>
              <div className="counter-label">Continuous throughput</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section id="team" className="team section-pad">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num"><strong>05 —</strong> The Team</div>
            </div>
            <h2 className="section-title">
              Engineers, founders,<br/><span className="italic">operators.</span>
            </h2>
          </Reveal>

          <div className="team-grid">
            {[
              { initials: "EH", name: "Emil Huseynli", role: "Petroleum Engineer · Former CEO at Agroficient", tag: "FOUNDER" },
              { initials: "RK", name: "Rita Khoury", role: "Environmental & Chemical Engineer", tag: "ENG" },
              { initials: "KH", name: "Kevin Huang", role: "Design Engineer", tag: "ENG" },
              { initials: "YZ", name: "Yihang Zhang", role: "Architect", tag: "DESIGN" },
            ].map((m, i) => (
              <Reveal key={m.initials} className="member" delay={i * 100}>
                <div className="member-photo" data-initials={m.initials}>
                  <span className="member-tag">{m.tag}</span>
                </div>
                <h4>{m.name}</h4>
                <div className="member-role">{m.role}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SUSTAINABILITY ---------- */}
      <section className="sustain">
        <div className="container">
          <Reveal className="sustain-row">
            <h3>We're <span className="italic">responsible.</span><br/>You can be too.</h3>
            <div className="sdg-grid">
              <div className="sdg sdg-6">
                <div className="sdg-num">06</div>
                <div className="sdg-label">Clean Water<br/>& Sanitation</div>
              </div>
              <div className="sdg sdg-9">
                <div className="sdg-num">09</div>
                <div className="sdg-label">Industry<br/>& Innovation</div>
              </div>
              <div className="sdg sdg-12">
                <div className="sdg-num">12</div>
                <div className="sdg-label">Responsible<br/>Consumption</div>
              </div>
              <div className="sdg sdg-13">
                <div className="sdg-num">13</div>
                <div className="sdg-label">Climate<br/>Action</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SUPPORTED ---------- */}
      <section className="supported">
        <div className="container">
          <div className="supported-row">
            <div className="supported-label">Supported by</div>
            <div className="supported-logos">
              <div className="logo-imperial">Imperial College London</div>
            </div>
            <div className="supported-label">Est. 2026 · London, UK</div>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <div className="eyebrow eyebrow-dot" style={{color:"rgba(245,242,237,0.7)", marginBottom:24}}>Be an early adopter</div>
              <h2>
                Let's <span className="italic">get to work.</span>
              </h2>
              <p className="lede">
                Pilot programs are now opening for industrial water operators, sustainability teams, and reuse-system integrators. Reach out and we'll set up a 30-minute call.
              </p>
              <div className="contact-meta">
                <div className="contact-meta-item">
                  <span className="contact-meta-key">Email</span>
                  <a href="mailto:info@flowsonicfiltration.co.uk">info@flowsonicfiltration.co.uk</a>
                </div>
                <div className="contact-meta-item">
                  <span className="contact-meta-key">Calendly</span>
                  <a href="https://calendly.com/ritalkhoury7/30min" target="_blank" rel="noreferrer">30-min intro call ↗</a>
                </div>
                <div className="contact-meta-item">
                  <span className="contact-meta-key">Based</span>
                  <span>Imperial College, South Kensington — London</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              {submitted ? (
                <div className="form-success">
                  Thanks — we'll be in touch within 48 hours.<br/>
                  <span style={{color:"rgba(245,242,237,0.6)", fontStyle:"normal", fontSize:14, fontFamily:"var(--mono)", letterSpacing:"0.14em", textTransform:"uppercase"}}>↳ Check your inbox.</span>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label htmlFor="email">Email *</label>
                    <input id="email" type="email" required placeholder="you@company.com"/>
                  </div>
                  <div className="form-row">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" placeholder="Where you work"/>
                  </div>
                  <div className="form-row">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" required placeholder="Tell us about your water system"></textarea>
                  </div>
                  <button type="submit" className="form-submit">
                    Send message
                    <span>→</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="foot">
        <div className="container">
          <div className="foot-mark">Flowsonic<span style={{color:"#1E5BFF"}}>.</span></div>
          <div className="foot-row">
            <div>© 2026 Flowsonic Filtration Ltd</div>
            <div>FLW-01 · Mk. 02</div>
            <div>London / UK</div>
          </div>
        </div>
      </footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
