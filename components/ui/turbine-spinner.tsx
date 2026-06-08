'use client'

export function TurbineSpinner({ size = 520 }: { size?: number }) {
  return (
    <>
      <style>{`
        @keyframes spinTurbine {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes lightSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .turbine-spin  { animation: spinTurbine  8s linear infinite; }
        .counter-spin  { animation: counterSpin  8s linear infinite; }
        .light-spin    { animation: lightSpin    8s linear infinite; }
        .pulse-glow    { animation: pulseGlow    3s ease-in-out infinite; }
      `}</style>

      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>

        {/* Glow background */}
        <div className="pulse-glow" style={{
          position: 'absolute',
          inset: -60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,149,122,0.18) 0%, transparent 70%)',
        }} />

        {/* Spinning turbine image */}
        <div className="turbine-spin" style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%', overflow: 'hidden',
        }}>
          <img
            src="/images/pexels-joerg-mangelsen-337913024-33917387.jpg"
            alt="Turbina aeroespacial"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>

        {/* Blade shadow overlay — counter-spins to stay static */}
        <div className="counter-spin" style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(0,0,0,0) 0deg, rgba(0,0,0,0.28) 12deg, rgba(0,0,0,0) 24deg, rgba(0,0,0,0.28) 36deg, rgba(0,0,0,0) 48deg, rgba(0,0,0,0.28) 60deg, rgba(0,0,0,0) 72deg, rgba(0,0,0,0.28) 84deg, rgba(0,0,0,0) 96deg, rgba(0,0,0,0.28) 108deg, rgba(0,0,0,0) 120deg, rgba(0,0,0,0.28) 132deg, rgba(0,0,0,0) 144deg, rgba(0,0,0,0.28) 156deg, rgba(0,0,0,0) 168deg, rgba(0,0,0,0.28) 180deg, rgba(0,0,0,0) 192deg, rgba(0,0,0,0.28) 204deg, rgba(0,0,0,0) 216deg, rgba(0,0,0,0.28) 228deg, rgba(0,0,0,0) 240deg, rgba(0,0,0,0.28) 252deg, rgba(0,0,0,0) 264deg, rgba(0,0,0,0.28) 276deg, rgba(0,0,0,0) 288deg, rgba(0,0,0,0.28) 300deg, rgba(0,0,0,0) 312deg, rgba(0,0,0,0.28) 324deg, rgba(0,0,0,0) 336deg, rgba(0,0,0,0.28) 348deg, rgba(0,0,0,0) 360deg)',
          pointerEvents: 'none', zIndex: 2, mixBlendMode: 'multiply',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* Light sweep */}
        <div className="light-spin" style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.04) 20deg, rgba(255,255,255,0.13) 35deg, rgba(255,255,255,0.04) 50deg, transparent 70deg, transparent 360deg)',
          pointerEvents: 'none', zIndex: 4,
        }} />

        {/* Ring */}
        <div style={{
          position: 'absolute', inset: -4, borderRadius: '50%',
          border: '2px solid rgba(196,149,122,0.25)',
          boxShadow: '0 0 40px rgba(196,149,122,0.15)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Outer ring */}
        <div style={{
          position: 'absolute', inset: -16, borderRadius: '50%',
          border: '1px solid rgba(196,149,122,0.10)',
          zIndex: 5, pointerEvents: 'none',
        }} />

      </div>
    </>
  )
}
