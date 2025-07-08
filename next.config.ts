// next.config.js (ou next.config.ts)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite imagens servidas de mensuraapi.com.br e do subdomínio de arquivos
    domains: [
      "mensuraapi.com.br",
      "imagens.mensuraapi.com.br"
    ],
    // Se você ainda precisar do remotePatterns para outras rotas:
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
};

export default nextConfig;
