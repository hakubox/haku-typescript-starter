const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

if (process.argv.includes('--report')) {
    common.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
    mode: 'production',
    // devtool: '#cheap-module-eval-source-map',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true
        }
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css',
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require("../public/vendor/vendor-manifest.json")
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            files: {
                css: [],
                js: ["vendor/vendor.dll.js"],
            }
        }),
        new CleanWebpackPlugin()
    ],
});