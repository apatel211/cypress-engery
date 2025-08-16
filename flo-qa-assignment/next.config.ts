import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
