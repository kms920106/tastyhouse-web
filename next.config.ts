import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.bbqorder.co.kr',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/files',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/files',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
