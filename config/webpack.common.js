const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.ts")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                include: path.resolve(__dirname, "../src"),
                use: "ts-loader",
            }, {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, {
                test: /\.scss$/i,
                include: path.resolve(__dirname, "../src"),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new Dotenv(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: "./public",
                to: "../dist",
                ignore: ['.*']
            }, {
                from: "./src/vendor/vendor.dll.js",
                to: "../dist"
            }
        ]),
    ],
    externals: {
        //jquery: 'jQuery',
        // lodash : {
        //     commonjs: "lodash",
        //     amd: "lodash",
        //     root: "_"
        // }
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
        alias: {
            "@": path.resolve(__dirname, "src")
        },
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[hash:8].bundle.js",
        library: 'hakuWorkflowDesign',
    },
    performance: {
        maxEntrypointSize: 2000000
    }
};