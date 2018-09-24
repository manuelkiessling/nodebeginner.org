const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const npm_package = require("./package.json");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const glob = require("glob");
const path = require("path");

const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    SW_PREFETCH: (process.env.SW_PREFETCH || "false") === "true",
};

const plugins = [];

plugins.push(
    new MiniCssExtractPlugin({
        filename: "app.css",
    })
);

plugins.push(
    new ManifestPlugin({
        "fileName": "assets-manifest.json"
    })
);

if (ENV.SW_PREFETCH) {
    plugins.push(
        new SWPrecacheWebpackPlugin(
            {
                cacheId: "playground",
                filename: "service-worker.js",
                minify: false,
                navigateFallback: "/sw-precache-appshell",
                navigateFallbackWhitelist: [/^\/(?!(api)).*/], // Only fall back to the app shell for requests that are not to the api
                maximumFileSizeToCacheInBytes: 10485760,
                staticFileGlobs: [
                    "dist/**/*.js",
                    "dist/**/*.css"
                ],
                staticFileGlobsIgnorePatterns: [/\.map$/, /assets-manifest\.json$/],
                stripPrefix: "dist/",
                dynamicUrlToDependencies: {
                    "/sw-precache-appshell": [ // This entry is required to make the navigateFallback work
                        ...glob.sync(path.resolve("dist/**/*.js")),
                        ...glob.sync(path.resolve("dist/**/*.css"))
                    ],
                },
            }
        )
    );
} else {
    plugins.push(
        new HtmlWebPackPlugin({
            template: "./src/universal/html-templates/index-client-devserver.html",
            filename: "./index.html"
        }),
    );
}

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
    plugins: plugins,
    entry: "./src/client/index.js",
    output: { filename: "client.js" },
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
