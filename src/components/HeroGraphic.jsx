export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      {/* Background glow */}
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d68a"/>
          <stop offset="50%" stopColor="#d4a853"/>
          <stop offset="100%" stopColor="#b8922e"/>
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f"/>
          <stop offset="100%" stopColor="#0f1d32"/>
        </linearGradient>
      </defs>

      {/* Central glow */}
      <circle cx="250" cy="200" r="180" fill="url(#glow1)"/>

      {/* Outer ring */}
      <circle cx="250" cy="200" r="150" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      <circle cx="250" cy="200" r="120" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.2" fill="none"/>
      <circle cx="250" cy="200" r="90" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.15" fill="none"/>

      {/* Connecting lines - constellation pattern */}
      <line x1="170" y1="120" x2="250" y2="80" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="250" y1="80" x2="340" y2="110" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="340" y1="110" x2="370" y2="200" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="370" y1="200" x2="330" y2="290" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="330" y1="290" x2="250" y2="320" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="250" y1="320" x2="160" y2="280" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="160" y1="280" x2="130" y2="200" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="130" y1="200" x2="170" y2="120" stroke="#d4a853" strokeWidth="0.8" strokeOpacity="0.4"/>

      {/* Cross connections */}
      <line x1="170" y1="120" x2="330" y2="290" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.2"/>
      <line x1="340" y1="110" x2="160" y2="280" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.2"/>
      <line x1="250" y1="80" x2="250" y2="320" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.2"/>
      <line x1="130" y1="200" x2="370" y2="200" stroke="#d4a853" strokeWidth="0.5" strokeOpacity="0.2"/>

      {/* Node dots */}
      {[
        [250, 80], [170, 120], [340, 110],
        [370, 200], [330, 290], [250, 320],
        [160, 280], [130, 200]
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill="url(#blueGrad)" stroke="#d4a853" strokeWidth="1.5"/>
          <circle cx={cx} cy={cy} r="3" fill="#d4a853" opacity="0.8"/>
        </g>
      ))}

      {/* Central diamond */}
      <g transform="translate(250, 200)">
        <rect x="-30" y="-30" width="60" height="60" rx="8" fill="url(#blueGrad)" stroke="url(#goldGrad)" strokeWidth="2" transform="rotate(45)"/>
        {/* Chart bars inside diamond */}
        <rect x="-15" y="5" width="6" height="15" fill="#d4a853" opacity="0.8" rx="1"/>
        <rect x="-5" y="-5" width="6" height="25" fill="#d4a853" opacity="0.9" rx="1"/>
        <rect x="5" y="-15" width="6" height="35" fill="#d4a853" rx="1"/>
        {/* Arrow up */}
        <path d="M8 -20 L8 -28 M4 -24 L8 -28 L12 -24" stroke="#f0d68a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </g>

      {/* Floating elements with animation classes */}
      <g style={{ animation: 'float 6s ease-in-out infinite' }}>
        <rect x="80" y="70" width="24" height="24" rx="4" fill="none" stroke="#d4a853" strokeWidth="1" strokeOpacity="0.4" transform="rotate(15, 92, 82)"/>
      </g>
      <g style={{ animation: 'floatSlow 8s ease-in-out infinite' }}>
        <circle cx="400" cy="90" r="10" fill="none" stroke="#d4a853" strokeWidth="1" strokeOpacity="0.3"/>
      </g>
      <g style={{ animation: 'float 7s ease-in-out infinite 1s' }}>
        <polygon points="420,300 430,280 440,300" fill="none" stroke="#d4a853" strokeWidth="1" strokeOpacity="0.3"/>
      </g>
      <g style={{ animation: 'floatSlow 9s ease-in-out infinite 2s' }}>
        <rect x="60" y="300" width="16" height="16" rx="2" fill="none" stroke="#d4a853" strokeWidth="1" strokeOpacity="0.25"/>
      </g>

      {/* Data dots scattered */}
      {[
        [100, 150, 2], [400, 160, 1.5], [180, 350, 2],
        [350, 350, 1.5], [50, 250, 1], [450, 250, 1.5]
      ].map(([cx, cy, r], i) => (
        <circle key={`dot-${i}`} cx={cx} cy={cy} r={r} fill="#d4a853" opacity="0.3"
          style={{ animation: `pulse-glow 3s ease-in-out infinite ${i * 0.5}s` }}/>
      ))}
    </svg>
  )
}
