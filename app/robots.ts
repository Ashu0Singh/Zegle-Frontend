import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Googlebot",
                allow: ["/", "/chat"],
                disallow: "/user",
            },
            {
                userAgent: ["Applebot", "Bingbot"],
                allow: ["/", "/chat"],
                disallow: ["/user"],
            },
        ],
        sitemap: "https://zegle.in/sitemap.xml",
    };
}
