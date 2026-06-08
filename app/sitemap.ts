import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'

const siteUrl = 'https://usykmexico.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
