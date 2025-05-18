import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com','img.youtube.com','res.cloudinary.com'], // Agrega tu dominio aquí
    },

};

export default nextConfig;
