#!/usr/bin/env node
/**
 * Orquestador principal — genera artículo, despliega y publica en LinkedIn
 * Corre cada semana vía cron
 *
 * Requiere en .env.local:
 *   ANTHROPIC_API_KEY=sk-ant-...
 *   GITHUB_TOKEN=ghp_...
 *   LINKEDIN_ACCESS_TOKEN=AQ...
 */

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Cargar .env.local
function loadEnv() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) {
    console.warn('⚠️  .env.local no encontrado — usando variables del entorno del sistema')
    return
  }
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '')
  }
}

function run(cmd, desc) {
  console.log(`\n▶ ${desc}`)
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' })
}

async function main() {
  console.log('🚀 USYK México — Auto-publicación iniciada')
  console.log(`📅 ${new Date().toLocaleString('es-MX')}`)

  loadEnv()

  // 1. Generar artículo
  run('node scripts/generate-blog-post.mjs', 'Generando artículo con Claude')

  // 2. Commit y push a GitHub (Vercel auto-despliega)
  run('git add lib/blog-posts.ts', 'Staging del nuevo artículo')
  const lastPost = JSON.parse(readFileSync(join(ROOT, 'scripts', '.last-post.json'), 'utf-8'))
  run(`git commit -m "blog: ${lastPost.title.slice(0, 60)}"`, 'Commit')
  run('git push origin main', 'Push a GitHub → Vercel auto-despliega')

  // 3. Esperar 60s para que Vercel termine el deploy
  console.log('\n⏳ Esperando 60s para que Vercel complete el deploy...')
  await new Promise(r => setTimeout(r, 60000))

  // 4. Publicar en LinkedIn
  run('node scripts/post-to-linkedin.mjs', 'Publicando en LinkedIn')

  console.log('\n✅ Auto-publicación completada exitosamente')
  console.log(`🌐 ${lastPost.url}`)
}

main().catch(err => {
  console.error('\n❌ Error en auto-publicación:', err.message)
  process.exit(1)
})
