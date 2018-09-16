const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const npm_package = require("./package.json");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const glob = require("glob");
const path = require("path");

const pathsToClean = [
    "dist"
];

const cleanOptions = {
    exclude: ["server.js"],
    verbose: true,
    dry:     false
};

module.exports = {
    name: "client",
    target: "web",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    "/node_modules/",
                    "/src/server/"
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
                    {
                        loader: "style-loader"
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["/src/universal/styles"],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/universal/html-templates/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "app.[contenthash].css",
        }),
        new ManifestPlugin({
            "fileName": "assets-manifest.json"
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new SWPrecacheWebpackPlugin(
            {
                cacheId: "playground",
                filename: "service-worker.js",
                minify: false,
                navigateFallback: "/",
                staticFileGlobsIgnorePatterns: [/\.map$/, /assets-manifest\.json$/],
                maximumFileSizeToCacheInBytes: 10485760,
                dynamicUrlToDependencies: {
                    '/': [ // This entry is required to make *all* locations (like e.g. /tasks) available offline, not only / itself
                        ...glob.sync(path.resolve("dist/**/*.js")),
                        ...glob.sync(path.resolve("dist/**/*.css"))
                    ]
                },
            }
        )
    ],
    entry: "./src/client/index.js",
    output: { filename: "client.[chunkhash].js" },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:10001",
                secure: false
            }
        },
        historyApiFallback: true, // required to make serving react-router routes like /tasks work
        host: '127.0.0.1',
        port: 10000
    },
    resolve: {
        alias: npm_package._moduleAliases || {}
    }
};
