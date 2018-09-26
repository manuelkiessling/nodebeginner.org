const npm_package = require("./package.json");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathsToClean = [
    "dist/index.html" // Because we serve static files from /dist in the server, this file is in the way
];

const cleanOptions = {
    verbose: true,
    dry:     false
};

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
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
    ],
    entry: "./src/server/ssr.js",
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
