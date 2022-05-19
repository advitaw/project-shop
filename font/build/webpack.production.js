const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('./utils');


console.log(resolve('src/index.js'));
module.exports = {
    mode: 'production',
    performance: {
        hints: false,
        maxAssetSize: 250000,
    },
    output: {
        publicPath: './',
        path: resolve('dist'),
        filename: `js/[name].[fullhash:8].js`,
        chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    externals: {},
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000, //大小超过30kb的模块才会被提取
            maxSize: 0, //只是提示，可以被违反，会尽量将chunk分的比maxSize小，当设为0代表能分则分，分不了不会强制
            minChunks: 3, //某个模块至少被多少代码块引用，才会被提取成新的chunk
            maxAsyncRequests: 5, //分割后，按需加载的代码块最多允许的并行请求数
            maxInitialRequests: 3, //分割后，入口代码块最多允许的并行请求数
            automaticNameDelimiter: "~", 
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,
                    enforce: true
                }
            }
        },
        
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    warnings: false,
                    compress: {
                        properties: false,
                        drop_console: process.env.MK_ENV === 'prod' || false,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./public/index-prod.html'),
        }),
    ]
}