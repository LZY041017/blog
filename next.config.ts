import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages 部署在子路径下时需要配 basePath，这里假设用自定义域名或用户名.github.io
  // basePath: "/blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
