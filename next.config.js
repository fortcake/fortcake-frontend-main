/* eslint-disable @typescript-eslint/no-var-requires */
// const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withTM = require('next-transpile-modules')(['fortcake-uikit-v2'])

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/tokens/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/send',
        destination: '/swap',
        permanent: true,
      },
      {
        source: '/swap/:outputCurrency',
        destination: '/swap?outputCurrency=:outputCurrency',
        permanent: true,
      },
      {
        source: '/create/:currency*',
        destination: '/add/:currency*',
        permanent: true,
      },
      {
        source: '/legal',
        destination: '/legal/terms',
        permanent: true,
      },
    ]
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

// module.exports = config
module.exports = withBundleAnalyzer(withTM(config))
