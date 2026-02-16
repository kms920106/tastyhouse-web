import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.bbqorder.co.kr',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/files**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
