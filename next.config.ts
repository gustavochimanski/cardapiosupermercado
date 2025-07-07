import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["mensuraapi.com.br"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mensuraapi.com.br",
        port: "1001",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
