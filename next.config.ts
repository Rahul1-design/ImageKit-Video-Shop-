import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagekit.io',
        port: '',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
