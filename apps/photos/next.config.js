//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const { composePlugins, withNx } = require("@nx/next");

const nextConfig = {
  nx: {},
  resolve: {
    alias: {
      "@tdorsey/shared": path.resolve(__dirname, "../../libs/shared/assets"),
      "@tdorsey/photo-service": path.resolve(
        __dirname,
        "../../libs/photoService/src/index.ts"
      ),
    },
  },
  compiler: {
    svgr: true,
  },
};

const plugins = [withNx];

const composed = composePlugins(...plugins)(nextConfig);
composed.turbopack = { root: __dirname };

module.exports = composed;
