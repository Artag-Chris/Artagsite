import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        viewTransition: true,
    },
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
            {
                // GOG covers (images.gog.com, images-1..4.gog.com)
                protocol: 'https',
                hostname: '**.gog.com',
            },
            {
                // GOG static assets (newer cover CDN)
                protocol: 'https',
                hostname: '**.gog-statics.com',
            },
        ],
    },
    eslint: {
        // Disable ESLint during builds due to ESLint v9 compatibility issues
        // Run lint separately if needed: npm run lint
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            { source: '/notes', destination: '/engineering-notes', permanent: true },
            { source: '/es/notes', destination: '/es/notas-ingenieria', permanent: true },
            { source: '/es/engineering-notes', destination: '/es/notas-ingenieria', permanent: true },
            {
                source: '/engineering-notes/llm-semantic-cache-cost-reduction',
                destination: '/engineering-notes/semantic-caching-pgvector-llm-cost-reduction',
                permanent: true,
            },
            {
                source: '/es/engineering-notes/llm-semantic-cache-cost-reduction',
                destination: '/es/notas-ingenieria/cache-semantico-pgvector-reduccion-costos-llm',
                permanent: true,
            },
            {
                source: '/engineering-notes/whatsapp-ai-agent-architecture',
                destination: '/engineering-notes/secure-multi-tenant-rag-architecture',
                permanent: true,
            },
            {
                source: '/es/engineering-notes/whatsapp-ai-agent-architecture',
                destination: '/es/notas-ingenieria/automatizacion-ia-whatsapp-empresas-pereira',
                permanent: true,
            },
            { source: '/privateservers', destination: '/private-servers', permanent: true },
            { source: '/es/privateservers', destination: '/es/private-servers', permanent: true },
            { source: '/current-studies', destination: '/currentStudies', permanent: true },
            { source: '/es/current-studies', destination: '/es/currentStudies', permanent: true },
        ]
    },
};

export default withNextIntl(nextConfig);
