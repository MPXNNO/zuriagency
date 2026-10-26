/** @type {import('next').NextConfig} */
const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async headers() {
    // les médias ne changent pas de nom sans changer de contenu : le navigateur peut les garder longtemps
    return ["/media/:path*", "/img/:path*", "/audio/:path*", "/logos/:path*"].map((source) => ({ source, headers: longCache }));
  },
};

export default nextConfig;
