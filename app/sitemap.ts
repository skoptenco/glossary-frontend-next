import {MetadataRoute} from "next";
import {getApi} from "@/shared/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const host = process.env.NEXT_PUBLIC_HOST_URL;

    if (!host) {
        return [];
    }

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: host,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${host}/terms`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${host}/graph`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];

    const terms = await getApi.getTerms();
    const dynamicRoutes: MetadataRoute.Sitemap = terms.map(term => ({
        url: `${host}/terms/${term.keyword}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
}