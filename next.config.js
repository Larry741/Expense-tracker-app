/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@import "variables.scss"; @import "mixins.scss";`,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig