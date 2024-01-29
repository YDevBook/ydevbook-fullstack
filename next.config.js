/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      }
    ]
  },
  experimental: {
    // @google-cloud/storage Minification 이슈로 TypeError: Expected signal to be an instanceof AbortSignal 에러 발생하여 비활성화
    serverMinification: false
  }
};

module.exports = nextConfig;
