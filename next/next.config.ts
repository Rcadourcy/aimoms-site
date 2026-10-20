import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so Next doesn't pick up a stray
  // lockfile elsewhere on the machine (e.g. ~/pnpm-lock.yaml).
  turbopack: {
    root: path.join(__dirname),
  },
  // The homepage and in-person thank-you page are hand-built static pages in /public.
  // beforeFiles runs ahead of app/page.tsx, so "/" serves the new homepage.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home-v2.html' },
        { source: '/experience-thank-you', destination: '/experience-thank-you.html' },
        { source: '/nyc', destination: '/nyc.html' },
        { source: '/foundations', destination: '/foundations-v2.html' },
        { source: '/build-aime', destination: '/build-aime.html' },
        { source: '/build-aime-thank-you', destination: '/build-aime-thank-you.html' },
        { source: '/skill-guide', destination: '/skill-guide.html' },
        { source: '/experiences', destination: '/experiences-v2.html' },
        { source: '/corporate', destination: '/corporate-v2.html' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
