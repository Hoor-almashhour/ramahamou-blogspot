import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["res.cloudinary.com", "ik.imagekit.io"], 
    unoptimized: false,
  },
};

export default nextConfig;
