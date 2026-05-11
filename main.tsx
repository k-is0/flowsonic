import React from 'react';
import ReactDOM from 'react-dom/client';

interface RevealProps {
  children: any;
  className?: string;
  delay?: number;
}

// Brand mark — uses the actual logo PNG (transparent navy / transparent white versions).
const LogoMark = ({ size = 32, white = false }: { size?: number; white?: boolean }) => (
  <img
    src={white ? "/logo-icon-white.png" : "/logo-icon.png"}
    alt="Flowsonic"
    width={size}
    height={size}
    style={{ display: "block", objectFit: "contain" }}
  />
);

const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting) {
        setTimeout(() => ref.current && ref.current.classList.add("in"), delay);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`rv ${className}`}>{children}</div>;
};

interface CounterProps {
  to: number;
  decimals?: number;
}

const Counter = ({ to, decimals = 0 }: CounterProps) => {
  const [val, setVal] = React.useState<number>(0);
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const triggered = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const tick = (now: number) => {
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
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}</span>;
};

// Animated headline — splits into words, each rises with stagger
const AnimatedHeadline = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="word" style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            dangerouslySetInnerHTML={{ __html: w }} />
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </>
  );
};

// Hero device — premium product render with brand navy
const HeroDevice = () => (
  <svg viewBox="0 0 1400 700" style={{ width: "100%", height: "auto", display: "block" }}>
    <defs>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E8EEF8" />
        <stop offset="0.45" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#A0AAC0" />
      </linearGradient>
      <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2E54A0" />
        <stop offset="0.5" stopColor="#1E3A6B" />
        <stop offset="1" stopColor="#0A1628" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5A7FC8" />
        <stop offset="1" stopColor="#1E3A6B" />
      </linearGradient>
      <radialGradient id="shadowGrad" cx="0.5" cy="0.5">
        <stop offset="0" stopColor="rgba(0,0,0,0.5)" />
        <stop offset="1" stopColor="rgba(0,0,0,0)" />
      </radialGradient>
    </defs>

    <ellipse cx="700" cy="640" rx="500" ry="28" fill="url(#shadowGrad)" />

    {/* End cap left */}
    <ellipse cx="240" cy="380" rx="38" ry="170" fill="url(#capGrad)" />
    <ellipse cx="240" cy="380" rx="20" ry="100" fill="rgba(90,127,200,0.3)" />

    {/* Main body */}
    <rect x="240" y="210" width="920" height="340" rx="28" fill="url(#bodyGrad)" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    <rect x="240" y="210" width="920" height="60" rx="28" fill="rgba(255,255,255,0.4)" />

    {/* Side seams */}
    <rect x="240" y="210" width="14" height="340" fill="rgba(0,0,0,0.04)" />
    <rect x="1146" y="210" width="14" height="340" fill="rgba(0,0,0,0.04)" />

    {/* Top transducer strip */}
    <rect x="320" y="190" width="760" height="30" rx="4" fill="#1E3A6B" />
    {[420, 550, 680, 810, 940].map(x => (
      <g key={x}>
        <rect x={x - 22} y="195" width="44" height="20" rx="2" fill="url(#ringGrad)" opacity="0.85" />
        <circle cx={x} cy="205" r="3" fill="#5A7FC8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${(x - 420) / 200}s`} />
        </circle>
      </g>
    ))}

    {/* Display panel */}
    <rect x="800" y="280" width="280" height="80" rx="10" fill="#0A1628" />
    <rect x="810" y="290" width="260" height="60" rx="6" fill="#050B17" stroke="rgba(90,127,200,0.3)" strokeWidth="1" />
    <text x="820" y="310" fontFamily="ui-monospace, monospace" fontSize="11" fill="#5A7FC8" letterSpacing="1">FLW-01 / ACTIVE</text>
    <text x="820" y="328" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.6)" letterSpacing="1">100 kHz · 120 m³/h</text>
    <text x="820" y="345" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(90,127,200,0.7)" letterSpacing="1">CAPTURE 60–70%</text>

    {/* Brand mark + name */}
    <text x="320" y="460" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="700" fill="#1E3A6B" letterSpacing="2">FLOWSONIC</text>
    <text x="320" y="478" fontFamily="Inter, sans-serif" fontSize="9" fill="#7A8499" letterSpacing="2.5">THE MAGNET FOR MICROPLASTICS · MK.02</text>

    {/* End cap right */}
    <ellipse cx="1160" cy="380" rx="38" ry="170" fill="url(#capGrad)" />
    <ellipse cx="1160" cy="380" rx="20" ry="100" fill="rgba(90,127,200,0.3)" />

    {/* Inlet pipe */}
    <rect x="40" y="350" width="200" height="60" rx="6" fill="#7A8499" />
    <rect x="40" y="350" width="200" height="14" fill="rgba(255,255,255,0.2)" />
    <rect x="220" y="335" width="22" height="90" fill="#3A4760" />

    {/* Outlet pipe */}
    <rect x="1160" y="350" width="200" height="60" rx="6" fill="#7A8499" />
    <rect x="1160" y="350" width="200" height="14" fill="rgba(255,255,255,0.2)" />
    <rect x="1158" y="335" width="22" height="90" fill="#3A4760" />

    {/* Particle stream */}
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={i} r="2.5" cy={380 + (i % 3 - 1) * 30} fill="#5A7FC8">
        <animate attributeName="cx" from="60" to="1340"
          dur={`${3 + (i % 3) * 0.5}s`}
          begin={`${i * 0.35}s`}
          repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0"
          dur={`${3 + (i % 3) * 0.5}s`}
          begin={`${i * 0.35}s`}
          repeatCount="indefinite" />
      </circle>
    ))}

    {/* Collection probe */}
    <rect x="660" y="550" width="80" height="70" rx="4" fill="#3A4760" />
    <rect x="675" y="620" width="50" height="20" rx="2" fill="#1E3A6B" />
  </svg>
);

// Tech viz — particles converging into two focus nodes at 1/4 and 3/4 pipe height
const TechViz = () => {
  // Pipe: y=130 to y=370 (height=240), center y=250
  // Node at 1/4 height: y=190 (offset -60 from center)
  // Node at 3/4 height: y=310 (offset +60 from center)
  const particles = React.useMemo(() =>
    Array.from({ length: 80 }, (_, i) => {
      const rawY = ((i * 41) % 200) - 100; // -100 to +99 from center
      const nodeOffset = rawY < 0 ? -60 : 60; // top node or bottom node
      return {
        id: i,
        delay: (i * 0.12) % 5,
        yStart: rawY,
        nodeOffset,
        size: 1.5 + ((i * 7) % 4) / 2,
        speed: 5 + (i % 3),
      };
    }), []
  );

  return (
    <div className="tech-viz-frame">
      <svg viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* Pipe body */}
        <rect x="0" y="130" width="1400" height="240" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        {/* Node guide lines at 1/4 and 3/4 pipe height */}
        <line x1="0" y1="190" x2="1400" y2="190" stroke="rgba(90,127,200,0.18)" strokeDasharray="4 8" />
        <line x1="0" y1="310" x2="1400" y2="310" stroke="rgba(90,127,200,0.18)" strokeDasharray="4 8" />

        {/* Transducer blocks */}
        {[400, 600, 800, 1000].map(x => (
          <g key={x}>
            <rect x={x - 32} y="70" width="64" height="60" fill="rgba(46,84,160,0.1)" stroke="rgba(90,127,200,0.45)" strokeWidth="1" rx="4" />
            <rect x={x - 32} y="370" width="64" height="60" fill="rgba(46,84,160,0.1)" stroke="rgba(90,127,200,0.45)" strokeWidth="1" rx="4" />
            <line x1={x} y1="130" x2={x} y2="370" stroke="#5A7FC8" strokeWidth="0.8" opacity="0.3" />
            <text x={x} y="60" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(90,127,200,0.7)" letterSpacing="1">T{(x - 200) / 200}</text>
          </g>
        ))}

        {/* Acoustic field waves at top node (y=190) and bottom node (y=310) */}
        <g stroke="#5A7FC8" fill="none" opacity="0.55">
          {[0, 1, 2].map(i => (
            <path key={`t${i}`} strokeWidth={1.4 - i * 0.3} opacity={0.7 - i * 0.18}
              d={`M 350 ${190 + i * 3} Q 400 ${165 + i * 3}, 450 ${190 + i * 3} T 550 ${190 + i * 3} T 650 ${190 + i * 3} T 750 ${190 + i * 3} T 850 ${190 + i * 3} T 950 ${190 + i * 3} T 1050 ${190 + i * 3}`}>
              <animate attributeName="d"
                values={`M 350 ${190 + i * 3} Q 400 ${165 + i * 3}, 450 ${190 + i * 3} T 550 ${190 + i * 3} T 650 ${190 + i * 3} T 750 ${190 + i * 3} T 850 ${190 + i * 3} T 950 ${190 + i * 3} T 1050 ${190 + i * 3};
                        M 350 ${190 + i * 3} Q 400 ${215 + i * 3}, 450 ${190 + i * 3} T 550 ${190 + i * 3} T 650 ${190 + i * 3} T 750 ${190 + i * 3} T 850 ${190 + i * 3} T 950 ${190 + i * 3} T 1050 ${190 + i * 3};
                        M 350 ${190 + i * 3} Q 400 ${165 + i * 3}, 450 ${190 + i * 3} T 550 ${190 + i * 3} T 650 ${190 + i * 3} T 750 ${190 + i * 3} T 850 ${190 + i * 3} T 950 ${190 + i * 3} T 1050 ${190 + i * 3}`}
                dur="3.5s" repeatCount="indefinite" />
            </path>
          ))}
          {[0, 1, 2].map(i => (
            <path key={`b${i}`} strokeWidth={1.4 - i * 0.3} opacity={0.7 - i * 0.18}
              d={`M 350 ${310 + i * 3} Q 400 ${285 + i * 3}, 450 ${310 + i * 3} T 550 ${310 + i * 3} T 650 ${310 + i * 3} T 750 ${310 + i * 3} T 850 ${310 + i * 3} T 950 ${310 + i * 3} T 1050 ${310 + i * 3}`}>
              <animate attributeName="d"
                values={`M 350 ${310 + i * 3} Q 400 ${285 + i * 3}, 450 ${310 + i * 3} T 550 ${310 + i * 3} T 650 ${310 + i * 3} T 750 ${310 + i * 3} T 850 ${310 + i * 3} T 950 ${310 + i * 3} T 1050 ${310 + i * 3};
                        M 350 ${310 + i * 3} Q 400 ${335 + i * 3}, 450 ${310 + i * 3} T 550 ${310 + i * 3} T 650 ${310 + i * 3} T 750 ${310 + i * 3} T 850 ${310 + i * 3} T 950 ${310 + i * 3} T 1050 ${310 + i * 3};
                        M 350 ${310 + i * 3} Q 400 ${285 + i * 3}, 450 ${310 + i * 3} T 550 ${310 + i * 3} T 650 ${310 + i * 3} T 750 ${310 + i * 3} T 850 ${310 + i * 3} T 950 ${310 + i * 3} T 1050 ${310 + i * 3}`}
                dur="3.5s" repeatCount="indefinite" />
            </path>
          ))}
        </g>

        {/* Particles: random entry, converge to top or bottom node in active zone, stay there */}
        {/* cx: -20→1420 total=1440; active zone x=400-1000 → keyTimes ~0.29 to ~0.71 */}
        {particles.map((p: any) => (
          <circle key={p.id} r={p.size} fill="rgba(255,255,255,0.85)">
            <animate attributeName="cx" from={-20} to={1420} dur={`${p.speed}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="cy"
              values={`${250 + p.yStart}; ${250 + p.yStart}; ${250 + p.yStart * 0.5 + p.nodeOffset * 0.5}; ${250 + p.nodeOffset}; ${250 + p.nodeOffset}`}
              keyTimes="0; 0.28; 0.50; 0.70; 1"
              dur={`${p.speed}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite" />
            <animate attributeName="fill"
              values="rgba(255,255,255,0.85); rgba(255,255,255,0.85); #5A7FC8; #5A7FC8; #5A7FC8"
              keyTimes="0; 0.28; 0.50; 0.70; 1"
              dur={`${p.speed}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite" />
          </circle>
        ))}

        <text x="40" y="40" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.5)" letterSpacing="1.4">FLOW →</text>
        <text x="1240" y="40" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(90,127,200,0.7)" letterSpacing="1.4">FOCUSED ×2</text>
        <text x="40" y="480" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.5)" letterSpacing="1.4">FIG. 02 · ULTRASONIC FOCUSING — 100 KHZ</text>
      </svg>
    </div>
  );
};

// Problem icons
const IconScreen = () => (
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="problem-img-icon">
    <rect x="10" y="10" width="60" height="60" rx="4" />
    <line x1="10" y1="22" x2="70" y2="22" />
    <line x1="10" y1="34" x2="70" y2="34" />
    <line x1="10" y1="46" x2="70" y2="46" />
    <line x1="10" y1="58" x2="70" y2="58" />
    <line x1="22" y1="10" x2="22" y2="70" />
    <line x1="34" y1="10" x2="34" y2="70" />
    <line x1="46" y1="10" x2="46" y2="70" />
    <line x1="58" y1="10" x2="58" y2="70" />
    <circle cx="28" cy="28" r="2" fill="currentColor" />
    <circle cx="52" cy="40" r="2.5" fill="currentColor" />
    <circle cx="40" cy="52" r="1.5" fill="currentColor" />
    <circle cx="64" cy="64" r="2" fill="currentColor" />
  </svg>
);
const IconLoop = () => (
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="problem-img-icon">
    <path d="M 20 40 Q 20 20, 40 20 Q 60 20, 60 40 Q 60 60, 40 60 Q 20 60, 20 40 Z" />
    <path d="M 56 28 L 60 20 L 52 24" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="35" r="2" fill="currentColor" />
    <circle cx="48" cy="44" r="1.5" fill="currentColor" />
    <circle cx="38" cy="50" r="1.8" fill="currentColor" />
    <circle cx="44" cy="30" r="1" fill="currentColor" />
  </svg>
);
const IconClog = () => (
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="problem-img-icon">
    <rect x="14" y="30" width="52" height="20" rx="2" />
    <line x1="14" y1="40" x2="66" y2="40" />
    <circle cx="22" cy="35" r="2.5" fill="currentColor" />
    <circle cx="32" cy="42" r="3" fill="currentColor" />
    <circle cx="42" cy="38" r="2" fill="currentColor" />
    <circle cx="50" cy="44" r="2.5" fill="currentColor" />
    <circle cx="58" cy="36" r="2" fill="currentColor" />
    <path d="M 8 38 L 14 40 L 8 42" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 66 40 L 72 40" strokeLinecap="round" />
  </svg>
);

const CostChart = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [on, setOn] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Fills parent absolutely; tall viewBox so bars use full height
  const cBot = 440, cH = 380;
  const s = (v: number) => cH * (v / 4);
  const h1 = s(3.64), h2 = s(1.50);
  const bracketMid = (cBot - h1 + cBot - h2) / 2;

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      <svg viewBox="0 0 480 510" style={{ width: "100%", height: "100%" }}>
        {/* Grid lines + Y axis labels */}
        {[0, 1, 2, 3, 4].map(v => {
          const y = cBot - s(v);
          return (
            <g key={v}>
              <line x1="48" y1={y} x2="440" y2={y} stroke="rgba(26,31,46,0.08)" strokeDasharray={v > 0 ? "3 6" : undefined} />
              <text x="42" y={y + 4} textAnchor="end" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="#8A8E9B">£{v}</text>
            </g>
          );
        })}

        {/* Bar 1 ghost */}
        <rect x="72" y={cBot - h1} width="130" height={h1} fill="#4A5161" opacity="0.07" />
        {on ? (
          <rect x="72" y={cBot} width="130" height="0" fill="#4A5161">
            <animate attributeName="height" from="0" to={h1} dur="1.1s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" />
            <animate attributeName="y" from={cBot} to={cBot - h1} dur="1.1s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" />
          </rect>
        ) : <rect x="72" y={cBot} width="130" height="0" fill="#4A5161" />}

        {/* Bar 2 ghost */}
        <rect x="278" y={cBot - h2} width="130" height={h2} fill="#1E3A6B" opacity="0.07" />
        {on ? (
          <rect x="278" y={cBot} width="130" height="0" fill="#1E3A6B">
            <animate attributeName="height" from="0" to={h2} dur="1.1s" fill="freeze" begin="0.18s" calcMode="spline" keySplines="0.22 1 0.36 1" />
            <animate attributeName="y" from={cBot} to={cBot - h2} dur="1.1s" fill="freeze" begin="0.18s" calcMode="spline" keySplines="0.22 1 0.36 1" />
          </rect>
        ) : <rect x="278" y={cBot} width="130" height="0" fill="#1E3A6B" />}

        {/* Value labels centred inside bars — white, no collision */}
        <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s ease 1s" }}>
          <text x="137" y={cBot - h1 / 2 + 10} textAnchor="middle" fontSize="26" fontFamily="'Newsreader', serif" fill="white">£3.64</text>
          <text x="137" y={cBot - h1 / 2 + 26} textAnchor="middle" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="rgba(255,255,255,0.55)" letterSpacing="1">PER M³</text>
        </g>
        <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s ease 1.15s" }}>
          <text x="343" y={cBot - h2 / 2 + 10} textAnchor="middle" fontSize="26" fontFamily="'Newsreader', serif" fill="white">£1.50</text>
          <text x="343" y={cBot - h2 / 2 + 26} textAnchor="middle" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="rgba(255,255,255,0.65)" letterSpacing="1">PER M³</text>
        </g>

        {/* Saving bracket */}
        <g opacity={on ? 0.82 : 0} style={{ transition: "opacity 0.4s ease 1.35s" }}>
          <line x1="222" y1={cBot - h1} x2="222" y2={cBot - h2} stroke="#1E3A6B" strokeWidth="1.5" />
          <line x1="215" y1={cBot - h1} x2="222" y2={cBot - h1} stroke="#1E3A6B" strokeWidth="1.5" />
          <line x1="215" y1={cBot - h2} x2="222" y2={cBot - h2} stroke="#1E3A6B" strokeWidth="1.5" />
          <text x="230" y={bracketMid + 2} fontSize="11" fontFamily="'JetBrains Mono', monospace" fill="#1E3A6B" letterSpacing="0.4">−£2.14/m³</text>
          <text x="230" y={bracketMid + 17} fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="rgba(30,58,107,0.6)" letterSpacing="0.4">per m³ saved</text>
        </g>

        {/* Axis labels */}
        <text x="137" y={cBot + 22} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fill="#8A8E9B" letterSpacing="1">UNTREATED</text>
        <text x="343" y={cBot + 22} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fill="#1E3A6B" letterSpacing="1">WITH FLOWSONIC</text>
        <line x1="48" y1={cBot + 34} x2="440" y2={cBot + 34} stroke="rgba(26,31,46,0.08)" />
        <text x="244" y={cBot + 50} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fill="#8A8E9B" letterSpacing="0.6">SOURCE: THAMES WATER · MOGDEN FORMULA TARIFF</text>
      </svg>
    </div>
  );
};

const EnergyBars = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [on, setOn] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]: IntersectionObserverEntry[]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="energy-bars">
      {[
        { label: "RO Membrane", sublabel: "Industry benchmark", val: "1.5", unit: "kWh/m³", pct: "100%", cls: "alt" },
        { label: "FlowSonic", sublabel: "This device", val: "0.5", unit: "kWh/m³", pct: "33.3%", cls: "primary", delay: "0.18s" },
      ].map((b, i) => (
        <div key={i} className="energy-bar-row">
          <div className="energy-bar-meta">
            <div>
              <span className={`energy-bar-name ${b.cls === "primary" ? "energy-bar-name-primary" : ""}`}>{b.label}</span>
              <span className="energy-bar-sublabel">{b.sublabel}</span>
            </div>
            <span className={`energy-bar-val ${b.cls === "primary" ? "energy-bar-val-primary" : ""}`}>
              {b.val} <em>{b.unit}</em>
            </span>
          </div>
          <div className="energy-track">
            <div
              className={`energy-fill energy-fill-${b.cls}`}
              style={{ width: on ? b.pct : "0%", transitionDelay: b.delay || "0s" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const TEAM = [
  { img: "/team-1.jpg", name: "Emil Huseynli", role: "Petroleum Engineer · Founder, Former CEO Agroficient", tag: "FOUNDER" },
  { img: "/team-2.jpg", name: "Rita Khoury", role: "Environmental & Chemical Engineer", tag: "ENGINEERING" },
  { img: "/team-4.jpg", name: "Kevin Huang", role: "Design Engineer", tag: "ENGINEERING" },
  { img: "/team-3.jpg", name: "Yihang Zhang", role: "Architect", tag: "DESIGN" },
];

const App = () => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [section, setSection] = React.useState<string>("hero");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = ["hero", "challenge", "business", "tech", "feat-1", "feat-2", "specs", "team", "cta"];
    const obs = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(e => {
        if (e.isIntersecting) setSection((e.target as HTMLElement).id);
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
      <nav className={`nav ${scrolled ? "scrolled" : ""} ${onDark ? "dark" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <span className="nav-logo-mark"><LogoMark size={30} white={onDark} /></span>
            <span className="nav-logo-text">Flowsonic</span>
          </a>
          <ul className="nav-links">
            <li><a href="#challenge">Challenge</a></li>
            <li><a href="#business">Business</a></li>
            <li><a href="#tech">Technology</a></li>
            <li><a href="#feat-1">Benefits</a></li>
            <li><a href="#specs">Specs</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
          <a href="https://calendly.com/ritalkhoury7/30min" className="nav-cta">Request a call →</a>
        </div>
      </nav>

      <section id="hero" className="hero dark-section">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-cap">Introducing</div>
          <h1 className="hero-headline">
            <AnimatedHeadline text="The magnet for" /><br />
            <em><AnimatedHeadline text="microplastics." /></em>
          </h1>
          <p className="hero-sub">
            An ultrasonic interception system, engineered for the 1–5&nbsp;mm microplastics today's industrial water filters let through.
          </p>
          <div className="hero-ctas">
            <a href="https://calendly.com/ritalkhoury7/30min" className="btn btn-primary">Request a call <span className="arr">→</span></a>
            <a href="#tech" className="btn btn-ghost">Watch how it works</a>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-spotlight"></div>
          <div className="hero-product">
            <HeroDevice />
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="fc">
          <div className="stats-grid">
            <Reveal className="stat">
              <div className="stat-num"><Counter to={60} /><span className="unit">–70%</span></div>
              <div className="stat-label">Target removal efficiency</div>
            </Reveal>
            <Reveal className="stat" delay={100}>
              <div className="stat-num">−<Counter to={50} /><span className="unit">%</span></div>
              <div className="stat-label">Maintenance burden</div>
            </Reveal>
            <Reveal className="stat" delay={200}>
              <div className="stat-num"><Counter to={120} /><span className="unit">m³/h</span></div>
              <div className="stat-label">Continuous throughput</div>
            </Reveal>
            <Reveal className="stat" delay={300}>
              <div className="stat-num"><Counter to={100} /><span className="unit">kHz</span></div>
              <div className="stat-label">Operating frequency</div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="challenge" className="challenge sec">
        <div className="fc">
          <Reveal className="section-head">
            <span className="eyebrow">The Challenge</span>
            <h2 className="display">The threat is already <em>in your water.</em></h2>
            <p>Particles in the 1–5&nbsp;mm range slip through conventional screens and clog fine filters. They migrate through pipework, accumulate in storage, and quietly degrade reuse loops over months.</p>
          </Reveal>
          <div className="problems">
            <Reveal className="problem">
              <div className="problem-img"><IconScreen /></div>
              <div className="problem-num">P / 01</div>
              <h3>Slipping through filters</h3>
              <p>Conventional screens and WWTPs struggle in the 1–5&nbsp;mm range, leaving operators with persistent discharge risk.</p>
            </Reveal>
            <Reveal className="problem" delay={120}>
              <div className="problem-img"><IconLoop /></div>
              <div className="problem-num">P / 02</div>
              <h3>Unreliable reuse quality</h3>
              <p>Microplastics degrade recycled water loops, undermining process stability and compliance confidence.</p>
            </Reveal>
            <Reveal className="problem" delay={240}>
              <div className="problem-img"><IconClog /></div>
              <div className="problem-num">P / 03</div>
              <h3>Clogging and downtime</h3>
              <p>Fine meshes block fast under real-world loads, driving up maintenance, labor, and unplanned downtime.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="business" className="business sec">
        <div className="fc">
          <Reveal className="section-head">
            <span className="eyebrow">The Business Case</span>
            <h2 className="display">The cost of doing nothing<br />is already <em>on your P&L.</em></h2>
            <p>Under the UK Mogden Formula and EU Directive 2024/3019, untreated microplastic discharge carries compounding financial and regulatory exposure for every year of inaction.</p>
          </Reveal>

          <div className="biz-stat-band">
            {[
              { pre: "£", to: 65, suf: "k", label: "annual discharge cost\nat 50 m³/day · untreated" },
              { pre: "£", to: 39, suf: "k", label: "estimated annual saving\nwith FlowSonic installed" },
              { pre: "", to: 80, suf: "%", label: "treatment cost liability\nEU Directive 2024/3019" },
              { pre: "", to: 3.2, dec: 1 as number | undefined, suf: " t", label: "CO₂e avoided per year\nper factory" },
            ].map((s, i) => (
              <Reveal key={i} className="biz-kpi" delay={i * 80}>
                <div className="biz-kpi-num">{s.pre}<Counter to={s.to} decimals={s.dec} />{s.suf}</div>
                <div className="biz-kpi-label">{s.label}</div>
              </Reveal>
            ))}
          </div>

          <div className="biz-main-grid">
            <Reveal className="biz-card biz-chart-card">
              <div className="biz-card-eyebrow">Discharge cost per m³</div>
              <div className="biz-chart-wrap">
                <CostChart />
              </div>
            </Reveal>

            <div className="biz-side-col">
              <Reveal className="biz-card biz-reg-card" delay={120}>
                <div className="biz-reg-badge">EU · Directive 2024/3019</div>
                <h3>Regulatory <em>exposure</em></h3>
                <p>Under the Polluter Pays Principle, industries must fund up to <strong>80%</strong> of advanced wastewater treatment costs if microplastics enter municipal systems — a direct liability on your balance sheet.</p>
                <ul className="biz-reg-list">
                  <li>Applies to textile discharge entering sewers</li>
                  <li>Costs borne by the polluting party, not utilities</li>
                  <li>UK post-equivalent legislation in progress</li>
                </ul>
              </Reveal>

              <Reveal className="biz-card biz-esg-card" delay={200}>
                <div className="biz-card-eyebrow">ESG &amp; Certification Pressure</div>
                <ul className="biz-esg-list">
                  <li><span className="biz-esg-icon">01</span>ESG ratings increasingly penalise uncontrolled microplastic discharge</li>
                  <li><span className="biz-esg-icon">02</span>Corporate sustainability goals require measurable, verified data</li>
                  <li><span className="biz-esg-icon">03</span>Supply chain buyers and retailers demand environmental compliance</li>
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal className="biz-energy-card">
            <div className="biz-energy-head">
              <div>
                <div className="biz-card-eyebrow">Energy intensity · kWh per m³ treated</div>
                <p className="biz-energy-sub">FlowSonic uses 3× less energy than industrial reverse osmosis</p>
              </div>
              <div className="biz-energy-saving">
                <div className="biz-energy-saving-num">18.2</div>
                <div className="biz-energy-saving-label">MWh saved / year<br />per factory</div>
              </div>
            </div>
            <EnergyBars />
            <div className="biz-card-foot">Conservative industrial scaling at 50 m³/day · 2.08 m³/h average flow. UK 2025 grid factor: 0.177 kgCO₂e/kWh. FlowSonic: ~0.5 kWh/m³ · RO benchmark: ~1.5 kWh/m³.</div>
          </Reveal>
        </div>
      </section>

      <section id="tech" className="tech sec dark-section">
        <div className="fc">
          <Reveal className="section-head">
            <span className="eyebrow">The Technology</span>
            <h2 className="display">Standing waves. <em>No moving parts.</em></h2>
            <p>Piezo arrays generate a precise pressure field. Acoustic radiation force pushes microplastics into focus nodes — concentrating them into a narrow capture stream while bulk flow passes clean.</p>
          </Reveal>
        </div>
        <div className="tech-viz-wrap"><Reveal><TechViz /></Reveal></div>
        <div className="tech-stages">
          {[
            { num: "STAGE 01", h: "Inlet", p: "Untreated flow enters the active zone with particles suspended at random across the cross-section." },
            { num: "STAGE 02", h: "Standing wave", p: "Piezo arrays generate a pressure field. No filters, no membranes, no contact with the medium." },
            { num: "STAGE 03", h: "Acoustic focus", p: "Radiation force concentrates particles into a narrow centerline stream toward the pressure nodes." },
            { num: "STAGE 04", h: "Capture", p: "A downstream probe siphons the focused stream while bulk flow continues clean and uninterrupted." },
          ].map((s, i) => (
            <Reveal key={i} className="stage-card" delay={i * 100}>
              <div className="stage-num">{s.num}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="feat-1" className="feature alt">
        <div className="fc">
          <Reveal className="feature-row">
            <div className="feature-content">
              <span className="eyebrow">Designed for the floor</span>
              <h2>Up to <em>50% less</em> maintenance.</h2>
              <p>By avoiding ultra-fine meshes, the system reduces clogging cycles and cleaning frequency — slashing labor and unplanned downtime.</p>
              <ul className="feature-bullets">
                <li>No replaceable mesh elements</li>
                <li>Self-clearing pressure-node design</li>
                <li>Engineered for 24/7 continuous duty</li>
              </ul>
            </div>
            <div className="feature-img">
              <div className="feature-img-stripe"></div>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: "-0.045em", color: "var(--navy-bright)", lineHeight: 1 }}>−50<span style={{ fontSize: 42, color: "var(--navy)", fontStyle: "italic", fontWeight: 400 }}>%</span></div>
                <div style={{ fontSize: 14, color: "var(--mute)", marginTop: 14, fontWeight: 500, letterSpacing: "0.04em" }}>vs. fine-mesh filtration</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="feat-2" className="feature dark dark-section">
        <div className="fc">
          <Reveal className="feature-row flip">
            <div className="feature-content">
              <span className="eyebrow">Built to be measured</span>
              <h2>Auditable <em>by design.</em></h2>
              <p>Before-and-after removal data supports permits and reuse programs with clear, defensible metrics for regulators and customers.</p>
              <ul className="feature-bullets">
                <li>Real-time particle counting at inlet and outlet</li>
                <li>Automated capture logs with timestamping</li>
                <li>Compliance-ready reporting exports</li>
              </ul>
            </div>
            <div className="feature-img">
              <div className="feature-img-stripe"></div>
              <div style={{ position: "relative", zIndex: 1, width: "82%" }}>
                <svg viewBox="0 0 400 240" style={{ width: "100%" }}>
                  <line x1="40" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.2)" />
                  <line x1="40" y1="40" x2="40" y2="200" stroke="rgba(255,255,255,0.2)" />
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <line key={i} x1={40 + i * 60} y1="200" x2={40 + i * 60} y2="195" stroke="rgba(255,255,255,0.3)" />
                  ))}
                  <path d="M 40 80 Q 100 60, 160 90 T 280 70 T 380 85"
                    stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="3 4" />
                  <path d="M 40 80 Q 80 110, 120 140 T 200 175 T 380 190"
                    stroke="#5A7FC8" strokeWidth="2.5" fill="none">
                    <animate attributeName="stroke-dasharray" from="0 600" to="600 0" dur="2.5s" fill="freeze" />
                  </path>
                  <text x="40" y="30" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="ui-monospace, monospace">PARTICLES / L</text>
                  <text x="290" y="60" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="ui-monospace, monospace">— INLET</text>
                  <text x="290" y="76" fill="#5A7FC8" fontSize="11" fontFamily="ui-monospace, monospace">— OUTLET</text>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="specs" className="specs dark-section">
        <div className="fc">
          <Reveal className="section-head">
            <span className="eyebrow">Technical specifications</span>
            <h2 className="display">Built for the floor, <em>not the bench.</em></h2>
            <p>FLW-01 Mk. 02 is engineered for continuous duty in industrial water systems.</p>
          </Reveal>
          <div className="specs-grid">
            {[
              { k: "Target band", v: "1 – 5", u: "mm", d: "Particle size range optimized for ultrasonic focusing." },
              { k: "Throughput", v: "120", u: "m³/h", d: "Continuous flow capacity per single unit." },
              { k: "Frequency", v: "100", u: "kHz", d: "Tuned for ideal node spacing in water medium." },
              { k: "Pressure drop", v: "< 0.4", u: "bar", d: "Minimal hydraulic load on upstream systems." },
              { k: "Footprint", v: "1.4 × 0.8", u: "m", d: "Skid-mounted, drops into existing process loops." },
              { k: "Power draw", v: "1.04", u: "kW", d: "~0.5 kWh/m³ 3× more efficient than RO membrane systems." },
            ].map((s, i) => (
              <Reveal key={i} className="spec-card" delay={i * 80}>
                <div className="spec-key">{s.k}</div>
                <div className="spec-val">{s.v}<span className="unit">{s.u}</span></div>
                <div className="spec-desc">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="team sec">
        <div className="fc">
          <Reveal className="section-head">
            <span className="eyebrow">The Team</span>
            <h2 className="display">Engineers, founders, <em>operators.</em></h2>
          </Reveal>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <Reveal key={i} className="member" delay={i * 100}>
                <div className="member-photo">
                  <img src={m.img} alt={m.name} />
                  <span className="member-tag">{m.tag}</span>
                </div>
                <div className="member-info">
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sustain">
        <div className="fc">
          <Reveal className="sustain-row">
            <h3>We're <em>responsible.</em><br />You can be too.</h3>
            <div className="sdg-row">
              <div className="sdg sdg-6"><div className="sdg-num">06</div><div className="sdg-label">Clean Water<br />& Sanitation</div></div>
              <div className="sdg sdg-9"><div className="sdg-num">09</div><div className="sdg-label">Industry<br />& Innovation</div></div>
              <div className="sdg sdg-12"><div className="sdg-num">12</div><div className="sdg-label">Responsible<br />Consumption</div></div>
              <div className="sdg sdg-13"><div className="sdg-num">13</div><div className="sdg-label">Climate<br />Action</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="supported">
        <div className="fc">
          <div className="supported-row">
            <div className="supported-label">Supported by</div>
            <img src="/assets/Imperial Logo.png" alt="Imperial College London" className="imperial-logo" />
            <div className="supported-label">Est. 2026 · London, UK</div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta dark-section">
        <div className="fc-narrow">
          <Reveal>
            <h2>Let's <em>get to work.</em></h2>
            <p className="cta-lede">
              Pilot programs are now opening for industrial water operators and sustainability-led textile manufacturers ready to take control of their discharge.
            </p>

            <div className="cta-channels">
              <div className="cta-channel">
                <div className="cta-channel-label">General Enquiries</div>
                <a href="mailto:flowsonic-ND@groups.imperial.ac.uk" className="cta-channel-email">flowsonic-ND@groups.imperial.ac.uk</a>
              </div>
              <div className="cta-channel-rule" />
              <div className="cta-channel">
                <div className="cta-channel-label">Schedule a Call</div>
                <p className="cta-channel-desc">30-minute introduction — discuss your site, flow rates, and how FlowSonic fits your process.</p>
                <a href="https://calendly.com/ritalkhoury7/30min" className="btn btn-primary">Request a call <span className="arr">→</span></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="foot">
        <div className="fc">
          <div className="foot-mark">
            <span className="foot-mark-icon"><LogoMark size={56} white /></span>
            <div className="foot-mark-text">
              <strong>Flowsonic</strong>
              <span>The magnet for microplastics</span>
            </div>
          </div>
          <div className="foot-row">
            <div>© 2026 Flowsonic Ltd</div>
            <div>flowsonic-ND@groups.imperial.ac.uk</div>
            <div>London / UK</div>
          </div>
        </div>
      </footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
