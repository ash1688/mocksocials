import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output keeps the Docker server image small (ADR-0004: Docker for
  // server packaging only; local dev runs on bare Node).
  output: "standalone",
  // Seeded Picsum media for the platform renders (ADR-0005). Deliberate
  // external dependency; sends only a seed string, no Student data.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
