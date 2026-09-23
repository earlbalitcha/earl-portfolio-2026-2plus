/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {source: "/portfolio", destination: "/projects", permanent: true},
      {source: "/portfolio/:slug", destination: "/projects/:slug", permanent: true},
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
