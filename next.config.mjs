// @ts-nocheck
/** @type {import('next').NextConfig} */
import path from 'path'
import { existsSync } from 'fs'
import dotenv from 'dotenv'

const __dirname = path.resolve()
const envFile = `.env.${process.env.NODE_ENV || 'development'}`
const envPath = path.join(__dirname, envFile)
if (existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  console.error(`.env.${process.env.NODE_ENV} file not found`)
}

const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.matrakosala.com',
      },

      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
    ],
  },
}

export default nextConfig
