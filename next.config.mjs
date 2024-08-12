import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },typescript:{ignoreBuildErrors: true},eslint:{ignoreDuringBuilds: true},images: {
    domains: ["img.youtube.com"],
  }
};

export default withNextIntl(nextConfig);
