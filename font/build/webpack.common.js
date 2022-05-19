const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const { resolve, appConfig } = require("./utils");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === "development";
module.exports = {
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [

                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            publicPath: "../",
                            limit: 1024 * 8,
                            name: "images/[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        alias: {
            "@": resolve("src"),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.MK_ENV": JSON.stringify(process.env.MK_ENV),
        }),
        new ProgressBarPlugin(),
        new BundleAnalyzerPlugin()
    ].filter(Boolean),
};
