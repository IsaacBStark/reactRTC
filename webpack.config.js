const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src'),
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        include: path.resolve(__dirname, 'src'),
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src'),
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: false,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // optimization: {
  //   mangleExports: "size",
  //   minimize: true,
  // },
};
