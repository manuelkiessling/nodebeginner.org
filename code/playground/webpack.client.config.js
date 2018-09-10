const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const npm_package = require("./package.json");

const PUBLIC_PATH = 'http://127.0.0.1:8000/';

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
                cacheId: 'playground',
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                minify: false,
                navigateFallback: PUBLIC_PATH + 'index.html',
                staticFileGlobsIgnorePatterns: [/\.map$/, /assets-manifest\.json$/],
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
                target: "http://localhost:8001",
                secure: false
            }
        },
        historyApiFallback: true, // required to make serving react-router routes like /tasks work
        port: 8000
    },
    resolve: {
        alias: npm_package._moduleAliases || {}
    }
};
