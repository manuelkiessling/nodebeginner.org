const HtmlWebPackPlugin = require("html-webpack-plugin");

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
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
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
    })
  ],
  entry: "./src/frontend/index.js",
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
