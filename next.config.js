/** @type {import('next').NextConfig} */
let d = new Date();
let currentYear = d.getFullYear();
module.exports = {
  reactStrictMode: true,
    async redirects() {
    return [
      {
        source: '/',
        destination: `/year/${currentYear}`,
        permanent: false,
      },
      {
        source: '/year',
        destination: `/year/${currentYear}`,
        permanent: false,
      },
    ]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains:['i.postimg.cc','i.ibb.co']
  }
}
