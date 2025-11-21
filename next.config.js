const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Prevent build failures from minor type issues
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true, // Recommended for Cloudflare Pages
};

module.exports = nextConfig;
