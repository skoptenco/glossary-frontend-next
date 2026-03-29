import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    output: "standalone"
  /* config options here */
};

const withMDX = createMDX({})

export default withMDX(nextConfig);
