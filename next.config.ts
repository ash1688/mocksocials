import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output keeps the Docker server image small (ADR-0004: Docker for
  // server packaging only; local dev runs on bare Node).
  output: "standalone",
};

export default nextConfig;
