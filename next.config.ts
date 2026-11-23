import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A stray package-lock.json in the user's home folder confuses root detection.
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
