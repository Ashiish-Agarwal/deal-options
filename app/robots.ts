import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'], // Add sensitive routes
      },
    ],
    sitemap: 'https://deal-option.app.dorny.site/sitemap.xml', // Use your actual domain
  }
}