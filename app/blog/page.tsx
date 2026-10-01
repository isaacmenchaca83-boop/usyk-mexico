import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — Herramientas de Corte y Manufactura en México',
  description: 'Artículos especializados sobre herramientas de corte, maquinado de precisión, industria automotriz y aeroespacial en México. Conocimiento técnico de USYK México.',
  alternates: {
    canonical: 'https://usykmexico.com/blog',
  },
  openGraph: {
    title: 'Blog USYK México — Herramientas de Corte y Manufactura',
    description: 'Artículos especializados sobre maquinado de precisión, industria automotriz y aeroespacial en México.',
    url: 'https://usykmexico.com/blog',
  },
}

const categoryColors: Record<string, string> = {
  'Automotriz': 'text-[#C4957A] border-[#C4957A]/30 bg-[#C4957A]/10',
  'Aeroespacial': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Calidad': 'text-green-400 border-green-400/30 bg-green-400/10',
  'Industria': 'text-white/60 border-white/20 bg-white/5',
  'Tecnología': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-[#111111] text-white" style={{ fontFamily: 'var(--font-barlow), system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#111111]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-[0.14em] text-white">
            USYK <span className="text-[#C4957A]">MX</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <Link href="/#soluciones" className="hover:text-white transition-colors duration-200">Soluciones</Link>
            <Link href="/#contacto" className="hover:text-white transition-colors duration-200">Contacto</Link>
            <Link href="/blog" className="text-white">Blog</Link>
          </div>
          <Link href="/#contacto" className="px-5 py-2 bg-[#C4957A] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4A890] transition-colors duration-200">
            Cotizar
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-8 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-[#C4957A]" />
            <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Recursos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Blog de Herramientas de Corte: Automotriz y Aeroespacial</h1>
          <p className="text-white/40 text-base max-w-xl">
            Conocimiento técnico sobre herramientas de corte, maquinado de precisión e industria manufacturera en México.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-16 px-6 md:px-8 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-10 items-center hover:opacity-90 transition-opacity">
            <div className="bg-[#1A1A1A] border border-white/[0.06] h-72 md:h-80 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,149,122,0.12) 0%, transparent 65%)' }} />
              <span className={`px-3 py-1 border text-[10px] font-bold tracking-widest uppercase rounded-full relative z-10 ${categoryColors[featured.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
                {featured.category}
              </span>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 border text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 ${categoryColors[featured.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
                Destacado · {featured.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#C4957A] transition-colors duration-300 leading-tight">
                {featured.title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-white/25 font-medium">
                <span>{formatDate(featured.date)}</span>
                <span>·</span>
                <span>{featured.readTime} min de lectura</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All posts grid */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#111111] p-8 hover:bg-[#161616] transition-colors duration-300"
              >
                <span className={`inline-block px-2.5 py-0.5 border text-[9px] font-bold tracking-widest uppercase rounded-full mb-4 ${categoryColors[post.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
                  {post.category}
                </span>
                <h3 className="text-base font-black text-white mb-3 group-hover:text-[#C4957A] transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[10px] text-white/20 font-medium">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-8 border-t border-white/[0.06] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">¿Necesitas asesoría técnica?</h2>
            <p className="text-white/35 text-sm">Nuestros especialistas están listos para ayudarte.</p>
          </div>
          <Link href="/#contacto" className="flex-shrink-0 px-8 py-3.5 bg-[#C4957A] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4A890] transition-colors duration-200">
            Contactar Ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-8 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-[0.14em] text-white">
            USYK <span className="text-[#C4957A]">MX</span>
          </Link>
          <p className="text-white/15 text-xs">© 2026 USYK México. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
