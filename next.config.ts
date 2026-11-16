import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async rewrites() { return { beforeFiles: [{ source: "/", has: [{ type: "host", value: "help.repairnox.com" }], destination: "/help" }, { source: "/robots.txt", has: [{ type: "host", value: "help.repairnox.com" }], destination: "/help-robots.txt" }, { source: "/sitemap.xml", has: [{ type: "host", value: "help.repairnox.com" }], destination: "/help-sitemap.xml" }], afterFiles: [], fallback: [] }; },
  async redirects() { return [{ source: "/login/:path*", destination: "https://app.repairnox.com/login/:path*", permanent: false }]; },
  async headers() { return [{ source: "/:path*", headers: [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src-attr 'none'; upgrade-insecure-requests" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ] }]; },
};
export default config;
