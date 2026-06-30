import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // This will allow the production build to complete even with type errors
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.carehubuae.com",
      },
      {
        protocol: "https",
        hostname: "your-api-domain.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.carehubuae.com",
  },
};

export default nextConfig;
