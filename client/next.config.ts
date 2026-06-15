import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Enable persistent on-disk filesystem caching for production builds
    turbopackFileSystemCacheForBuild: true,
  },
};

export default nextConfig;
