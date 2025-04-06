/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "pplx-res.cloudinary.com",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
