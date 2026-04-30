/* global React, Device */

// Premium hero device — large, centered, slight tilt, with shadow + spotlight
const HeroDeviceShot = () => (
  <svg viewBox="0 0 1400 700" style={{width:"100%",height:"auto",display:"block"}}>
    <defs>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E8EEF8"/>
        <stop offset="0.45" stopColor="#FFFFFF"/>
        <stop offset="0.55" stopColor="#FFFFFF"/>
        <stop offset="1" stopColor="#B0BACE"/>
      </linearGradient>
      <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3A4760"/>
        <stop offset="0.5" stopColor="#1A2540"/>
        <stop offset="1" stopColor="#0B0F19"/>
      </linearGradient>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4A9CFF"/>
        <stop offset="1" stopColor="#0066FF"/>
      </linearGradient>
      <radialGradient id="shadowGrad" cx="0.5" cy="0.5">
        <stop offset="0" stopColor="rgba(0,0,0,0.55)"/>
        <stop offset="1" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <linearGradient id="highlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="rgba(255,255,255,0.3)"/>
        <stop offset="0.5" stopColor="rgba(255,255,255,0)"/>
        <stop offset="1" stopColor="rgba(255,255,255,0.15)"/>
      </linearGradient>
    </defs>

    {/* Floor shadow */}
    <ellipse cx="700" cy="640" rx="500" ry="30" fill="url(#shadowGrad)"/>

    {/* End cap left */}
    <ellipse cx="240" cy="380" rx="38" ry="170" fill="url(#capGrad)"/>
    <ellipse cx="240" cy="380" rx="20" ry="100" fill="rgba(74,156,255,0.25)"/>

    {/* Main body — anodized cylindrical chamber */}
    <rect x="240" y="210" width="920" height="340" rx="26" fill="url(#bodyGrad)" stroke="rgba(0,0,0,0.06)" strokeWidth="1"/>
    <rect x="240" y="210" width="920" height="340" rx="26" fill="url(#highlight)" opacity="0.6"/>

    {/* Side seam shadows */}
    <rect x="240" y="210" width="14" height="340" fill="rgba(0,0,0,0.05)"/>
    <rect x="1146" y="210" width="14" height="340" fill="rgba(0,0,0,0.05)"/>

    {/* Top transducer ring strip */}
    <rect x="320" y="190" width="760" height="30" rx="4" fill="#1A2540"/>
    {[420, 550, 680, 810, 940].map(x => (
      <g key={x}>
        <rect x={x-22} y="195" width="44" height="20" rx="2" fill="url(#ringGrad)" opacity="0.7"/>
        <circle cx={x} cy="205" r="3" fill="#4A9CFF">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${(x-420)/200}s`}/>
        </circle>
      </g>
    ))}

    {/* Status display panel */}
    <rect x="800" y="280" width="280" height="80" rx="10" fill="#0B0F19"/>
    <rect x="810" y="290" width="260" height="60" rx="6" fill="#050810" stroke="rgba(74,156,255,0.3)" strokeWidth="1"/>
    <text x="820" y="310" fontFamily="ui-monospace, monospace" fontSize="11" fill="#4A9CFF" letterSpacing="1">FLW-01 / ACTIVE</text>
    <text x="820" y="328" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(255,255,255,0.6)" letterSpacing="1">1.6 MHz · 120 m³/h</text>
    <text x="820" y="345" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(74,156,255,0.7)" letterSpacing="1">CAPTURE 92%</text>

    {/* Brand wordmark on body */}
    <text x="320" y="460" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#1D1D1F" letterSpacing="-0.5">flowsonic</text>
    <text x="320" y="480" fontFamily="ui-monospace, monospace" fontSize="10" fill="#86868B" letterSpacing="1.2">ULTRASONIC FILTRATION · MK.02</text>

    {/* End cap right */}
    <ellipse cx="1160" cy="380" rx="38" ry="170" fill="url(#capGrad)"/>
    <ellipse cx="1160" cy="380" rx="20" ry="100" fill="rgba(74,156,255,0.25)"/>

    {/* Inlet pipe (left) */}
    <rect x="40" y="350" width="200" height="60" rx="6" fill="#7A8499"/>
    <rect x="40" y="350" width="200" height="14" fill="rgba(255,255,255,0.2)"/>
    <rect x="220" y="335" width="22" height="90" fill="#3A4760"/>

    {/* Outlet pipe (right) */}
    <rect x="1160" y="350" width="200" height="60" rx="6" fill="#7A8499"/>
    <rect x="1160" y="350" width="200" height="14" fill="rgba(255,255,255,0.2)"/>
    <rect x="1158" y="335" width="22" height="90" fill="#3A4760"/>

    {/* Particle stream visualization (animated) */}
    {Array.from({length: 8}, (_, i) => (
      <circle key={i} r="2.5" cy={380 + (i%3 - 1) * 30} fill="#4A9CFF">
        <animate attributeName="cx" from="60" to="1340"
          dur={`${3 + (i % 3) * 0.5}s`}
          begin={`${i * 0.4}s`}
          repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;1;1;0"
          dur={`${3 + (i % 3) * 0.5}s`}
          begin={`${i * 0.4}s`}
          repeatCount="indefinite"/>
      </circle>
    ))}

    {/* Collection probe (bottom, subtle) */}
    <rect x="660" y="550" width="80" height="70" rx="4" fill="#3A4760"/>
    <rect x="675" y="620" width="50" height="20" rx="2" fill="#1A2540"/>

    {/* Subtle reflection on top */}
    <rect x="240" y="210" width="920" height="60" rx="26" fill="rgba(255,255,255,0.4)"/>
  </svg>
);

window.HeroDeviceShot = HeroDeviceShot;
