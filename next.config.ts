import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mensuraapi.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagens.mensuraapi.com.br",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/mensura/:path*",
        destination: "https://mensuraapi.com.br/mensura/:path*",
      },
    ];
  },
};

export default nextConfig;
