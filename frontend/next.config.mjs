/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    // NEXT_WS_BASE_URL: process.env.NEXT_WS_BASE_URL,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

export default nextConfig;
