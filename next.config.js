const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.coverr.co', 'images.unsplash.com', 'res.cloudinary.com'],
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
