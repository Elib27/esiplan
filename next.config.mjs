import withPWAInit from "@ducanh2912/next-pwa";
import analyze from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  }
}

const withPWA = withPWAInit({
  dest: "public",
});

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withPWA(nextConfig))
