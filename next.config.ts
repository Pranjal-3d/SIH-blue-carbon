import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/marketplace", permanent: false },
      { source: "/projects/:path*", destination: "/marketplace", permanent: false },
    ];
  },
};

export default nextConfig;