/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // webpack: (config) => {
  //   config.optimization.minimize = false;
  //   return config;
  // },
  // transpilePackages: ["next", "react", "react-dom", "react-hook-form"],
  // transpilePackages: ["@nextui-org/react"],
  webpack: (config, { isServer }) => {
    // if (!isServer) {
    //   config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", "supports-color": "supports-color" });
    // }
    // config.externals.push("pino-pretty", "lokijs", "encoding", "babel");
    // config.module.rules.push({
    //   test: /\.m?js$/,
    //   exclude: /(node_modules|bower_components)/,
    //   use: [
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["@babel/preset-env"],
    //       },
    //     },
    //   ],
    // });
    return config;
  },
};

module.exports = nextConfig;
