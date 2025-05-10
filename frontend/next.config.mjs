/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

export default nextConfig;
