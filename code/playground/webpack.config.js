const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          "/node_modules/",
          "/src/backend/"
        ],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: ["/src/styles"],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/frontend/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "app.[contenthash].css",
    })
  ],
  entry: "./src/frontend/index.js",
  output: {
    filename: "app.[chunkhash].js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false
      }
    }  
  }
};
