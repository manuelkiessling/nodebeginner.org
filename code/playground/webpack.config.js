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
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/frontend/index.html",
        filename: "./index.html"
      })
    ],
    entry: './src/frontend/index.js',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    }
  };
