import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized:true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "flagpedia.net",
        pathname: "/data/flags/h80/**",
      },
      {
        protocol: "https",
        hostname: "www.procyclingstats.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
