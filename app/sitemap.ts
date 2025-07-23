import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://deal-option.app.dorny.site',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://deal-option.app.dorny.site/landingpage',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://deal-option.app.dorny.site/pricing',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://deal-option.app.dorny.site/dashboard',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    
  ]
}