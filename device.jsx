/* global React */

// Stylized line-drawing of the FlowSonic cylindrical filtration unit.
// Used as a placeholder until real product photography drops in.
const Device = ({ stroke = "currentColor", glow = false, variant = "hero" }) => {
  const id = React.useId();
  return (
    <svg viewBox="0 0 1200 800" className="hero-device-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E5BFF" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#1E5BFF" stopOpacity="0"/>
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.5" cy="0.5">
          <stop offset="0" stopColor="#4A7BFF" stopOpacity="0.55"/>
          <stop offset="1" stopColor="#4A7BFF" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Soft glow halo behind device */}
      {glow && (
        <ellipse cx="600" cy="400" rx="500" ry="280" fill={`url(#glow-${id})`}/>
      )}

      {/* Inlet pipe (left) */}
      <g stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.85">
        <rect x="40" y="370" width="220" height="60" rx="6"/>
        <line x1="40" y1="385" x2="260" y2="385"/>
        <line x1="40" y1="415" x2="260" y2="415"/>
        {/* flange */}
        <rect x="240" y="350" width="22" height="100" rx="2"/>
      </g>

      {/* Main body — cylindrical chamber */}
      <g stroke={stroke} strokeWidth="1.4" fill="none">
        <rect x="280" y="240" width="640" height="320" rx="40" />
        {/* End caps */}
        <ellipse cx="280" cy="400" rx="22" ry="160"/>
        <ellipse cx="920" cy="400" rx="22" ry="160"/>
        {/* Side seams */}
        <line x1="320" y1="240" x2="320" y2="560" opacity="0.5"/>
        <line x1="880" y1="240" x2="880" y2="560" opacity="0.5"/>
      </g>

      {/* Transducer rings (top) */}
      <g stroke={stroke} strokeWidth="1.4" fill="none">
        <rect x="380" y="180" width="80" height="80" rx="6"/>
        <rect x="500" y="180" width="80" height="80" rx="6"/>
        <rect x="620" y="180" width="80" height="80" rx="6"/>
        <rect x="740" y="180" width="80" height="80" rx="6"/>
        <line x1="420" y1="180" x2="420" y2="170" />
        <line x1="540" y1="180" x2="540" y2="170" />
        <line x1="660" y1="180" x2="660" y2="170" />
        <line x1="780" y1="180" x2="780" y2="170" />
        {/* labels */}
        <text x="420" y="225" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={stroke} opacity="0.7">T1</text>
        <text x="540" y="225" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={stroke} opacity="0.7">T2</text>
        <text x="660" y="225" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={stroke} opacity="0.7">T3</text>
        <text x="780" y="225" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={stroke} opacity="0.7">T4</text>
      </g>

      {/* Standing wave pattern inside chamber */}
      <g stroke="#4A7BFF" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M 320 400 Q 380 340, 440 400 T 560 400 T 680 400 T 800 400 T 880 400">
          <animate attributeName="d"
            values="M 320 400 Q 380 340, 440 400 T 560 400 T 680 400 T 800 400 T 880 400;
                    M 320 400 Q 380 460, 440 400 T 560 400 T 680 400 T 800 400 T 880 400;
                    M 320 400 Q 380 340, 440 400 T 560 400 T 680 400 T 800 400 T 880 400"
            dur="4s" repeatCount="indefinite"/>
        </path>
        <path d="M 320 380 Q 380 320, 440 380 T 560 380 T 680 380 T 800 380 T 880 380" opacity="0.4"/>
        <path d="M 320 420 Q 380 480, 440 420 T 560 420 T 680 420 T 800 420 T 880 420" opacity="0.4"/>
      </g>

      {/* Particles streaming through (animated) */}
      <g fill="#1E5BFF">
        {[0, 1, 2, 3, 4].map(i => (
          <circle key={i} r="3" cy="400">
            <animate attributeName="cx"
              from="40" to="1100"
              dur={`${3.5 + i * 0.4}s`}
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"/>
            <animate attributeName="cy"
              values="400; 395; 400; 405; 400"
              dur="2s"
              repeatCount="indefinite"/>
          </circle>
        ))}
        {[0, 1, 2].map(i => (
          <circle key={`s${i}`} r="2" cy="400" opacity="0.6">
            <animate attributeName="cx"
              from="40" to="1100"
              dur={`${4 + i * 0.5}s`}
              begin={`${0.4 + i * 0.9}s`}
              repeatCount="indefinite"/>
            <animate attributeName="cy"
              values="400; 410; 400; 390; 400"
              dur="1.7s"
              repeatCount="indefinite"/>
          </circle>
        ))}
      </g>

      {/* Outlet pipe (right) */}
      <g stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.85">
        <rect x="940" y="370" width="220" height="60" rx="6"/>
        <line x1="940" y1="385" x2="1160" y2="385"/>
        <line x1="940" y1="415" x2="1160" y2="415"/>
        <rect x="938" y="350" width="22" height="100" rx="2"/>
      </g>

      {/* Collection probe (bottom) */}
      <g stroke={stroke} strokeWidth="1.4" fill="none">
        <rect x="560" y="560" width="80" height="160" rx="4"/>
        <line x1="580" y1="720" x2="580" y2="740"/>
        <line x1="620" y1="720" x2="620" y2="740"/>
        <text x="600" y="780" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={stroke} opacity="0.7">COLLECT</text>
      </g>

      {/* Tech callouts */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill={stroke} opacity="0.55" letterSpacing="1.4">
        <line x1="150" y1="370" x2="150" y2="320" stroke={stroke} strokeWidth="0.8"/>
        <text x="150" y="312" textAnchor="middle">INLET / 2.5 BAR</text>

        <line x1="600" y1="180" x2="600" y2="120" stroke={stroke} strokeWidth="0.8"/>
        <text x="600" y="112" textAnchor="middle">PIEZO ARRAY · 1.6 MHZ</text>

        <line x1="1050" y1="430" x2="1050" y2="490" stroke={stroke} strokeWidth="0.8"/>
        <text x="1050" y="510" textAnchor="middle">CLEAN OUT</text>

        <line x1="600" y1="720" x2="600" y2="720" stroke={stroke} strokeWidth="0.8"/>
      </g>

      {/* Crosshair frame markers */}
      <g stroke={stroke} strokeWidth="1" opacity="0.4" fill="none">
        <line x1="20" y1="40" x2="60" y2="40"/>
        <line x1="40" y1="20" x2="40" y2="60"/>
        <line x1="1140" y1="40" x2="1180" y2="40"/>
        <line x1="1160" y1="20" x2="1160" y2="60"/>
      </g>
    </svg>
  );
};

window.Device = Device;
