// @ts-nocheck
interface RevealProps { children: any; className?: string; delay?: number; }
interface CounterProps { to: number; decimals?: number; }

const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting) {
        setTimeout(() => ref.current && ref.current.classList.add("in"), delay);
        obs.disconnect();
      }
    }, { threshold: 0.06 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`rv ${className}`}>{children}</div>;
};

const Counter = ({ to, decimals = 0 }: CounterProps) => {
  const [val, setVal] = React.useState<number>(0);
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const fired = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / 2200);
          setVal(to * (1 - Math.pow(1 - t, 4)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}</span>;
};

const Word = ({ w, delay }: { w: string; delay: number }) => (
  <span className="hw" style={{ animationDelay: `${delay}s` }}
    dangerouslySetInnerHTML={{ __html: w }} />
);

const TechViz = () => {
  const pts = React.useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i, d: (i * 0.13) % 5.5,
      y: ((i * 47) % 200) - 100,
      r: 1.4 + ((i * 7) % 4) / 2.5,
      s: 5 + (i % 4) * 0.7,
      hi: i % 7 === 0,
    })), []);

  return (
    <div className="viz-frame">
      <svg viewBox="0 0 1400 440" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="1400" height="440" fill="url(#g)"/>
        <rect x="0" y="110" width="1400" height="220" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <line x1="0" y1="220" x2="1400" y2="220" stroke="rgba(255,255,255,0.04)" strokeDasharray="5 9"/>

        {[350,525,700,875,1050].map((x,i) => (
          <g key={x}>
            <rect x={x-32} y="46" width="64" height="66" fill="rgba(20,45,95,0.3)" stroke="rgba(80,120,190,0.45)" strokeWidth="1" rx="3"/>
            {[54,68,82].map((y,j) => <rect key={j} x={x-24} y={y} width="48" height="9" rx="2" fill={`rgba(80,120,190,${0.4-j*0.1})`}/>)}
            <rect x={x-32} y="328" width="64" height="66" fill="rgba(20,45,95,0.3)" stroke="rgba(80,120,190,0.45)" strokeWidth="1" rx="3"/>
            {[336,350,364].map((y,j) => <rect key={j} x={x-24} y={y} width="48" height="9" rx="2" fill={`rgba(80,120,190,${0.2+j*0.1})`}/>)}
            <line x1={x} y1="112" x2={x} y2="328" stroke="rgba(80,120,190,0.15)" strokeWidth="1"/>
          </g>
        ))}

        {[0,1,2].map(i => (
          <path key={i} strokeWidth={1.6-i*0.3} stroke="#4A70B8" fill="none" opacity={0.55-i*0.13}
            d={`M 180 220 Q 265 ${194+i*5},350 220 T 525 220 T 700 220 T 875 220 T 1050 220 T 1220 220`}>
            <animate attributeName="d"
              values={`M 180 220 Q 265 ${194+i*5},350 220 T 525 220 T 700 220 T 875 220 T 1050 220 T 1220 220;
                      M 180 220 Q 265 ${246-i*5},350 220 T 525 220 T 700 220 T 875 220 T 1050 220 T 1220 220;
                      M 180 220 Q 265 ${194+i*5},350 220 T 525 220 T 700 220 T 875 220 T 1050 220 T 1220 220`}
              dur={`${3+i*0.4}s`} repeatCount="indefinite"/>
          </path>
        ))}

        {pts.map((p: any) => (
          <circle key={p.id} r={p.r} fill={p.hi ? "#6A90D0" : "rgba(255,255,255,0.85)"}>
            <animate attributeName="cx" from={-10} to={1410} dur={`${p.s}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
            <animate attributeName="cy"
              values={`${220+p.y};${220+p.y*.85};${220+p.y*.28};220;220;${220+p.y*.28};${220+p.y*.85};${220+p.y}`}
              keyTimes="0;.14;.3;.45;.6;.75;.88;1"
              dur={`${p.s}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
            <animate attributeName="fill"
              values={`${p.hi?"#6A90D0":"rgba(255,255,255,0.85)"};#6A90D0;#4A70B8;#4A70B8;${p.hi?"#6A90D0":"rgba(255,255,255,0.85)"}`}
              keyTimes="0;.3;.44;.64;1"
              dur={`${p.s}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        <text x="24" y="24" fontFamily="ui-monospace,monospace" fontSize="10" fill="rgba(255,255,255,0.4)" letterSpacing="2.5">FLOW →</text>
        <text x="1270" y="24" fontFamily="ui-monospace,monospace" fontSize="10" fill="rgba(80,120,190,0.75)" letterSpacing="2.5">FOCUSED</text>
        <text x="24" y="426" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)" letterSpacing="1.6">FIG. 02 · ULTRASONIC ACOUSTIC FOCUSING — 1.6 MHZ</text>
      </svg>
    </div>
  );
};

const TEAM = [
  { img: "Pictures%20%26%20Videos/1.jpg", name: "Emil Huseynli",   role: "Petroleum Engineer",        tag: "Founder" },
  { img: "Pictures%20%26%20Videos/2.jpg", name: "Rita Khoury",     role: "Environmental & Chemical Engineer", tag: "Engineering" },
  { img: "Pictures%20%26%20Videos/3.jpg", name: "Yihang Zhang",    role: "Architect",                 tag: "Design" },
  { img: "Pictures%20%26%20Videos/4.jpg", name: "Kevin Huang",     role: "Design Engineer",           tag: "Engineering" },
];

const SPECS = [
  { k: "Target band",    v: "1–5",     u: "mm",   d: "Particle size range optimized for ultrasonic focusing." },
  { k: "Throughput",     v: "120",     u: "m³/h", d: "Continuous flow capacity per single unit." },
  { k: "Frequency",      v: "1.6",     u: "MHz",  d: "Tuned for ideal node spacing in water medium." },
  { k: "Pressure drop",  v: "<0.4",    u: "bar",  d: "Minimal hydraulic load on upstream systems." },
  { k: "Footprint",      v: "1.4×0.8", u: "m",    d: "Skid-mounted, integrates into existing loops." },
  { k: "Power draw",     v: "2.1",     u: "kW",   d: "Energy-efficient vs. membrane alternatives." },
];

const App = () => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [section, setSection] = React.useState<string>("hero");
  const [done, setDone] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  React.useEffect(() => {
    const ids = ["hero","problem","tech","specs","team","contact"];
    const obs = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(e => { if (e.isIntersecting) setSection((e.target as HTMLElement).id); });
    }, { rootMargin: "-50% 0px -45% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const darkSections = ["hero","tech","contact"];
  const onDark = darkSections.includes(section);

  const words1 = ["The", "magnet"];
  const words2 = ["for"];
  const words3 = ["microplastics."];

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className={`nav${scrolled?" scrolled":""}${onDark?" dark":""}`}>
        <a href="#hero" className="nav-brand">
          <img
            src="Pictures%20%26%20Videos/Spring%20Term%20Logo.png"
            alt="Flowsonic"
            className="nav-logo-img"
          />
        </a>
        <ul className="nav-links">
          <li><a href="#problem">Challenge</a></li>
          <li><a href="#tech">Technology</a></li>
          <li><a href="#specs">Specs</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get in touch</a>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">FLW-01 · Mk. 02 · 2026</p>
          <h1 className="hero-h1">
            <span className="hero-line">
              {words1.map((w, i) => <Word key={i} w={w} delay={0.2 + i * 0.1}/>)}{" "}
              {words2.map((w, i) => <Word key={i} w={w} delay={0.4}/>)}
            </span>
            <span className="hero-line italic">
              {words3.map((w, i) => <Word key={i} w={w} delay={0.55}/>)}
            </span>
          </h1>
          <p className="hero-sub">
            An ultrasonic interception system engineered for the 1–5&nbsp;mm microplastics today's industrial water filters let through.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-solid">Request a call →</a>
            <a href="#tech" className="btn-outline">How it works</a>
          </div>
        </div>
        <div className="hero-rule"/>
        <div className="hero-device-wrap">
          <HeroDevice/>
        </div>
        <div className="scroll-hint">Scroll</div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="metrics">
        <div className="container">
          <div className="metrics-row">
            {[
              { to:92,  dec:0, unit:"%",   label:"Capture in target band" },
              { to:50,  dec:0, unit:"%",   label:"Maintenance reduction", prefix:"−" },
              { to:120, dec:0, unit:"m³/h",label:"Continuous throughput" },
              { to:1.6, dec:1, unit:"MHz", label:"Operating frequency" },
            ].map((m, i) => (
              <Reveal key={i} className="metric" delay={i*80}>
                <div className="metric-val">
                  {m.prefix && m.prefix}
                  <Counter to={m.to} decimals={m.dec}/><span className="metric-unit">{m.unit}</span>
                </div>
                <div className="metric-label">{m.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHALLENGE ─── */}
      <section id="problem" className="section">
        <div className="container">
          <div className="section-intro">
            <Reveal>
              <span className="label">01 — The Challenge</span>
              <h2 className="display">The threat is already<br/><em>in your water.</em></h2>
              <p className="intro-body">
                Particles in the 1–5&nbsp;mm range are too small to screen, too large to settle, and too persistent to ignore. They migrate through pipework, degrade reuse loops, and quietly build into an operational headache.
              </p>
            </Reveal>
          </div>

          <div className="problem-list">
            {[
              { n:"01", h:"Slipping through filters",    p:"Conventional screens and WWTPs struggle in the 1–5 mm range, leaving operators with persistent discharge risk and compliance exposure." },
              { n:"02", h:"Unreliable reuse quality",    p:"Microplastics degrade recycled water loops over time, undermining process stability and audit-readiness in closed systems." },
              { n:"03", h:"Clogging and downtime",       p:"Fine meshes block fast under real-world loads — driving maintenance cycles, labor costs, and unplanned interruptions." },
            ].map((p, i) => (
              <Reveal key={i} className="problem-item" delay={i*80}>
                <span className="problem-n">{p.n}</span>
                <div className="problem-body">
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY ─── */}
      <section id="tech" className="section dark">
        <div className="container">
          <div className="section-intro">
            <Reveal>
              <span className="label">02 — The Technology</span>
              <h2 className="display">Standing waves.<br/><em>No moving parts.</em></h2>
              <p className="intro-body">
                Piezo arrays generate a precise pressure field at 1.6&nbsp;MHz. Acoustic radiation force pushes microplastics into focus nodes — concentrating them while bulk flow passes clean.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="viz-wrap">
          <Reveal><TechViz/></Reveal>
        </div>

        <div className="container">
          <div className="stages">
            {[
              { n:"01", h:"Inlet",          p:"Untreated flow enters the active zone — particles suspended at random across the cross-section." },
              { n:"02", h:"Standing wave",  p:"Piezo arrays generate a standing pressure field. No filters, no membranes, no contact with the medium." },
              { n:"03", h:"Acoustic focus", p:"Radiation force concentrates particles into a narrow centerline stream toward the pressure nodes." },
              { n:"04", h:"Capture",        p:"A downstream probe siphons the focused stream while bulk flow exits clean and uninterrupted." },
            ].map((s, i) => (
              <Reveal key={i} className="stage" delay={i*90}>
                <span className="stage-n">{s.n}</span>
                <div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPECS ─── */}
      <section id="specs" className="section">
        <div className="container">
          <div className="section-intro">
            <Reveal>
              <span className="label">03 — Specifications</span>
              <h2 className="display">Built for the floor,<br/><em>not the bench.</em></h2>
            </Reveal>
          </div>

          <div className="specs-layout">
            <Reveal className="specs-device">
              <HeroDevice/>
              <p className="specs-device-label">FLW-01 / Mk. 02 · Product render</p>
            </Reveal>

            <Reveal className="specs-table" delay={100}>
              {SPECS.map((s, i) => (
                <div key={i} className="spec-row">
                  <span className="spec-k">{s.k}</span>
                  <span className="spec-v">{s.v}<em> {s.u}</em></span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" className="section team-section">
        <div className="container">
          <Reveal className="section-intro">
            <span className="label">04 — The Team</span>
            <h2 className="display">Engineers, founders,<br/><em>operators.</em></h2>
          </Reveal>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <Reveal key={i} className="member" delay={i*80}>
              <div className="member-img-wrap">
                <img src={m.img} alt={m.name}/>
              </div>
              <div className="member-info">
                <span className="member-tag">{m.tag}</span>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── SUSTAIN ─── */}
      <section className="sustain">
        <div className="container">
          <Reveal className="sustain-inner">
            <h3>We're <em>responsible.</em><br/>You can be too.</h3>
            <div className="sdg-row">
              {[
                { n:"06", l:"Clean Water\n& Sanitation",     c:"#26BDE2" },
                { n:"09", l:"Industry\n& Innovation",        c:"#FD6925" },
                { n:"12", l:"Responsible\nConsumption",      c:"#BF8B2E" },
                { n:"13", l:"Climate\nAction",               c:"#3F7E44" },
              ].map(s => (
                <div key={s.n} className="sdg" style={{ background: s.c }}>
                  <div className="sdg-n">{s.n}</div>
                  <div className="sdg-l">{s.l.split("\n").map((t,i) => <span key={i}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SUPPORTED ─── */}
      <section className="supported">
        <div className="container supported-row">
          <span className="label">Supported by</span>
          <span className="imperial">
            <span className="imperial-mark"/>
            Imperial College London
          </span>
          <span className="label">Est. 2026 · London</span>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section dark contact-section">
        <div className="container">
          <div className="contact-grid">
            <Reveal className="contact-left">
              <span className="label">05 — Contact</span>
              <h2 className="display">Let's get<br/><em>to work.</em></h2>
              <p className="intro-body">
                Pilot programs are now open for industrial water operators, sustainability teams, and reuse-system integrators.
              </p>
              <dl className="contact-info">
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:info@flowsonicfiltration.co.uk">info@flowsonicfiltration.co.uk</a></dd>
                </div>
                <div>
                  <dt>Book a call</dt>
                  <dd><a href="https://calendly.com/ritalkhoury7/30min" target="_blank" rel="noreferrer">30-min intro ↗</a></dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Imperial College, South Kensington · London</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="contact-right" delay={140}>
              {done ? (
                <p className="form-success">Thanks — we'll be in touch within 48&nbsp;hours.</p>
              ) : (
                <form onSubmit={(e: any) => { e.preventDefault(); setDone(true); }}>
                  <div className="field">
                    <label>Email *</label>
                    <input type="email" required placeholder="you@company.com"/>
                  </div>
                  <div className="field">
                    <label>Company</label>
                    <input type="text" placeholder="Where you work"/>
                  </div>
                  <div className="field">
                    <label>Message *</label>
                    <textarea required placeholder="Tell us about your water system"/>
                  </div>
                  <button type="submit" className="btn-solid">Send message →</button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img
              src="Pictures%20%26%20Videos/Spring%20Term%20Logo.png"
              alt="Flowsonic"
              className="footer-logo"
            />
          </div>
          <div className="footer-meta">
            <span>© 2026 Flowsonic Filtration Ltd</span>
            <span>info@flowsonicfiltration.co.uk</span>
            <span>FLW-01 · Mk. 02 · London</span>
          </div>
        </div>
      </footer>
    </>
  );
};

/* ─ inline device SVG ─ */
function HeroDevice() {
  return (
    <svg viewBox="0 0 1400 580" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <linearGradient id="hbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#E6EDF8"/>
          <stop offset=".42" stopColor="#FFFFFF"/>
          <stop offset=".6"  stopColor="#F2F5FC"/>
          <stop offset="1"   stopColor="#96A4BC"/>
        </linearGradient>
        <linearGradient id="hcl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2C5CAA"/><stop offset=".5" stopColor="#1C3868"/><stop offset="1" stopColor="#0A1424"/>
        </linearGradient>
        <linearGradient id="hcr" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2450A0"/><stop offset=".5" stopColor="#183060"/><stop offset="1" stopColor="#0A1424"/>
        </linearGradient>
        <linearGradient id="hpipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8898B0"/><stop offset=".4" stopColor="#9EACBF"/><stop offset="1" stopColor="#545E70"/>
        </linearGradient>
        <linearGradient id="hstrip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#142450"/><stop offset=".5" stopColor="#284C96"/><stop offset="1" stopColor="#142450"/>
        </linearGradient>
        <radialGradient id="hglow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(100,132,200,.4)"/><stop offset="1" stopColor="rgba(100,132,200,0)"/>
        </radialGradient>
        <radialGradient id="hshadow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,.5)"/><stop offset="1" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="hdrp"><feDropShadow dx="0" dy="12" stdDeviation="24" floodColor="rgba(0,0,0,.4)"/></filter>
      </defs>

      <ellipse cx="700" cy="544" rx="520" ry="18" fill="url(#hshadow)" opacity=".55"/>
      <ellipse cx="700" cy="498" rx="420" ry="88" fill="url(#hglow)" opacity=".5"/>

      <rect x="18" y="296" width="220" height="58" rx="5" fill="url(#hpipe)" filter="url(#hdrp)"/>
      <rect x="18" y="296" width="220" height="14" rx="5" fill="rgba(255,255,255,.2)"/>
      <rect x="222" y="280" width="24" height="90" rx="2" fill="#364256"/>
      <rect x="222" y="280" width="8"  height="90" rx="1" fill="rgba(255,255,255,.08)"/>

      <rect x="246" y="162" width="908" height="322" rx="26" fill="url(#hbg)" filter="url(#hdrp)"/>
      <rect x="246" y="162" width="908" height="66"  rx="26" fill="rgba(255,255,255,.4)"/>
      <rect x="246" y="162" width="13"  height="322" fill="rgba(0,0,0,.04)"/>
      <rect x="1141" y="162" width="13" height="322" fill="rgba(0,0,0,.04)"/>

      <rect x="316" y="146" width="768" height="26" rx="3" fill="url(#hstrip)"/>
      <rect x="316" y="146" width="768" height="8"  rx="3" fill="rgba(255,255,255,.1)"/>
      {[428,546,664,782,900,1018].map((x,i) => (
        <g key={x}>
          <rect x={x-24} y="149" width="48" height="19" rx="2" fill="rgba(42,78,152,.6)" stroke="rgba(86,120,188,.4)" strokeWidth=".5"/>
          <circle cx={x} cy="158" r="3.5" fill="#7090D8" opacity=".6">
            <animate attributeName="opacity" values=".2;.9;.2" dur="2.4s" repeatCount="indefinite" begin={`${i*.28}s`}/>
          </circle>
        </g>
      ))}

      <rect x="316" y="498" width="768" height="26" rx="3" fill="url(#hstrip)"/>
      {[428,546,664,782,900,1018].map((x,i) => (
        <g key={x}>
          <rect x={x-24} y="501" width="48" height="19" rx="2" fill="rgba(42,78,152,.6)" stroke="rgba(86,120,188,.4)" strokeWidth=".5"/>
          <circle cx={x} cy="510" r="3.5" fill="#7090D8" opacity=".6">
            <animate attributeName="opacity" values=".9;.2;.9" dur="2.4s" repeatCount="indefinite" begin={`${i*.28}s`}/>
          </circle>
        </g>
      ))}

      <ellipse cx="246" cy="323" rx="38" ry="163" fill="url(#hcl)"/>
      <ellipse cx="246" cy="323" rx="20" ry="94"  fill="rgba(100,132,200,.16)"/>
      <ellipse cx="1154" cy="323" rx="38" ry="163" fill="url(#hcr)"/>
      <ellipse cx="1154" cy="323" rx="20" ry="94"  fill="rgba(100,132,200,.14)"/>

      <rect x="790" y="232" width="296" height="102" rx="9" fill="#050C1A" stroke="rgba(86,120,188,.2)" strokeWidth="1"/>
      <rect x="800" y="242" width="276" height="82"  rx="5" fill="#030810"/>
      <text x="814" y="264" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="rgba(86,120,188,.9)"  letterSpacing="1.6">FLW-01 / ACTIVE</text>
      <line x1="814" y1="271" x2="1068" y2="271" stroke="rgba(86,120,188,.16)" strokeWidth=".5"/>
      <text x="814" y="287" fontFamily="ui-monospace,monospace" fontSize="10"   fill="rgba(255,255,255,.5)"  letterSpacing="1.2">1.6 MHz · 120 m³/h</text>
      <text x="814" y="303" fontFamily="ui-monospace,monospace" fontSize="10"   fill="rgba(86,120,188,.7)"   letterSpacing="1.2">CAPTURE 92%</text>
      <text x="814" y="318" fontFamily="ui-monospace,monospace" fontSize="9.5"  fill="rgba(255,255,255,.25)" letterSpacing="1">Mk. 02 · 2026</text>
      <circle cx="1072" cy="259" r="3" fill="#44C068" opacity=".9">
        <animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/>
      </circle>

      <text x="318" y="410" fontFamily="Inter,sans-serif" fontSize="22" fontWeight="600" fill="#1C3868" letterSpacing="3.5" opacity=".85">FLOWSONIC</text>
      <text x="318" y="428" fontFamily="Inter,sans-serif" fontSize="8.5" fill="#8A8E9B" letterSpacing="3.2">THE MAGNET FOR MICROPLASTICS · Mk. 02</text>

      <rect x="1162" y="296" width="220" height="58" rx="5" fill="url(#hpipe)" filter="url(#hdrp)"/>
      <rect x="1162" y="296" width="220" height="14" rx="5" fill="rgba(255,255,255,.2)"/>
      <rect x="1158" y="280" width="24" height="90" rx="2" fill="#364256"/>
      <rect x="1174" y="280" width="8"  height="90" rx="1" fill="rgba(255,255,255,.08)"/>

      {Array.from({length:14},(_,i) => (
        <circle key={i} r={i%3===0?2.8:1.9} cy={323+(i%5-2)*24}
          fill={i>8?"#5A7AC0":"rgba(255,255,255,.8)"}>
          <animate attributeName="cx" from="40" to="1360"
            dur={`${2.5+(i%4)*.45}s`} begin={`${i*.2}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;.9;.9;.8;0"
            keyTimes="0;.07;.45;.92;1"
            dur={`${2.5+(i%4)*.45}s`} begin={`${i*.2}s`} repeatCount="indefinite"/>
          {i>8&&<animate attributeName="cy"
            values={`${323+(i%5-2)*24};${323+(i%5-2)*12};323;323`}
            keyTimes="0;.32;.5;1"
            dur={`${2.5+(i%4)*.45}s`} begin={`${i*.2}s`} repeatCount="indefinite"/>}
        </circle>
      ))}

      <rect x="662" y="488" width="76" height="68" rx="3" fill="#263244" stroke="rgba(86,120,188,.25)" strokeWidth="1"/>
      <rect x="672" y="550" width="56" height="14" rx="2" fill="#1C3868"/>
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
