/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@refinedev/core",
    "@refinedev/devtools",
    "@refinedev/nextjs-router",
    "@refinedev/kbar",
    "@refinedev/antd",
    "@ant-design/icons",
    "antd",
  ],
};

export default nextConfig;
