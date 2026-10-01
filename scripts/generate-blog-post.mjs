#!/usr/bin/env node
/**
 * Genera un nuevo artículo de blog usando Claude API y lo agrega a lib/blog-posts.ts
 * Uso: node scripts/generate-blog-post.mjs [tema opcional]
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const TEMAS_ROTATIVOS = [
  'Tendencias en maquinado de alta velocidad para aluminio automotriz en México 2026',
  'Cómo reducir el tiempo de ciclo en operaciones de fresado con insertos PCD',
  'Guía de selección de brocas para aleaciones de titanio en aerospace',
  'El papel de la certificación IATF 16949 en proveedores automotrices mexicanos',
  'Comparativa: insertos de carburo vs PCD para maquinado de aluminio',
  'Optimización de parámetros de corte para inconel y superaleaciones',
  'Mantenimiento predictivo de herramientas de corte: reducción de costos',
  'Manufactura de precisión en el corredor industrial Chihuahua-Sonora',
  'Gestión de inventario de herramientas de corte en plantas maquiladoras',
  'Herramientas especiales para componentes de motor de vehículos eléctricos',
]

const CATEGORIAS = ['Automotriz', 'Aeroespacial', 'Calidad', 'Industria', 'Tecnología']

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 70)
}

function getNextTema(existingSlugs) {
  const tema = process.argv[2]
  if (tema) return tema
  const available = TEMAS_ROTATIVOS.filter(t => !existingSlugs.includes(slugify(t)))
  return available[Math.floor(Math.random() * available.length)] || TEMAS_ROTATIVOS[0]
}

async function generatePost(tema) {
  const client = new Anthropic()

  const prompt = `Eres el editor técnico de USYK México, distribuidor B2B de herramientas de corte de precisión para industria automotriz y aeroespacial en México.

Escribe un artículo de blog completo sobre: "${tema}"

El artículo debe:
- Ser en español, tono profesional pero accesible
- Tener entre 900-1100 palabras
- Incluir estadísticas reales y verificables de fuentes como AMIA, FEMIA, INEGI o IAQG
- Mencionar casos prácticos relevantes para México
- Incluir 2-3 citas de fuentes externas en formato markdown: [texto](URL)
- Terminar con un párrafo que vincule con los servicios de USYK México

Devuelve un JSON con esta estructura EXACTA (sin texto adicional antes o después):
{
  "slug": "slug-en-kebab-case-maximo-70-chars",
  "title": "Título del artículo (máx 80 chars)",
  "excerpt": "Resumen de 150-160 caracteres para SEO",
  "metaDescription": "Meta description de 140-155 caracteres",
  "category": "Automotriz|Aeroespacial|Calidad|Industria|Tecnología",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "readTime": 5,
  "content": "Contenido completo del artículo en markdown. Usa ## para subtítulos, **negrita**, listas con -, y [texto](url) para citas."
}`

  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].text.trim()
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Claude no devolvió JSON válido')
  return JSON.parse(jsonMatch[0])
}

function appendToBlogPosts(post) {
  const filePath = join(ROOT, 'lib', 'blog-posts.ts')
  let content = readFileSync(filePath, 'utf-8')

  const today = new Date().toISOString().split('T')[0]

  const newEntry = `  {
    slug: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    metaDescription: '${post.metaDescription.replace(/'/g, "\\'")}',
    category: '${post.category}',
    keywords: ${JSON.stringify(post.keywords)},
    readTime: ${post.readTime},
    date: '${today}',
    content: \`${post.content.replace(/`/g, '\\`')}\`,
  },`

  // Insert before the closing bracket of the array
  content = content.replace(/^(\s*}\s*,?\s*\n\]\s*)$/m, `${newEntry}\n$1`)
  // Fallback: append before the export closing
  if (!content.includes(newEntry)) {
    content = content.replace(/(export const blogPosts[^[]*\[[\s\S]*?)(\]\s*$)/, `$1${newEntry}\n$2`)
  }

  writeFileSync(filePath, content, 'utf-8')
  return today
}

async function main() {
  const blogFile = readFileSync(join(ROOT, 'lib', 'blog-posts.ts'), 'utf-8')
  const existingSlugs = [...blogFile.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])

  const tema = getNextTema(existingSlugs)
  console.log(`📝 Generando artículo sobre: ${tema}`)

  const post = await generatePost(tema)
  console.log(`✅ Artículo generado: "${post.title}"`)

  const date = appendToBlogPosts(post)
  console.log(`📁 Agregado a lib/blog-posts.ts (${date})`)
  console.log(`🔗 URL: https://usykmexico.com/blog/${post.slug}`)

  // Guardar metadata para el siguiente paso (LinkedIn)
  writeFileSync(
    join(ROOT, 'scripts', '.last-post.json'),
    JSON.stringify({ ...post, date, url: `https://usykmexico.com/blog/${post.slug}` }, null, 2)
  )
}

main().catch(err => { console.error('❌', err.message); process.exit(1) })
