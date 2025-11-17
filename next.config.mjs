/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/recipe',
        destination: '/dashboard/my-goal',
        permanent: true,
      },
      {
        source: '/recipe/wealth-creation',
        destination: '/dashboard/my-goal/wealth-creation',
        permanent: true,
      },
      {
        source: '/recipe/retirement',
        destination: '/dashboard/my-goal/retirement',
        permanent: true,
      },
      {
        source: '/recipe/house',
        destination: '/dashboard/my-goal/house',
        permanent: true,
      },
      {
        source: '/recipe/car',
        destination: '/dashboard/my-goal/car',
        permanent: true,
      },
      {
        source: '/recipe/self-education',
        destination: '/dashboard/my-goal/self-education',
        permanent: true,
      },
      {
        source: '/recipe/child-education',
        destination: '/dashboard/my-goal/child-education',
        permanent: true,
      },
      {
        source: '/recipe/child-wedding',
        destination: '/dashboard/my-goal/child-wedding',
        permanent: true,
      },
      {
        source: '/recipe/vacation',
        destination: '/dashboard/my-goal/vacation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
