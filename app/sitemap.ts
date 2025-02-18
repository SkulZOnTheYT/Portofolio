import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://skulz.vercel.app',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://skulz.vercel.app/store',
            lastModified: new Date(),
            priority: 0.8,
        }
    ]
}