import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages uses directory indexes for exported routes such as /tags/技术/.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
