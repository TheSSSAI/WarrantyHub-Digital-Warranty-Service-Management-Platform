/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Image optimization configuration for Azure Blob Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warrantyhubstorage.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Internationalization configuration (US-109)
  // Note: For Next.js App Router, this config primarily supports middleware routing detection
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  // Enable experimental features if required by dependencies or server actions optimization
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Support for larger file uploads (invoices/images)
    },
    optimizePackageImports: ['lucide-react', 'date-fns', 'lodash'],
  },
};

module.exports = nextConfig;