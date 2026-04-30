/* global React */

// Animated counter that runs once when scrolled into view.
const Counter = ({ to, suffix = "", decimals = 0, duration = 1800 }) => {
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
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val);
  return <span ref={ref}>{display}{suffix}</span>;
};

// Reveal-on-scroll wrapper.
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
  return <As ref={ref} className={`reveal ${className}`}>{children}</As>;
};

// Animated standing-wave visualization for the technology section.
const WaveViz = () => {
  const [stage, setStage] = React.useState(0); // 0 inlet → 1 wave → 2 focus → 3 collect

  React.useEffect(() => {
    const id = setInterval(() => setStage(s => (s + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  // Particle field
  const particles = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: (i * 0.18) % 4,
      yOff: ((i * 37) % 80) - 40,
      size: 1.5 + ((i * 13) % 5) / 2,
    }));
  }, []);

  return (
    <div className="tech-viz">
      <div className="tech-viz-label tl">FIG. 01 · ULTRASONIC FOCUSING</div>
      <div className="tech-viz-label tr">SCALE 1:1 · MM</div>
      <div className="tech-viz-label bl">FLOW →</div>
      <div className="tech-viz-label br">{["INLET","STANDING WAVE","FOCUS NODES","COLLECTED"][stage]}</div>

      <svg viewBox="0 0 1400 420" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        <defs>
          <linearGradient id="pipeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.12)"/>
            <stop offset="0.5" stopColor="rgba(255,255,255,0.04)"/>
            <stop offset="1" stopColor="rgba(255,255,255,0.12)"/>
          </linearGradient>
        </defs>

        {/* Pipe bounds */}
        <rect x="0" y="120" width="1400" height="180" fill="url(#pipeGrad)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <line x1="0" y1="210" x2="1400" y2="210" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6"/>

        {/* Transducer arrays */}
        {[300, 500, 700, 900].map(x => (
          <g key={x}>
            <rect x={x-30} y="60" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <rect x={x-30} y="300" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            {stage >= 1 && (
              <>
                <line x1={x} y1="120" x2={x} y2="300" stroke="#4A7BFF" strokeWidth="0.6" opacity="0.4"/>
              </>
            )}
          </g>
        ))}

        {/* Standing wave visualization */}
        {stage >= 1 && (
          <g stroke="#4A7BFF" fill="none" opacity="0.65">
            {[0,1,2].map(i => (
              <path key={i} strokeWidth={1 - i*0.2} opacity={0.7 - i*0.18}
                d={`M 250 ${210 + i*4} Q 300 ${190 + i*4}, 350 ${210 + i*4} T 450 ${210 + i*4} T 550 ${210 + i*4} T 650 ${210 + i*4} T 750 ${210 + i*4} T 850 ${210 + i*4} T 950 ${210 + i*4}`}>
                <animate attributeName="d"
                  values={`M 250 ${210 + i*4} Q 300 ${190 + i*4}, 350 ${210 + i*4} T 450 ${210 + i*4} T 550 ${210 + i*4} T 650 ${210 + i*4} T 750 ${210 + i*4} T 850 ${210 + i*4} T 950 ${210 + i*4};
                          M 250 ${210 + i*4} Q 300 ${230 + i*4}, 350 ${210 + i*4} T 450 ${210 + i*4} T 550 ${210 + i*4} T 650 ${210 + i*4} T 750 ${210 + i*4} T 850 ${210 + i*4} T 950 ${210 + i*4};
                          M 250 ${210 + i*4} Q 300 ${190 + i*4}, 350 ${210 + i*4} T 450 ${210 + i*4} T 550 ${210 + i*4} T 650 ${210 + i*4} T 750 ${210 + i*4} T 850 ${210 + i*4} T 950 ${210 + i*4}`}
                  dur="3s" repeatCount="indefinite"/>
              </path>
            ))}
          </g>
        )}

        {/* Particles */}
        {particles.map(p => {
          const focused = stage >= 2;
          const collected = stage >= 3;
          return (
            <circle key={p.id} r={p.size} fill={focused ? "#1E5BFF" : "rgba(255,255,255,0.7)"}>
              <animate attributeName="cx"
                from={-20}
                to={collected ? 1050 : 1420}
                dur={`${5 + (p.id % 3)}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"/>
              <animate attributeName="cy"
                values={focused
                  ? `${210 + p.yOff}; ${210 + p.yOff*0.6}; ${210}; ${210}; ${210}`
                  : `${210 + p.yOff}; ${210 + p.yOff + 5}; ${210 + p.yOff - 5}; ${210 + p.yOff}`}
                dur={focused ? "3s" : "2s"}
                repeatCount="indefinite"/>
            </circle>
          );
        })}

        {/* Collection probe */}
        {stage >= 3 && (
          <g>
            <rect x="1020" y="300" width="60" height="80" fill="rgba(30, 91, 255, 0.18)" stroke="#1E5BFF" strokeWidth="1.2"/>
            <line x1="1050" y1="380" x2="1050" y2="410" stroke="#1E5BFF" strokeWidth="1.2"/>
          </g>
        )}
      </svg>

      <div style={{
        position:"absolute", bottom:50, left:"50%", transform:"translateX(-50%)",
        display:"flex", gap:8
      }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: stage === i ? 24 : 6, height:6,
            background: stage === i ? "#1E5BFF" : "rgba(255,255,255,0.25)",
            transition:"all 0.4s",
            borderRadius: 3,
          }}/>
        ))}
      </div>
    </div>
  );
};

window.Counter = Counter;
window.Reveal = Reveal;
window.WaveViz = WaveViz;
