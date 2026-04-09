export default function ProcessGraphic() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Deep-dive into your business, market position, and growth blockers', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { num: '02', title: 'Strategy', desc: 'Custom roadmap with prioritized initiatives and clear KPIs', icon: 'M9 19V6l12-3v13M9 19c0 1.1-1.343 2-3 2s-3-.9-3-2 1.343-2 3-2 3 .9 3 2zm12-3c0 1.1-1.343 2-3 2s-3-.9-3-2 1.343-2 3-2 3 .9 3 2z' },
    { num: '03', title: 'Execution', desc: 'Hands-on implementation support with weekly check-ins', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { num: '04', title: 'Growth', desc: 'Measure results, optimize, and scale what works', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {steps.map((step, i) => (
        <div key={i} className={`reveal reveal-delay-${i + 1}`}>
          <div className="glass-card rounded-xl p-6 h-full relative group">
            {/* Step number */}
            <div className="text-gold-gradient text-5xl font-bold opacity-20 absolute top-4 right-4" style={{ fontFamily: 'var(--font-serif)' }}>
              {step.num}
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid rgba(212, 168, 83, 0.2)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={step.icon}/>
              </svg>
            </div>

            {/* Content */}
            <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>

            {/* Connector line (not on last) */}
            {i < 3 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px" style={{ background: 'linear-gradient(to right, rgba(212,168,83,0.4), rgba(212,168,83,0.1))' }}/>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
