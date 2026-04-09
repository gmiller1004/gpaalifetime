import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      /** Legacy / crawler requests for favicon.ico → same asset as metadata icons */
      { source: "/favicon.ico", destination: "/brands/gpaa-gold-life.png" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "judgeme.imgix.net",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) return config;

    const splitChunks = config.optimization?.splitChunks;
    if (splitChunks && typeof splitChunks === "object" && splitChunks.cacheGroups) {
      splitChunks.cacheGroups = {
        ...splitChunks.cacheGroups,
        /** Avoid `vendor-chunks/@*.js` — Node can fail to `require()` `@`-prefixed chunk filenames. */
        baseUiVendor: {
          test: /[\\/]node_modules[\\/]@base-ui[\\/]/,
          name: "vendor-base-ui",
          chunks: "all",
          priority: 50,
          enforce: true,
          reuseExistingChunk: true,
        },
        floatingUiVendor: {
          test: /[\\/]node_modules[\\/]@floating-ui[\\/]/,
          name: "vendor-floating-ui",
          chunks: "all",
          priority: 50,
          enforce: true,
          reuseExistingChunk: true,
        },
        swcVendor: {
          test: /[\\/]node_modules[\\/]@swc[\\/]/,
          name: "vendor-swc",
          chunks: "all",
          priority: 50,
          enforce: true,
          reuseExistingChunk: true,
        },
      };
    }

    return config;
  },
};

export default nextConfig;
