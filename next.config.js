/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    async redirects() {
    return [
      {
        source: '/',
        destination: '/2021',
        permanent: true,
      },
    ]
  },
}
