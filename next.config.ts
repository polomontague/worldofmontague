import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
