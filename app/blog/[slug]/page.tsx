import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost, getRelatedPosts } from '@/lib/blog-posts'

const siteUrl = 'https://usykmexico.com'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: 'USYK México', url: siteUrl }],
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['USYK México'],
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
  }
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

function parseInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80 font-bold">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#C4957A] underline underline-offset-2 hover:text-[#D4A890] transition-colors">$1</a>')
}

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-black text-white mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && line.includes(':')) {
      const text = line.replace(/\*\*/g, '')
      elements.push(
        <p key={i} className="text-white/80 font-bold text-sm mb-2">{text}</p>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace('- ', ''))
        i++
      }
      elements.push(
        <ul key={i} className="space-y-2 mb-6 ml-0">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-white/50 text-sm">
              <span className="text-[#C4957A] mt-1 flex-shrink-0">—</span>
              <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.startsWith('| ')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].includes('---')) {
          rows.push(lines[i].trim().split('|').filter(c => c.trim()).map(c => c.trim()))
        }
        i++
      }
      elements.push(
        <div key={i} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            {rows.map((row, ri) => (
              <tr key={ri} className={ri === 0 ? 'border-b border-[#C4957A]/30' : 'border-b border-white/[0.06]'}>
                {row.map((cell, ci) => (
                  ri === 0
                    ? <th key={ci} className="text-left py-3 pr-8 text-[10px] font-bold tracking-widest uppercase text-[#C4957A]">{cell}</th>
                    : <td key={ci} className="py-3 pr-8 text-white/50">{cell}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      )
      continue
    } else if (line.length > 0) {
      elements.push(
        <p key={i} className="text-white/50 text-sm leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      )
    }

    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    author: { '@type': 'Organization', name: 'USYK México', url: siteUrl, '@id': `${siteUrl}/#organization` },
    publisher: {
      '@type': 'Organization',
      name: 'USYK México',
      url: siteUrl,
      '@id': `${siteUrl}/#organization`,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
    mentions: [
      { '@type': 'Thing', name: 'USMCA' },
      { '@type': 'Place', name: 'México' },
      { '@type': 'Thing', name: 'Industria Automotriz Mexicana' },
      { '@type': 'Thing', name: 'Industria Aeroespacial Mexicana' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white" style={{ fontFamily: 'var(--font-barlow), system-ui, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title },
          ],
        }) }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#111111]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-[0.14em] text-white">
            USYK <span className="text-[#C4957A]">MX</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <Link href="/#soluciones" className="hover:text-white transition-colors duration-200">Soluciones</Link>
            <Link href="/#contacto" className="hover:text-white transition-colors duration-200">Contacto</Link>
            <Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
          </div>
          <Link href="/#contacto" className="px-5 py-2 bg-[#C4957A] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4A890] transition-colors duration-200">
            Cotizar
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/25 mb-8">
            <Link href="/blog" className="hover:text-white/50 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/40">{post.category}</span>
          </div>

          {/* Category + meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 border text-[10px] font-bold tracking-widest uppercase rounded-full ${categoryColors[post.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
              {post.category}
            </span>
            <span className="text-xs text-white/25">{formatDate(post.date)}</span>
            <span className="text-xs text-white/25">·</span>
            <span className="text-xs text-white/25">{post.readTime} min de lectura</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-white/50 text-base leading-relaxed mb-10 border-l-2 border-[#C4957A] pl-5">
            {post.excerpt}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-10" />

          {/* Content */}
          <div className="prose-usyk">
            {renderContent(post.content)}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mt-12 mb-10" />

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.keywords.map(kw => (
              <span key={kw} className="px-3 py-1 border border-white/[0.08] text-white/25 text-[10px] font-bold tracking-wide uppercase">
                {kw}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="border border-[#C4957A]/20 p-8 bg-[#C4957A]/5">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#C4957A] uppercase mb-3">¿Te fue útil este artículo?</p>
            <h3 className="text-xl font-black text-white mb-3">Habla con un especialista de USYK México</h3>
            <p className="text-white/40 text-sm mb-5">Nuestro equipo técnico puede asesorarte sobre las herramientas correctas para tu proceso productivo — sin costo.</p>
            <Link href="/#contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4957A] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4A890] transition-colors duration-200">
              Solicitar Asesoría
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 px-6 md:px-8 border-t border-white/[0.06] bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-6 bg-[#C4957A]" />
              <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Artículos Relacionados</span>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-[#0D0D0D] p-7 hover:bg-[#131313] transition-colors duration-300">
                  <span className={`inline-block px-2.5 py-0.5 border text-[9px] font-bold tracking-widest uppercase rounded-full mb-4 ${categoryColors[p.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
                    {p.category}
                  </span>
                  <h4 className="text-sm font-black text-white mb-2 group-hover:text-[#C4957A] transition-colors leading-snug">{p.title}</h4>
                  <p className="text-white/25 text-xs">{p.readTime} min · {formatDate(p.date)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
