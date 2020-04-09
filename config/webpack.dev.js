const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        port: 3000, // 端口号
        progress: true, // 进度条
        contentBase: './public', // 服务默认指向文件夹，静态资源
        inline: true,
        hot: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
});