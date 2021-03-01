const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/TodoList.js",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Project Demo",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: "./src/index.html",
    }),
  ],
};
