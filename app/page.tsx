'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    function createParticles() {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) particles.splice(i, 1);

        ctx.fillStyle = `rgba(251, 146, 60, ${p.life * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.3) createParticles();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-lg border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">⚙️</span>
            <span className="text-xl font-bold">USYK MÉXICO</span>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition">
            Contactar
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Herramientas de Corte
            </span>
            <br />
            <span className="text-white">de Clase Mundial</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            20+ años distribuyendo tecnología de precisión para <span className="text-orange-400">Automotriz</span> y <span className="text-orange-400">Aeroespacial</span>
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition">
              Ver Catálogo
            </button>
            <button className="px-8 py-3 border-2 border-orange-500 rounded-lg font-bold text-lg hover:bg-orange-500/10 transition">
              +52 (614) 245-6923
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-gradient-to-b from-slate-900/50 to-slate-950 py-16 border-t border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">20+</div>
              <p className="text-slate-400">Años en el Mercado</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">500+</div>
              <p className="text-slate-400">Productos en Catálogo</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">1000+</div>
              <p className="text-slate-400">Clientes Satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Nuestros <span className="text-orange-500">Productos</span></h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Brocas', desc: 'Precisión extrema', icon: '🔧' },
              { name: 'Insertos', desc: 'Durabilidad certificada', icon: '⚡' },
              { name: 'Especiales', desc: 'Diseño personalizado', icon: '✨' },
              { name: 'Catálogo', desc: 'Consulta completa', icon: '📋' },
            ].map((product, i) => (
              <div key={i} className="group relative p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/20 hover:border-orange-500/60 transition cursor-pointer">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-slate-400 mb-4">{product.desc}</p>
                <button className="text-orange-400 font-semibold group-hover:text-orange-300 transition">
                  Más información →
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-transparent opacity-0 group-hover:opacity-10 rounded-xl transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Industrias que <span className="text-orange-500">Servimos</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Automotriz', clients: ['Superior', 'Citic Dicastal', 'Maxion Wheels'], icon: '🚗' },
              { name: 'Aeroespacial', clients: ['Proveedores Tier 1', 'Componentes de precisión', 'Certificación AS9100'], icon: '✈️' },
            ].map((industry, i) => (
              <div key={i} className="relative p-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/30 hover:border-orange-500/80 transition group overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl opacity-20 group-hover:opacity-40 transition">{industry.icon}</div>
                <h3 className="text-3xl font-bold mb-6 relative z-10">{industry.name}</h3>
                <ul className="space-y-3 relative z-10">
                  {industry.clients.map((client, j) => (
                    <li key={j} className="text-slate-300 flex items-center gap-2">
                      <span className="text-orange-500">→</span> {client}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-transparent opacity-0 group-hover:opacity-10 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 py-20 bg-slate-950 border-t border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16"><span className="text-orange-500">Contacta</span> con Nosotros</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '+52 (614) 245-6923', label: 'Línea Principal' },
              { number: '+52 (614) 229-0914', label: 'Ventas' },
              { number: '+52 (614) 197-5092', label: 'Logística' },
            ].map((contact, i) => (
              <div key={i} className="p-8 rounded-xl bg-gradient-to-br from-orange-500/10 to-slate-900 border border-orange-500/40 hover:border-orange-500 transition group cursor-pointer text-center">
                <p className="text-slate-400 mb-2">{contact.label}</p>
                <p className="text-3xl font-bold text-orange-400 group-hover:text-orange-300 transition">{contact.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-20 bg-slate-950 border-t border-orange-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>USYK MÉXICO · Chihuahua, Mexico · Herramientas de Corte de Precisión</p>
          <p className="mt-2 text-sm">© 2026 USYK México. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
