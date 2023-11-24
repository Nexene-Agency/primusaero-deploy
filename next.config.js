/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone",
  // i18n: {
  //   locales: ["en", "de"],
  //   defaultLocale: "en",
  // },
  experimental: {
    // serverActions: true,
    // serverActionsBodySizeLimit: "2mb",
    // appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/primusaero-dev.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;
