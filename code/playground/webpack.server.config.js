const npm_package = require("./package.json");

module.exports = {
    name: "server",
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    "/node_modules/",
                    "/src/client/"
                ],
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    entry: "./src/server/index.js",
    output: { filename: "server.js" },
    devtool: "source-map",
    node: {
        fs: "empty", // See https://github.com/webpack-contrib/css-loader/issues/447
        net: "empty",
        __dirname: false, // Ensure that __dirname still works as expected in server-side Node.js code
        __filename: false,
    },
    resolve: {
        alias: npm_package._moduleAliases || {}
    }
};
