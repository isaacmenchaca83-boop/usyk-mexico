#!/usr/bin/env node
/**
 * Publica el último artículo generado en LinkedIn
 * Requiere: LINKEDIN_ACCESS_TOKEN en .env.local
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

async function getAccessToken() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  if (!token) throw new Error('LINKEDIN_ACCESS_TOKEN no configurado en .env.local')
  return token
}

async function getLinkedInUserId(token) {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Error al obtener perfil LinkedIn: ${res.status}`)
  const data = await res.json()
  return data.sub
}

async function postToLinkedIn(token, authorId, post) {
  const caption = `🔧 Nuevo artículo en el blog de USYK México

${post.title}

${post.excerpt}

👉 Lee el artículo completo: ${post.url}

#HerramientasDeCorte #Manufactura #Automotriz #Aeroespacial #MéxicoIndustrial #AS9100 #MaquinadoDePrecisión`

  const body = {
    author: `urn:li:person:${authorId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: caption },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            description: { text: post.excerpt },
            originalUrl: post.url,
            title: { text: post.title },
          },
        ],
      },
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
  }

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Error al publicar en LinkedIn: ${res.status} — ${err}`)
  }

  return await res.json()
}

async function main() {
  const lastPostPath = join(ROOT, 'scripts', '.last-post.json')
  let post
  try {
    post = JSON.parse(readFileSync(lastPostPath, 'utf-8'))
  } catch {
    throw new Error('No hay artículo generado. Ejecuta generate-blog-post.mjs primero.')
  }

  console.log(`📤 Publicando en LinkedIn: "${post.title}"`)

  const token = await getAccessToken()
  const userId = await getLinkedInUserId(token)
  const result = await postToLinkedIn(token, userId, post)

  console.log(`✅ Publicado en LinkedIn`)
  console.log(`🔗 Post ID: ${result.id}`)
}

main().catch(err => { console.error('❌', err.message); process.exit(1) })
