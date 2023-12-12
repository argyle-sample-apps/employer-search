/** @type {import('next').NextConfig} */
const config = {
  env: {
    CUSTOMIZATION_ID: "",
  },
  reactStrictMode: true,
  basePath: "/employer-search",
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default config;
