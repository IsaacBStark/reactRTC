const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: false,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
