import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"]
  }
};

module.exports = {
  typescript: {
      ignoreBuildErrors: true,
  },
};


export default nextConfig;
