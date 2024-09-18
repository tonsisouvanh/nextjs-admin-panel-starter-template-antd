/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost:3500",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  swcMinify: true, // Enable SWC minification for faster builds
  compress: true, // Enable gzip compression for responses
  reactStrictMode: true, // Enable React strict mode for better error handling
};

export default nextConfig;
