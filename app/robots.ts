import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot',
                    'anthropic-ai', 'CCBot', 'Googlebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://usykmexico.com/sitemap.xml',
    host: 'https://usykmexico.com',
  }
}
