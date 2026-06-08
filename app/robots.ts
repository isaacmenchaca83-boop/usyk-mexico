import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://usykmexico.com/sitemap.xml',
    host: 'https://usykmexico.com',
  }
}
