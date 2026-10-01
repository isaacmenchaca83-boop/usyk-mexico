import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'USYK México — Herramientas de Corte de Precisión'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          background: 'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(196,149,122,0.13) 0%, transparent 70%)',
        }} />

        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: '#C4957A',
          display: 'flex',
        }} />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* USYK wordmark */}
          <div style={{
            fontSize: 160,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-4px',
            lineHeight: 1,
            display: 'flex',
          }}>
            USYK
          </div>

          {/* MÉXICO */}
          <div style={{
            fontSize: 26,
            fontWeight: 400,
            color: '#C4957A',
            letterSpacing: '0.55em',
            marginTop: -8,
            display: 'flex',
          }}>
            MÉXICO
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: 48,
          height: 1,
          background: '#C4957A',
          marginTop: 32,
          marginBottom: 28,
          display: 'flex',
        }} />

        {/* Tagline */}
        <div style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.12em',
          display: 'flex',
        }}>
          Herramientas de Corte de Precisión
        </div>

        {/* Subtags */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginTop: 16,
        }}>
          {['Automotriz', 'Aeroespacial', 'Precisión'].map(tag => (
            <div key={tag} style={{
              fontSize: 11,
              color: 'rgba(196,149,122,0.55)',
              letterSpacing: '0.3em',
              fontWeight: 700,
              display: 'flex',
            }}>
              {tag.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div style={{
          position: 'absolute',
          bottom: 32,
          right: 48,
          fontSize: 13,
          color: 'rgba(255,255,255,0.15)',
          letterSpacing: '0.15em',
          display: 'flex',
        }}>
          usykmexico.com
        </div>
      </div>
    ),
    { ...size }
  )
}
