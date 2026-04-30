/* global React, HeroDeviceShot */

const Reveal = ({ children, className = "", delay = 0, as: As = "div" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => ref.current && ref.current.classList.add("in"), delay);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <As ref={ref} className={`d-reveal ${className}`}>{children}</As>;
};

const Counter = ({ to, decimals = 0, suffix = "" }) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const triggered = React.useRef(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 1800);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
};

// Animated tech viz — particles focusing into nodes
const TechViz = () => {
  const particles = React.useMemo(() =>
    Array.from({length: 70}, (_, i) => ({
      id: i,
      delay: (i * 0.13) % 5,
      yStart: ((i * 41) % 200) - 100,
      size: 1.5 + ((i * 7) % 4) / 2,
    })), []
  );

  return (
    <div className="dtech-viz-frame">
      <svg viewBox="0 0 1400 480" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        {/* Pipe walls */}
        <rect x="0" y="120" width="1400" height="240" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <line x1="0" y1="240" x2="1400" y2="240" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8"/>

        {/* Transducer arrays top/bottom */}
        {[400, 600, 800, 1000].map(x => (
          <g key={x}>
            <rect x={x-32} y="60" width="64" height="60" fill="rgba(74,156,255,0.08)" stroke="rgba(74,156,255,0.4)" strokeWidth="1" rx="4"/>
            <rect x={x-32} y="360" width="64" height="60" fill="rgba(74,156,255,0.08)" stroke="rgba(74,156,255,0.4)" strokeWidth="1" rx="4"/>
            <line x1={x} y1="120" x2={x} y2="360" stroke="#4A9CFF" strokeWidth="0.8" opacity="0.3"/>
          </g>
        ))}

        {/* Standing wave pattern (animated) */}
        <g stroke="#4A9CFF" fill="none" opacity="0.55">
          {[0,1,2].map(i => (
            <path key={i} strokeWidth={1.4 - i*0.3} opacity={0.7 - i*0.18}
              d={`M 350 ${240+i*5} Q 400 ${210+i*5}, 450 ${240+i*5} T 550 ${240+i*5} T 650 ${240+i*5} T 750 ${240+i*5} T 850 ${240+i*5} T 950 ${240+i*5} T 1050 ${240+i*5}`}>
              <animate attributeName="d"
                values={`M 350 ${240+i*5} Q 400 ${210+i*5}, 450 ${240+i*5} T 550 ${240+i*5} T 650 ${240+i*5} T 750 ${240+i*5} T 850 ${240+i*5} T 950 ${240+i*5} T 1050 ${240+i*5};
                        M 350 ${240+i*5} Q 400 ${270+i*5}, 450 ${240+i*5} T 550 ${240+i*5} T 650 ${240+i*5} T 750 ${240+i*5} T 850 ${240+i*5} T 950 ${240+i*5} T 1050 ${240+i*5};
                        M 350 ${240+i*5} Q 400 ${210+i*5}, 450 ${240+i*5} T 550 ${240+i*5} T 650 ${240+i*5} T 750 ${240+i*5} T 850 ${240+i*5} T 950 ${240+i*5} T 1050 ${240+i*5}`}
                dur="3.5s" repeatCount="indefinite"/>
            </path>
          ))}
        </g>

        {/* Particles - converge to centerline as they pass through */}
        {particles.map(p => (
          <circle key={p.id} r={p.size} fill="rgba(255,255,255,0.85)">
            <animate attributeName="cx" from={-20} to={1420} dur={`${5 + (p.id % 3)}s`} begin={`${p.delay}s`} repeatCount="indefinite"/>
            <animate attributeName="cy"
              values={`${240 + p.yStart}; ${240 + p.yStart * 0.95}; ${240 + p.yStart * 0.4}; ${240}; ${240}; ${240 + p.yStart * 0.4}; ${240 + p.yStart * 0.95}; ${240 + p.yStart}`}
              keyTimes="0; 0.18; 0.32; 0.45; 0.6; 0.74; 0.88; 1"
              dur={`${5 + (p.id % 3)}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"/>
            <animate attributeName="fill"
              values="rgba(255,255,255,0.85); rgba(255,255,255,0.85); #4A9CFF; #4A9CFF; #4A9CFF; rgba(255,255,255,0.85)"
              keyTimes="0; 0.32; 0.45; 0.6; 0.74; 1"
              dur={`${5 + (p.id % 3)}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Section labels */}
        <text x="40" y="40" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.5)" letterSpacing="1.4">FLOW →</text>
        <text x="1280" y="40" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(74,156,255,0.7)" letterSpacing="1.4">FOCUSED</text>
        <text x="40" y="460" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.5)" letterSpacing="1.4">FIG. 02 / ULTRASONIC FOCUSING — 1.6 MHZ</text>
      </svg>
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [section, setSection] = React.useState("hero");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = ["hero", "challenge", "tech", "feat-1", "feat-2", "specs", "team", "cta"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setSection(e.target.id);
      });
    }, { rootMargin: "-50% 0px -45% 0px" });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const darkSections = ["hero", "tech", "feat-2", "specs", "cta"];
  const onDark = darkSections.includes(section);

  return (
    <>
      {/* NAV */}
      <nav className={`dnav ${scrolled ? "scrolled" : ""} ${onDark ? "dark" : ""}`}>
        <div className="dnav-inner">
          <a href="#hero" className="dnav-logo">
            <span className="dnav-mark"></span>
            Flowsonic
          </a>
          <ul className="dnav-links">
            <li><a href="#challenge">Challenge</a></li>
            <li><a href="#tech">Technology</a></li>
            <li><a href="#feat-1">Benefits</a></li>
            <li><a href="#specs">Specs</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
          <a href="#cta" className="dnav-cta">Request a call</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="dhero">
        <div className="dhero-cap">
          <span className="eyebrow-d">Introducing FLW-01 · Mk. 02</span>
        </div>
        <h1 className="dhero-headline">Catch what filters <em>miss.</em></h1>
        <p className="dhero-sub">
          An ultrasonic interception system, engineered for the 1–5&nbsp;mm microplastics today's industrial water filters let through.
        </p>
        <div className="dhero-cta-row">
          <a href="#cta" className="btn-d btn-d-primary">Request a call →</a>
          <a href="#tech" className="btn-d btn-d-ghost">Watch how it works</a>
        </div>

        <div className="dhero-stage">
          <div className="dhero-product-spotlight"></div>
          <div className="dhero-product">
            <HeroDeviceShot />
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="dstats">
        <div className="dc">
          <div className="dstats-grid">
            <Reveal className="dstat">
              <div className="dstat-num"><Counter to={92}/><span className="unit">%</span></div>
              <div className="dstat-label">Capture in target band</div>
            </Reveal>
            <Reveal className="dstat" delay={100}>
              <div className="dstat-num">−<Counter to={50}/><span className="unit">%</span></div>
              <div className="dstat-label">Maintenance burden</div>
            </Reveal>
            <Reveal className="dstat" delay={200}>
              <div className="dstat-num"><Counter to={120}/><span className="unit">m³/h</span></div>
              <div className="dstat-label">Continuous throughput</div>
            </Reveal>
            <Reveal className="dstat" delay={300}>
              <div className="dstat-num"><Counter to={1.6} decimals={1}/><span className="unit">MHz</span></div>
              <div className="dstat-label">Operating frequency</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" className="dchallenge dsec">
        <div className="dc">
          <Reveal className="dchallenge-head">
            <span className="eyebrow-d">The Challenge</span>
            <h2>The threat is already <em>in your water.</em></h2>
            <p>
              Particles in the 1–5&nbsp;mm range slip through conventional screens and clog fine filters. They migrate through pipework, accumulate in storage, and quietly degrade reuse loops over months.
            </p>
          </Reveal>

          <div className="dproblems">
            <Reveal className="dproblem">
              <div className="dproblem-img">
                <span className="dproblem-img-label">DETAIL · MICROPLASTIC FRAGMENT</span>
              </div>
              <div className="dproblem-num">01</div>
              <h3>Slipping through filters</h3>
              <p>Conventional screens and WWTPs struggle in the 1–5&nbsp;mm range, leaving operators with persistent discharge risk.</p>
            </Reveal>
            <Reveal className="dproblem" delay={120}>
              <div className="dproblem-img">
                <span className="dproblem-img-label">DETAIL · REUSE LOOP</span>
              </div>
              <div className="dproblem-num">02</div>
              <h3>Unreliable reuse quality</h3>
              <p>Microplastics degrade recycled water loops, undermining process stability and compliance confidence.</p>
            </Reveal>
            <Reveal className="dproblem" delay={240}>
              <div className="dproblem-img">
                <span className="dproblem-img-label">DETAIL · CLOGGED MESH</span>
              </div>
              <div className="dproblem-num">03</div>
              <h3>Clogging and downtime</h3>
              <p>Fine meshes block fast under real-world loads — driving up maintenance, labor, and unplanned downtime.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="dtech dsec">
        <div className="dc">
          <Reveal className="dtech-head">
            <span className="eyebrow-d">The Technology</span>
            <h2>Standing waves. <em>No moving parts.</em></h2>
            <p>
              Piezo arrays generate a precise pressure field. Acoustic radiation force pushes microplastics into focus nodes — concentrating them into a narrow capture stream while bulk flow passes clean.
            </p>
          </Reveal>
        </div>

        <div className="dtech-viz-wrap">
          <Reveal>
            <TechViz />
          </Reveal>
        </div>

        <div className="dtech-stages">
          <Reveal className="dstage">
            <div className="dstage-num">STAGE 01</div>
            <h4>Inlet</h4>
            <p>Untreated flow enters the active zone with particles suspended at random across the cross-section.</p>
          </Reveal>
          <Reveal className="dstage" delay={100}>
            <div className="dstage-num">STAGE 02</div>
            <h4>Standing wave</h4>
            <p>Piezo arrays generate a pressure field. No filters, no membranes, no contact with the medium.</p>
          </Reveal>
          <Reveal className="dstage" delay={200}>
            <div className="dstage-num">STAGE 03</div>
            <h4>Acoustic focus</h4>
            <p>Radiation force concentrates particles into a narrow centerline stream toward the pressure nodes.</p>
          </Reveal>
          <Reveal className="dstage" delay={300}>
            <div className="dstage-num">STAGE 04</div>
            <h4>Capture</h4>
            <p>A downstream probe siphons the focused stream while bulk flow continues clean and uninterrupted.</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURE ROW 1 — light */}
      <section id="feat-1" className="dfeature alt">
        <div className="dc">
          <Reveal className="dfeature-row">
            <div className="dfeature-content">
              <span className="eyebrow-d">Designed for the floor</span>
              <h2>Up to <em>50% less</em> maintenance.</h2>
              <p>
                By avoiding ultra-fine meshes, the system reduces clogging cycles and cleaning frequency — slashing labor and unplanned downtime in high-load applications.
              </p>
              <ul className="dfeature-bullets">
                <li>No replaceable mesh elements</li>
                <li>Self-clearing pressure-node design</li>
                <li>Engineered for continuous 24/7 operation</li>
              </ul>
            </div>
            <div className="dfeature-img">
              <div className="dfeature-img-stripe"></div>
              <div style={{textAlign:"center",position:"relative",zIndex:1}}>
                <div style={{fontSize:80,fontWeight:700,letterSpacing:"-0.04em",color:"#0066FF",lineHeight:1}}>−50%</div>
                <div style={{fontSize:14,color:"#86868B",marginTop:8,fontWeight:500}}>vs. fine-mesh filtration</div>
              </div>
              <span className="dfeature-img-label">REPLACE WITH MAINTENANCE COMPARISON</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURE ROW 2 — dark */}
      <section id="feat-2" className="dfeature dark">
        <div className="dc">
          <Reveal className="dfeature-row flip">
            <div className="dfeature-content">
              <span className="eyebrow-d">Built to be measured</span>
              <h2>Auditable <em>by design.</em></h2>
              <p>
                Before-and-after removal data supports permits and water-reuse programs with clear, defensible metrics for regulators and customers.
              </p>
              <ul className="dfeature-bullets">
                <li>Real-time particle counting at inlet and outlet</li>
                <li>Automated capture logs with timestamping</li>
                <li>Compliance-ready reporting exports</li>
              </ul>
            </div>
            <div className="dfeature-img">
              <div className="dfeature-img-stripe"></div>
              <div style={{position:"relative",zIndex:1,width:"80%"}}>
                <svg viewBox="0 0 400 240" style={{width:"100%"}}>
                  <line x1="40" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.2)"/>
                  <line x1="40" y1="40" x2="40" y2="200" stroke="rgba(255,255,255,0.2)"/>
                  {[0,1,2,3,4,5].map(i => (
                    <line key={i} x1={40 + i*60} y1="200" x2={40 + i*60} y2="195" stroke="rgba(255,255,255,0.3)"/>
                  ))}
                  {/* Inlet line - high noise */}
                  <path d="M 40 80 Q 100 60, 160 90 T 280 70 T 380 85"
                    stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="3 4"/>
                  {/* Outlet line - low after Flowsonic */}
                  <path d="M 40 80 Q 80 110, 120 140 T 200 175 T 380 190"
                    stroke="#4A9CFF" strokeWidth="2.5" fill="none"/>
                  <text x="40" y="30" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="ui-monospace, monospace">PARTICLES / L</text>
                  <text x="290" y="60" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="ui-monospace, monospace">— INLET</text>
                  <text x="290" y="76" fill="#4A9CFF" fontSize="11" fontFamily="ui-monospace, monospace">— OUTLET</text>
                </svg>
              </div>
              <span className="dfeature-img-label">REPLACE WITH PILOT DATA</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="dspecs">
        <div className="dc">
          <Reveal className="dspecs-head">
            <span className="eyebrow-d">Technical specifications</span>
            <h2>Built for the floor, <em>not the bench.</em></h2>
            <p>FLW-01 Mk. 02 is engineered for continuous duty in industrial water systems.</p>
          </Reveal>

          <div className="dspecs-grid">
            <Reveal className="dspec-card">
              <div className="dspec-key">Target band</div>
              <div className="dspec-val">1 – 5<span className="unit">mm</span></div>
              <div className="dspec-desc">Particle size range optimized for ultrasonic focusing.</div>
            </Reveal>
            <Reveal className="dspec-card" delay={80}>
              <div className="dspec-key">Throughput</div>
              <div className="dspec-val">120<span className="unit">m³/h</span></div>
              <div className="dspec-desc">Continuous flow capacity per single unit.</div>
            </Reveal>
            <Reveal className="dspec-card" delay={160}>
              <div className="dspec-key">Frequency</div>
              <div className="dspec-val">1.6<span className="unit">MHz</span></div>
              <div className="dspec-desc">Tuned for ideal node spacing in water medium.</div>
            </Reveal>
            <Reveal className="dspec-card" delay={240}>
              <div className="dspec-key">Pressure drop</div>
              <div className="dspec-val">&lt; 0.4<span className="unit">bar</span></div>
              <div className="dspec-desc">Minimal hydraulic load on upstream systems.</div>
            </Reveal>
            <Reveal className="dspec-card" delay={320}>
              <div className="dspec-key">Footprint</div>
              <div className="dspec-val">1.4 × 0.8<span className="unit">m</span></div>
              <div className="dspec-desc">Skid-mounted, drops into existing process loops.</div>
            </Reveal>
            <Reveal className="dspec-card" delay={400}>
              <div className="dspec-key">Power draw</div>
              <div className="dspec-val">2.1<span className="unit">kW</span></div>
              <div className="dspec-desc">Energy-efficient compared to membrane systems.</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="dteam dsec">
        <div className="dc">
          <Reveal className="dteam-head">
            <span className="eyebrow-d">The Team</span>
            <h2>Engineers, founders, <em>operators.</em></h2>
          </Reveal>

          <div className="dteam-grid">
            {[
              { initials: "EH", name: "Emil Huseynli", role: "Petroleum Engineer · Former CEO at Agroficient", tag: "FOUNDER" },
              { initials: "RK", name: "Rita Khoury", role: "Environmental & Chemical Engineer", tag: "ENG" },
              { initials: "KH", name: "Kevin Huang", role: "Design Engineer", tag: "ENG" },
              { initials: "YZ", name: "Yihang Zhang", role: "Architect", tag: "DESIGN" },
            ].map((m, i) => (
              <Reveal key={m.initials} className="dmember" delay={i*100}>
                <div className="dmember-photo" data-initials={m.initials}>
                  <span className="dmember-tag">{m.tag}</span>
                </div>
                <div className="dmember-info">
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAIN */}
      <section className="dsustain">
        <div className="dc">
          <Reveal className="dsustain-row">
            <h3>We're <em>responsible.</em><br/>You can be too.</h3>
            <div className="dsdg-row">
              <div className="dsdg dsdg-6">
                <div className="dsdg-num">06</div>
                <div className="dsdg-label">Clean Water<br/>& Sanitation</div>
              </div>
              <div className="dsdg dsdg-9">
                <div className="dsdg-num">09</div>
                <div className="dsdg-label">Industry<br/>& Innovation</div>
              </div>
              <div className="dsdg dsdg-12">
                <div className="dsdg-num">12</div>
                <div className="dsdg-label">Responsible<br/>Consumption</div>
              </div>
              <div className="dsdg dsdg-13">
                <div className="dsdg-num">13</div>
                <div className="dsdg-label">Climate<br/>Action</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUPPORTED */}
      <section className="dsupported">
        <div className="dc">
          <div className="dsupported-row">
            <div className="dsupported-label">Supported by</div>
            <div className="dsupported-imp">Imperial College London</div>
            <div className="dsupported-label">Est. 2026 · London, UK</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="dcta">
        <div className="dc-narrow">
          <Reveal>
            <h2>Let's <em>get to work.</em></h2>
            <p>Pilot programs are now opening for industrial water operators, sustainability teams, and reuse-system integrators.</p>
            {submitted ? (
              <div className="dcta-success">Thanks — we'll be in touch within 48 hours.</div>
            ) : (
              <form className="dcta-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="dcta-row">
                  <input type="email" required placeholder="you@company.com"/>
                  <input type="text" placeholder="Company"/>
                </div>
                <textarea required placeholder="Tell us about your water system"></textarea>
                <button type="submit" className="dcta-submit">Send message →</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dfoot">
        <div className="dc">
          <div className="dfoot-mark">Flowsonic<span>.</span></div>
          <div className="dfoot-row">
            <div>© 2026 Flowsonic Filtration Ltd</div>
            <div>info@flowsonicfiltration.co.uk</div>
            <div>FLW-01 · Mk. 02 · London / UK</div>
          </div>
        </div>
      </footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
