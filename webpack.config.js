const path = require("path");

module.exports = {
  entry: "./src/index.js",
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
        type: "asset/inline",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src'),
        type: "asset/inline",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.[contenthash].js",
    clean: true,
  },
};
