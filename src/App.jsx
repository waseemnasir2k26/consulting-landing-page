import { useState, useEffect, useRef } from 'react'
import EmailModal from './components/EmailModal'
import HeroGraphic from './components/HeroGraphic'
import ProcessGraphic from './components/ProcessGraphic'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleDownloadSuccess = ({ name, email }) => {
    // Generate and download the PDF questionnaire
    generatePDF(name)
    setTimeout(() => setModalOpen(false), 3000)
  }

  const generatePDF = (name) => {
    // Create a professional questionnaire as downloadable HTML→print
    const content = buildQuestionnaireHTML(name)
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Apex-Strategic-Assessment-Questionnaire.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      {/* ========== NAVBAR ========== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-navy-950/90 backdrop-blur-xl border-b border-white/5'
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b8922e, #d4a853)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">APEX</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Process', 'About', 'Testimonials'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-gold-400 transition-colors text-sm font-medium no-underline">
                {item}
              </a>
            ))}
            <button className="btn-gold text-sm !py-2.5 !px-6" onClick={() => setModalOpen(true)}>
              Free Assessment
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setModalOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="mesh-gradient"/>
        <div className="grid-pattern"/>

        {/* Floating shapes */}
        <div className="absolute top-32 left-10 w-20 h-20 border border-gold-500/10 rounded-full"
          style={{ animation: 'float 8s ease-in-out infinite' }}/>
        <div className="absolute bottom-32 right-16 w-32 h-32 border border-gold-500/5 rounded-full"
          style={{ animation: 'floatSlow 10s ease-in-out infinite' }}/>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-gold-500/30"
          style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}/>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
                style={{ background: 'rgba(212, 168, 83, 0.1)', color: '#d4a853', border: '1px solid rgba(212, 168, 83, 0.2)' }}>
                Strategic Consulting
              </span>
            </div>

            <h1 className="animate-slide-up-d1 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Transform Your Business Into a{' '}
              <span className="text-gold-gradient">Growth Machine</span>
            </h1>

            <p className="animate-slide-up-d2 text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              We help ambitious founders and executives unlock their next level of growth through battle-tested strategies and hands-on execution support.
            </p>

            <div className="animate-slide-up-d3 flex flex-wrap gap-4">
              <button className="btn-gold text-lg" onClick={() => setModalOpen(true)}>
                Get Free Assessment
              </button>
              <a href="#services" className="btn-outline text-lg no-underline">
                Our Services
              </a>
            </div>

            {/* Trust indicators */}
            <div className="animate-slide-up-d3 mt-10 flex items-center gap-8 flex-wrap">
              {[
                { num: '200+', label: 'Clients Served' },
                { num: '$50M+', label: 'Revenue Generated' },
                { num: '96%', label: 'Client Retention' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-gold-gradient">{num}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Graphic */}
          <div className="hidden lg:flex justify-center animate-slide-up-d2">
            <HeroGraphic />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-slate-600 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-gold-500" style={{ animation: 'floatSlow 2s ease-in-out infinite' }}/>
          </div>
        </div>
      </section>

      {/* ========== PAIN POINTS ========== */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #020617 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">The Challenge</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Sound Familiar?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Most businesses hit these walls between $1M and $10M. You're not alone — and there's a proven way through.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Growth Has Stalled',
                desc: "You've tried everything but revenue has plateaued. The strategies that got you here won't get you there."
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Bleeding Cash',
                desc: "Revenue is good but margins are thin. You're working harder for less profit and can't figure out the leak."
              },
              {
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Team Chaos',
                desc: "Great people but no alignment. Everyone's busy but nothing moves the needle. Meetings multiply, results don't."
              },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <div className="glass-card rounded-xl p-8">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon}/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-24 relative" style={{ background: 'var(--color-navy-950)' }}>
        <div className="grid-pattern"/>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Services That <span className="text-gold-gradient">Drive Results</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every engagement is custom-built around your specific challenges, market, and goals. No cookie-cutter frameworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'Growth Strategy',
                desc: 'Market analysis, competitive positioning, and a clear roadmap to double your revenue within 18 months.',
                tags: ['Market Analysis', 'Revenue Modeling', 'Go-to-Market']
              },
              {
                icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                title: 'Operations Optimization',
                desc: 'Streamline workflows, eliminate waste, and build systems that scale without breaking your team.',
                tags: ['Process Design', 'Automation', 'KPI Frameworks']
              },
              {
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Leadership & Team Development',
                desc: 'Build a leadership team that executes without you. Culture design, hiring frameworks, and performance systems.',
                tags: ['Executive Coaching', 'Team Building', 'Culture Design']
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Financial Strategy',
                desc: 'Profit-first planning, pricing optimization, and financial models that give you clarity and confidence.',
                tags: ['Pricing Strategy', 'P&L Optimization', 'Cash Flow']
              },
            ].map((service, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="glass-card rounded-xl p-8 h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid rgba(212, 168, 83, 0.2)' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={service.icon}/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm mb-4">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(212, 168, 83, 0.08)', color: '#d4a853', border: '1px solid rgba(212, 168, 83, 0.15)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section id="process" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #020617 0%, #0a1628 50%, #020617 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              A Proven Path to <span className="text-gold-gradient">Transformation</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our four-phase methodology has driven $50M+ in client growth. Here's exactly how we do it.
            </p>
          </div>

          <ProcessGraphic />
        </div>
      </section>

      {/* ========== GATED DOWNLOAD CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="mesh-gradient"/>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-10 md:p-14 text-center reveal"
            style={{ border: '1px solid rgba(212, 168, 83, 0.15)' }}>
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l rounded-tl-2xl" style={{ borderColor: 'rgba(212, 168, 83, 0.3)' }}/>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r rounded-br-2xl" style={{ borderColor: 'rgba(212, 168, 83, 0.3)' }}/>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.15), rgba(212, 168, 83, 0.05))', border: '1px solid rgba(212, 168, 83, 0.2)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Free Strategic Assessment <span className="text-gold-gradient">Questionnaire</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              The same diagnostic tool we use in our $50K+ engagements. 15 questions that will reveal exactly where your business is leaving money on the table.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
              {['15 Strategic Questions', 'Self-Scoring System', 'Action Item Generator', 'Used by 200+ CEOs'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            <button className="btn-gold text-lg px-10" onClick={() => setModalOpen(true)}>
              Download Free Questionnaire
            </button>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #020617 0%, #0a1628 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Client Results</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Trusted by Industry <span className="text-gold-gradient">Leaders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Apex helped us identify a $2M revenue opportunity we were completely blind to. Within 6 months, we'd captured 70% of it.",
                name: 'Sarah Chen',
                role: 'CEO, TechVenture Inc.',
                stars: 5
              },
              {
                quote: "The strategic assessment questionnaire alone was worth 10x what we paid. It changed how our entire leadership team thinks about growth.",
                name: 'Marcus Williams',
                role: 'Founder, ScaleUp Partners',
                stars: 5
              },
              {
                quote: "We went from $3M to $8M in 18 months. The frameworks they gave us are now baked into every decision we make.",
                name: 'Elena Rodriguez',
                role: 'COO, GrowthPath Solutions',
                stars: 5
              },
            ].map((t, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <div className="glass-card rounded-xl p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="#d4a853" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-300 leading-relaxed mb-6 flex-grow text-sm italic">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #b8922e, #d4a853)', color: '#020617' }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 relative" style={{ background: 'var(--color-navy-950)' }}>
        <div className="grid-pattern"/>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              {/* About graphic - abstract portrait frame */}
              <div className="relative max-w-md mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, #0f1d32, #162340)' }}>
                  {/* Decorative elements */}
                  <div className="absolute inset-4 border border-gold-500/10 rounded-xl"/>
                  <div className="absolute inset-8 border border-gold-500/5 rounded-lg"/>

                  {/* Abstract consultant figure */}
                  <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full" fill="none">
                    <circle cx="150" cy="110" r="45" stroke="#d4a853" strokeWidth="1" opacity="0.4"/>
                    <path d="M80 250 Q80 180 150 170 Q220 180 220 250" stroke="#d4a853" strokeWidth="1" opacity="0.3" fill="none"/>
                    <circle cx="150" cy="110" r="30" fill="rgba(212, 168, 83, 0.08)"/>
                    <rect x="125" y="160" width="50" height="60" rx="8" fill="rgba(212, 168, 83, 0.05)" stroke="#d4a853" strokeWidth="0.5" opacity="0.4"/>
                    {/* Experience badges */}
                    <rect x="30" y="80" width="60" height="28" rx="6" fill="rgba(212, 168, 83, 0.1)" stroke="#d4a853" strokeWidth="0.5" opacity="0.5"/>
                    <text x="60" y="98" fill="#d4a853" fontSize="10" textAnchor="middle" opacity="0.7">15+ YRS</text>
                    <rect x="210" y="80" width="60" height="28" rx="6" fill="rgba(212, 168, 83, 0.1)" stroke="#d4a853" strokeWidth="0.5" opacity="0.5"/>
                    <text x="240" y="98" fill="#d4a853" fontSize="10" textAnchor="middle" opacity="0.7">200+ CO</text>
                  </svg>
                </div>

                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-1/3 h-1/3 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: '#d4a853' }}/>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                15 Years of Turning Ambition Into <span className="text-gold-gradient">Achievement</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Apex Consulting was founded on a simple belief: every business has untapped potential waiting to be unlocked. Our team of former Fortune 500 executives and startup operators bring real-world experience to every engagement.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                We don't just advise — we embed. Our consultants work alongside your team, building capabilities that last long after our engagement ends.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '15+', label: 'Years Experience' },
                  { num: '200+', label: 'Companies Transformed' },
                  { num: '$50M+', label: 'Revenue Generated' },
                  { num: '96%', label: 'Client Retention Rate' },
                ].map(({ num, label }) => (
                  <div key={label} className="glass-card rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gold-gradient">{num}</div>
                    <div className="text-slate-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f1d32 0%, #020617 50%, #162340 100%)' }}/>
        <div className="mesh-gradient"/>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            Ready to Build Something <span className="text-gold-gradient">Extraordinary</span>?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Start with our free strategic assessment. In 15 minutes, you'll have more clarity about your business than most consultants deliver in a month.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-gold text-lg" onClick={() => setModalOpen(true)}>
              Get Your Free Assessment
            </button>
            <a href="mailto:hello@apexconsulting.com" className="btn-outline text-lg no-underline">
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'var(--color-navy-950)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b8922e, #d4a853)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">APEX CONSULTING</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                Strategic consulting for ambitious businesses ready to unlock their next level of growth.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Services', 'Process', 'About', 'Testimonials'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                    className="text-slate-500 hover:text-gold-400 transition-colors text-sm no-underline">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-500">
                <span>hello@apexconsulting.com</span>
                <span>+1 (555) 000-0000</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-wrap justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-slate-600 text-xs">&copy; 2026 Apex Consulting. All rights reserved.</p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <a key={item} href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors no-underline">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ========== EMAIL MODAL ========== */}
      <EmailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleDownloadSuccess}
      />
    </div>
  )
}

// ============================
// PDF QUESTIONNAIRE GENERATOR
// ============================
function buildQuestionnaireHTML(name) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Apex Strategic Assessment Questionnaire</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1e293b; background: #fff; }
  .page { max-width: 800px; margin: 0 auto; padding: 60px 50px; }

  /* Header */
  .header { text-align: center; padding-bottom: 40px; border-bottom: 2px solid #d4a853; margin-bottom: 40px; }
  .logo { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 28px; color: #020617; letter-spacing: 3px; margin-bottom: 8px; }
  .logo-accent { color: #d4a853; }
  .subtitle { font-family: 'Playfair Display', serif; font-size: 22px; color: #334155; margin-top: 16px; }
  .meta { color: #94a3b8; font-size: 13px; margin-top: 12px; }

  /* Intro */
  .intro { background: #f8fafc; border-left: 4px solid #d4a853; padding: 20px 24px; margin-bottom: 40px; border-radius: 0 8px 8px 0; }
  .intro p { color: #475569; font-size: 14px; line-height: 1.7; }

  /* Sections */
  .section { margin-bottom: 36px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #020617; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 12px; }
  .section-num { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #d4a853; color: #fff; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; border-radius: 50%; }

  /* Questions */
  .question { margin-bottom: 24px; page-break-inside: avoid; }
  .q-label { font-weight: 600; font-size: 14px; color: #1e293b; margin-bottom: 8px; display: flex; gap: 8px; }
  .q-num { color: #d4a853; font-weight: 700; min-width: 24px; }
  .q-hint { color: #94a3b8; font-size: 12px; font-style: italic; margin-bottom: 8px; padding-left: 32px; }
  .answer-box { border: 1px solid #e2e8f0; border-radius: 6px; min-height: 60px; padding: 12px; margin-left: 32px; background: #fafafa; }
  .answer-box.tall { min-height: 100px; }

  /* Score */
  .score-section { background: linear-gradient(135deg, #020617, #0f1d32); color: #fff; padding: 30px; border-radius: 12px; margin-top: 40px; }
  .score-title { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 16px; color: #d4a853; }
  .score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .score-item { background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; border: 1px solid rgba(212,168,83,0.2); }
  .score-item label { font-size: 13px; color: #94a3b8; display: block; margin-bottom: 4px; }
  .score-item .score-val { font-size: 24px; font-weight: 700; color: #d4a853; }

  /* Footer */
  .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px; }

  @media print {
    .page { padding: 40px 30px; }
    .score-section { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo">APEX<span class="logo-accent"> CONSULTING</span></div>
    <div class="subtitle">Strategic Business Assessment Questionnaire</div>
    <div class="meta">Prepared for: ${name || 'Business Leader'} &bull; ${date}</div>
  </div>

  <div class="intro">
    <p><strong>Instructions:</strong> Answer each question honestly and thoroughly. This assessment is designed to reveal your business's greatest opportunities for growth. Score yourself 1-5 on each section, then total your score at the end. Your responses will form the foundation of your strategic roadmap.</p>
  </div>

  <div class="section">
    <div class="section-title"><span class="section-num">1</span> Vision & Strategy</div>
    <div class="question">
      <div class="q-label"><span class="q-num">1.</span> What is your 3-year revenue target, and what specific milestones must you hit each year?</div>
      <div class="q-hint">Be specific with numbers. If you don't have clear targets, that's a finding in itself.</div>
      <div class="answer-box tall"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">2.</span> What is your unique competitive advantage that competitors cannot easily replicate?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">3.</span> If you could only focus on ONE initiative this quarter, what would move the needle most?</div>
      <div class="answer-box"></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="section-num">2</span> Revenue & Growth</div>
    <div class="question">
      <div class="q-label"><span class="q-num">4.</span> What are your top 3 revenue streams, and what percentage does each contribute?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">5.</span> What is your Customer Acquisition Cost (CAC) and Lifetime Value (LTV)? What's the ratio?</div>
      <div class="q-hint">If you don't know these numbers, write "Unknown" — this is critical.</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">6.</span> Where are you losing deals in your sales pipeline, and why?</div>
      <div class="answer-box tall"></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="section-num">3</span> Operations & Efficiency</div>
    <div class="question">
      <div class="q-label"><span class="q-num">7.</span> What is the single biggest bottleneck preventing you from scaling right now?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">8.</span> Which processes in your business still depend on a single person (including you)?</div>
      <div class="answer-box tall"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">9.</span> What are your top 3 operational costs, and which could be reduced by 20%+ without impact?</div>
      <div class="answer-box"></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="section-num">4</span> Team & Leadership</div>
    <div class="question">
      <div class="q-label"><span class="q-num">10.</span> Could your business run profitably for 30 days without you? Why or why not?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">11.</span> What key role, if filled tomorrow, would have the biggest impact on growth?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">12.</span> How do you currently measure and reward team performance?</div>
      <div class="answer-box"></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="section-num">5</span> Financial Health</div>
    <div class="question">
      <div class="q-label"><span class="q-num">13.</span> What is your current profit margin, and what would it need to be to fund your growth goals?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">14.</span> How many months of runway / cash reserves do you have if revenue stopped today?</div>
      <div class="answer-box"></div>
    </div>
    <div class="question">
      <div class="q-label"><span class="q-num">15.</span> What financial blind spots keep you up at night?</div>
      <div class="q-hint">Be honest. This is where the real breakthroughs happen.</div>
      <div class="answer-box tall"></div>
    </div>
  </div>

  <div class="score-section">
    <div class="score-title">Self-Assessment Score Card</div>
    <p style="color: #94a3b8; font-size: 13px; margin-bottom: 16px;">Rate each area 1-5 (1 = Critical Gap, 5 = Best-in-Class)</p>
    <div class="score-grid">
      <div class="score-item"><label>Vision & Strategy</label><div class="score-val">__ / 5</div></div>
      <div class="score-item"><label>Revenue & Growth</label><div class="score-val">__ / 5</div></div>
      <div class="score-item"><label>Operations & Efficiency</label><div class="score-val">__ / 5</div></div>
      <div class="score-item"><label>Team & Leadership</label><div class="score-val">__ / 5</div></div>
      <div class="score-item"><label>Financial Health</label><div class="score-val">__ / 5</div></div>
      <div class="score-item" style="border-color: #d4a853;"><label>TOTAL SCORE</label><div class="score-val">__ / 25</div></div>
    </div>
    <div style="margin-top: 16px; font-size: 12px; color: #94a3b8;">
      <strong style="color: #d4a853;">20-25:</strong> Growth-ready — you need execution support<br>
      <strong style="color: #d4a853;">13-19:</strong> Foundation gaps — strategic intervention needed<br>
      <strong style="color: #d4a853;">Below 13:</strong> Critical — immediate diagnostic recommended
    </div>
  </div>

  <div class="footer">
    <p><strong>APEX CONSULTING</strong> &bull; hello@apexconsulting.com &bull; www.apexconsulting.com</p>
    <p style="margin-top: 8px;">To discuss your results, book a complimentary strategy call at your convenience.</p>
    <p style="margin-top: 8px; color: #cbd5e1;">&copy; 2026 Apex Consulting. All rights reserved. This document is confidential.</p>
  </div>
</div>
</body>
</html>`
}

export default App
