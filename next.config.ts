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
        ],
    },
    eslint: {
        // Disable ESLint during builds due to ESLint v9 compatibility issues
        // Run lint separately if needed: npm run lint
        ignoreDuringBuilds: true,
    },
};

export default withNextIntl(nextConfig);
