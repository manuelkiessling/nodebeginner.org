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
                            includePaths: ["/src/styles"],
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
    devtool: "source-map",
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
