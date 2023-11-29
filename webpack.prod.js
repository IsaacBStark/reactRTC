const { merge } = require("webpack-merge");
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: "production",
  optimization: {
    mangleExports: "size",
    minimize: true,
  },
});
