import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ['69.62.93.161'], // ← libera esse IP para uso no <Image />
  },
    async rewrites() {
    return [
      {
        source: "/api/mensura/:path*", // proxy para imagens, dados etc
        destination: "https://mensuraapi.com.br/:path*",
      },
    ];
  },
};

export default nextConfig;
