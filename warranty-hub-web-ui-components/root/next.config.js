/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  // Configuration for when this library is consumed or tested within a Next.js context
  modularizeImports: {
    'styled-components': {
      transform: 'styled-components',
    },
  },
  experimental: {
    optimizePackageImports: ['@warranty-hub/web-ui-components'],
  },
};

module.exports = nextConfig;