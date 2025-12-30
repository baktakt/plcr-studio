import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Excalidraw uses canvas which needs special handling
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
