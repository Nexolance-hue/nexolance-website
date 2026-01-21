import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/quote',
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
