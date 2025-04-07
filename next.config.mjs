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
      {
        protocol: "https",
        hostname: "www.livemint.com",
        port: "",
        pathname: "/**", // Allow any path on this hostname
      },
    ],
  },
};

export default nextConfig;
