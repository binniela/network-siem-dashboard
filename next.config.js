/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['child_process', 'fs', 'path', 'util', 'os'],
  },
}

module.exports = nextConfig