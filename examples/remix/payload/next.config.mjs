import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (config, { isServer }) => {
    config.cache = {
      type: 'memory',
      // buildDependencies: {
      //   config: [__filename], // Cache invalidation on config file change
      // },
    };
    config.watchOptions = {
      aggregateTimeout: 1000,
      poll: 1000,
    }
    return config;
  },
}

export default withPayload(nextConfig)
