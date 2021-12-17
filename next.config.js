/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    async redirects() {
    return [
      {
        source: '/',
        destination: '/year/2021',
        permanent: false,
      },
      {
        source: '/year',
        destination: '/year/2021',
        permanent: false,
      },
    ]
  },
}
