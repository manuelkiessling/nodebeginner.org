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
        }
      ]
    },
    entry: './src/frontend/index.js'
  };
