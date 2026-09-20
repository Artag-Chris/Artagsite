import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            // Gaming library images (RAWG enrichment, Steam CDN, Epic store art)
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
            },
            {
                protocol: 'https',
                hostname: 'media.steampowered.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.akamai.steamstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'shared.fastly.steamstatic.com',
            },
            {
                // Epic store covers (cdn1/cdn2.epicgames.com, cdn.fortnite.com, …)
                protocol: 'https',
                hostname: '**.epicgames.com',
            },
        ],
    },
    eslint: {
        // Disable ESLint during builds due to ESLint v9 compatibility issues
        // Run lint separately if needed: npm run lint
        ignoreDuringBuilds: true,
    },
};

export default withNextIntl(nextConfig);
