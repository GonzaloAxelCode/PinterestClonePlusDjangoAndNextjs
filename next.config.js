/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "d3cy9zhslanhfa.cloudfront.net",
      "graffica.info",
      "res.cloudinary.com",
    ],
  },
};


module.exports = nextConfig;
