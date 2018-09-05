const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require( "path" );

module.exports = [
    // Client
    {
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
            })
        ],
        entry: "./src/client/index.js",
        output: { filename: "client.js" },
        devtool: "source-map",
        devServer: {
            contentBase: "./dist",
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    secure: false
                }
            },
            historyApiFallback: true // required to make serving react-router routes like /foo work
        }
    },

    // Server
    {
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
        }
    }
];
