/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['akm-img-a-in.tosshub.com','res.cloudinary.com'],
  },
  eslint: {
    dirs:['pages','utils']
  }
}

module.exports = nextConfig
