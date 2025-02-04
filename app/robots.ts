import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: '/api/',
            allow: '/',
        },
        sitemap: 'https://skulz.vercel.app/sitemap.xml',
    }
}