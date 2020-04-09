const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'axios',
        ]
    },
    output: {
        path: path.join(__dirname, 'public/vendor'),
        filename: '[name].dll.js',
        library: '[name]_[hash]' // vendor.dll.js中暴露出的全局变量名
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(),
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        // manifest.json 描述动态链接库包含了哪些内容
        new webpack.DllPlugin({
            path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),
            // 保持与 output.library 中名称一致
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ],
    optimization: {
        minimize: false
    }
};
