'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { TurbineSpinner } from "@/components/ui/turbine-spinner"

const SHOWCASE_IMAGES = [
  {
    src: "/images/pexels-joerg-mangelsen-337913024-16160818.jpg",
    alt: "Turbina aeroespacial de precisión",
    label: "Aeroespacial"
  },
  {
    src: "/images/pexels-iwan-wasyl-3786626-5625481.jpg",
    alt: "Rin automotriz de alta precisión",
    label: "Automotriz"
  },
  {
    src: "/images/pexels-joerg-mangelsen-337913024-25285744.jpg",
    alt: "Álabes de turbina — componentes críticos",
    label: "Componentes Críticos"
  },
  {
    src: "/images/pexels-joerg-mangelsen-337913024-33917387.jpg",
    alt: "Motor de turbina aeroespacial",
    label: "Motores"
  },
  {
    src: "/images/pexels-mecit-yssf-601309185-36095631.jpg",
    alt: "Turbina de alta ingeniería",
    label: "Ingeniería de Precisión"
  },
]

function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % SHOWCASE_IMAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={SHOWCASE_IMAGES[current].src}
            alt={SHOWCASE_IMAGES[current].alt}
            fill
            className="object-cover object-center"
            draggable={false}
            priority={current === 0}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-4 left-4 md:bottom-6 md:left-6"
          >
            <span className="px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/10 text-[#C4957A] text-[10px] font-bold tracking-[0.3em] uppercase rounded-full">
              {SHOWCASE_IMAGES[current].label}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 z-10">
        {SHOWCASE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-6 bg-[#C4957A]' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const IconDrill = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const IconDiamond = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
  </svg>
)

const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 1 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.41-1.41a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect width="7" height="7" x="14" y="10" rx="1" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="17.5" cy="17.5" r="1.5" />
  </svg>
)

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 800))
    setFormData({ email: '', phone: '', company: '', industry: '', message: '' })
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white" style={{ fontFamily: 'var(--font-barlow), system-ui, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'LocalBusiness',
              '@id': 'https://usykmexico.com/#organization',
              name: 'USYK México',
              description: 'Distribuidor líder de herramientas de corte de precisión para industria automotriz y aeroespacial en México.',
              url: 'https://usykmexico.com',
              telephone: '+526141975092',
              email: 'ventas@usykmexico.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Chihuahua',
                addressRegion: 'Chihuahua',
                addressCountry: 'MX',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '28.6353',
                longitude: '-106.0889',
              },
              openingHours: 'Mo-Fr 08:00-18:00',
              priceRange: '$$',
              areaServed: [
                { '@type': 'State', name: 'Chihuahua', containedInPlace: { '@type': 'Country', name: 'México' } },
                { '@type': 'State', name: 'Querétaro', containedInPlace: { '@type': 'Country', name: 'México' } },
                { '@type': 'State', name: 'Sonora', containedInPlace: { '@type': 'Country', name: 'México' } },
                { '@type': 'State', name: 'Nuevo León', containedInPlace: { '@type': 'Country', name: 'México' } },
                { '@type': 'Country', name: 'México' },
              ],
              sameAs: [
                'https://www.linkedin.com/in/jesus-chacon-95a435367/',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Herramientas de Corte de Precisión',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Brocas de Precisión' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Insertos PCD/PCBN' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Soluciones a Medida' } },
                ],
              },
            },
            {
              '@type': 'WebSite',
              '@id': 'https://usykmexico.com/#website',
              url: 'https://usykmexico.com',
              name: 'USYK México',
              inLanguage: 'es-MX',
              description: 'Herramientas de corte de precisión para industria automotriz y aeroespacial en México',
              publisher: { '@id': 'https://usykmexico.com/#organization' },
            },
          ],
        })}}
      />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#111111]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="text-lg font-black tracking-[0.14em] text-white">
            USYK <span className="text-[#C4957A]">MX</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <Link href="#soluciones" className="hover:text-white transition-colors duration-200 cursor-pointer">Soluciones</Link>
            <Link href="#contacto" className="hover:text-white transition-colors duration-200 cursor-pointer">Contacto</Link>
            <Link href="/blog" className="hover:text-white transition-colors duration-200 cursor-pointer">Blog</Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:block px-5 py-2 bg-[#C4957A] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4A890] transition-colors duration-200 cursor-pointer"
            >
              Cotizar
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Menú"
            >
              <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-translate-y-2.5 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 border-t border-white/[0.06]' : 'max-h-0'}`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            <Link href="#soluciones" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Soluciones</Link>
            <Link href="#contacto" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Contacto</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Blog</Link>
            <button
              onClick={() => { setMenuOpen(false); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="self-start px-5 py-2.5 bg-[#C4957A] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4A890] transition-colors duration-200 cursor-pointer"
            >
              Cotizar
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(196,149,122,0.10) 0%, transparent 65%)' }}
          />
        </div>

        {/* Dotted surface animation — z-[2] sits above bg div, below content (z-10) */}
        <DottedSurface className="z-[2]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center pt-16">
          <div className="inline-flex items-center gap-3 mb-10">
            <span className="h-px w-6 bg-[#C4957A]" />
            <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.45em] uppercase">Herramientas de Corte Industrial</span>
            <span className="h-px w-6 bg-[#C4957A]" />
          </div>

          <h1 className="font-black leading-[0.88] tracking-tight text-white mb-8" style={{ fontSize: 'clamp(72px, 14vw, 148px)' }}>
            USYK
            <br />
            <span className="text-[#C4957A]">MÉXICO</span>
          </h1>

          <p className="text-base md:text-lg text-white/60 mb-12 max-w-lg mx-auto leading-relaxed font-medium">
            Precisión extrema para la industria automotriz y aeroespacial.
            Herramientas certificadas <span className="text-white/85">AS9100</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 px-8 py-4 bg-[#C4957A] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4A890] transition-colors duration-200 cursor-pointer"
            >
              Solicitar Cotización
              <IconArrow />
            </button>
            <a
              href="tel:+526141975092"
              className="flex items-center gap-3 px-8 py-4 border border-white/15 text-white/60 font-medium text-sm hover:border-[#C4957A]/60 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <IconPhone />
              +52 (614) 197-5092
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold tracking-[0.4em] text-white/15 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/15 to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/[0.06] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { num: 'AS9100', label: 'Certificación' },
              { num: '500+', label: 'Clientes Activos' },
              { num: '3', label: 'Sectores Industriales' },
            ].map((stat, i) => (
              <div key={stat.num} className={`text-center py-6 px-4 ${i < 2 ? 'border-r border-white/[0.06]' : ''}`}>
                <div className="text-3xl md:text-4xl font-black text-[#C4957A] mb-1">{stat.num}</div>
                <div className="text-[10px] font-bold tracking-[0.25em] text-white/25 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLL ANIMATION SHOWCASE ── */}
      <section className="bg-[#111111] overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-[#C4957A]" />
                <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Tecnología de Punta</span>
                <span className="h-px w-6 bg-[#C4957A]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Herramientas que<br />
                <span className="text-[#C4957A]">Definen el Estándar</span>
              </h2>
              <p className="text-white/40 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                Precisión extrema para los procesos más exigentes de la manufactura industrial
              </p>
            </div>
          }
        >
          <ImageCarousel />
        </ContainerScroll>
      </section>

      {/* ── SOLUCIONES ── */}
      <section id="soluciones" className="relative py-28 bg-[#111111] overflow-hidden">
        <SpiralAnimation />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-[#C4957A]" />
              <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-lg">
              Soluciones<br />Especializadas
            </h2>
            <p className="text-white/50 text-sm mt-5 max-w-md leading-relaxed">
              Herramientas y servicios diseñados para maximizar productividad en operaciones críticas de manufactura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
            {[
              {
                icon: <IconDrill />,
                num: '01',
                title: 'Brocas de Precisión',
                desc: 'Herramientas de perforación de alta velocidad con tolerancias extremas para materiales difíciles de maquinar.',
                tags: ['Alta velocidad', 'Materiales duros', 'Larga vida útil']
              },
              {
                icon: <IconDiamond />,
                num: '02',
                title: 'Insertos Certificados',
                desc: 'Insertos PCD/PCBN con certificación AS9100 para aplicaciones críticas en automotriz y aeroespacial.',
                tags: ['PCD / PCBN', 'AS9100', 'Alta precisión']
              },
              {
                icon: <IconGear />,
                num: '03',
                title: 'Soluciones a Medida',
                desc: 'Herramientas diseñadas exactamente según las especificaciones técnicas de tu proceso productivo.',
                tags: ['Diseño personalizado', 'Soporte técnico', 'Optimización']
              }
            ].map((sol) => (
              <div key={sol.num} className="group bg-[#111111] p-8 md:p-10 hover:bg-[#161616] transition-colors duration-300 cursor-pointer">
                <div className="flex items-start justify-between mb-8">
                  <div className="text-[#C4957A]">{sol.icon}</div>
                  <span className="text-xs font-black text-white/[0.07] tracking-widest">{sol.num}</span>
                </div>
                <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#C4957A] transition-colors duration-300">
                  {sol.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{sol.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {sol.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-white/[0.08] text-white/25 text-[10px] font-bold tracking-widest uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ USYK ── */}
      <section className="py-28 bg-[#0D0D0D] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-[#C4957A]" />
                <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Diferenciadores</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-10">
                ¿Por qué elegir<br />
                <span className="text-[#C4957A]">USYK México?</span>
              </h2>
              <div className="space-y-5">
                {[
                  'Distribuidor autorizado con más de 20 años en el mercado mexicano',
                  'Certificación AS9100 para sectores automotriz y aeroespacial',
                  'Soporte técnico especializado en optimización de procesos de corte',
                  'Asesoría personalizada y entrega rápida sin costos adicionales',
                  'Herramientas de alto rendimiento a precios competitivos',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#C4957A]/10 border border-[#C4957A]/25 flex items-center justify-center text-[#C4957A]">
                      <IconCheck />
                    </div>
                    <span className="text-white/50 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <TurbineSpinner size={460} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-28 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-[#C4957A]" />
                <span className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase">Contáctanos</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Solicita tu<br />Cotización
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xs">
                Completa el formulario y nuestro equipo de especialistas te contactará con una solución personalizada.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <IconPhone />, label: 'Principal', value: '+52 (614) 197-5092' },
                  { icon: <IconPhone />, label: 'Ventas', value: '+52 (614) 245-6923' },
                  { icon: <IconPhone />, label: 'Comercial', value: '+52 (614) 229-0914' },
                  { icon: <IconMail />, label: 'Email', value: 'ventas@usykmexico.com' },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center text-[#C4957A] flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase">{contact.label}</div>
                      <div className="text-sm text-white/60 font-medium mt-0.5">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/[0.06] p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C4957A]/15 border border-[#C4957A]/30 flex items-center justify-center text-[#C4957A]">
                    <IconCheck />
                  </div>
                  <h3 className="text-xl font-black text-white">¡Solicitud enviada!</h3>
                  <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                    Nuestro equipo te contactará en menos de 24 horas hábiles con precios y disponibilidad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-white/30 hover:text-white/60 underline transition-colors cursor-pointer"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#C4957A] focus:outline-none transition-colors duration-200 placeholder-white/20"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#C4957A] focus:outline-none transition-colors duration-200 placeholder-white/20"
                      placeholder="+52 614 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase mb-2">Empresa *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#C4957A] focus:outline-none transition-colors duration-200 placeholder-white/20"
                      placeholder="Nombre de empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase mb-2">Industria *</label>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 bg-[#111111] border border-white/[0.08] text-white text-sm focus:border-[#C4957A] focus:outline-none transition-colors duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-[#111111]">Seleccionar</option>
                      <option value="automotriz" className="bg-[#111111]">Automotriz</option>
                      <option value="aeroespacial" className="bg-[#111111]">Aeroespacial</option>
                      <option value="medico" className="bg-[#111111]">Médico</option>
                      <option value="electronica" className="bg-[#111111]">Electrónica</option>
                      <option value="otra" className="bg-[#111111]">Otra</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/25 tracking-[0.3em] uppercase mb-2">Mensaje</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#C4957A] focus:outline-none transition-colors duration-200 placeholder-white/20 resize-none"
                    placeholder="Cuéntanos sobre tus necesidades..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C4957A] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4A890] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      Enviar Solicitud
                      <IconArrow />
                    </>
                  )}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG CTA ── */}
      <section className="py-16 border-y border-white/[0.06] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[#C4957A] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Recursos</div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Aprende sobre la Industria</h2>
            <p className="text-white/50 text-sm mt-2">Artículos y guías sobre herramientas de corte y optimización de procesos</p>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 flex items-center gap-3 px-7 py-3.5 border border-white/15 text-white/60 font-bold text-xs tracking-[0.2em] uppercase hover:border-[#C4957A]/60 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Ir al Blog
            <IconArrow />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-lg font-black tracking-[0.14em] text-white mb-4">
                USYK <span className="text-[#C4957A]">MX</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed">
                Herramientas de corte de precisión para la industria automotriz y aeroespacial en México.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase mb-5">Contacto</div>
              <ul className="space-y-3 text-white/50 text-xs">
                <li className="flex items-center gap-2"><IconPhone /><span>+52 (614) 197-5092</span></li>
                <li className="flex items-center gap-2"><IconPhone /><span>+52 (614) 245-6923</span></li>
                <li className="flex items-center gap-2"><IconPhone /><span>+52 (614) 229-0914</span></li>
                <li className="flex items-center gap-2"><IconMail /><span>ventas@usykmexico.com</span></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase mb-5">Navegación</div>
              <ul className="space-y-3">
                <li><Link href="#soluciones" className="text-white/50 text-xs hover:text-white transition-colors duration-200 cursor-pointer">Soluciones</Link></li>
                <li><Link href="#contacto" className="text-white/50 text-xs hover:text-white transition-colors duration-200 cursor-pointer">Contacto</Link></li>
                <li><Link href="/blog" className="text-white/50 text-xs hover:text-white transition-colors duration-200 cursor-pointer">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/30 text-xs">© 2026 USYK México. Todos los derechos reservados.</p>
            <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Herramientas de Corte de Precisión</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a
        href="https://wa.me/526141975092?text=Hola%2C%20quisiera%20cotizar%20herramientas%20de%20corte"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 hover:shadow-[0_0_24px_rgba(37,211,102,0.4)] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}
