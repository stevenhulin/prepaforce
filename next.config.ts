import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise les connexions dev depuis d'autres appareils (ex : téléphone, autre PC)
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://172.20.10.4:3000", // remplace par l'IP exacte si elle change
  ],
};

export default nextConfig;
