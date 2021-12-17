const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
            test: /\.vue$/,
            use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: path.join(__dirname, 'src/assets'), to: path.join(__dirname, 'dist/assets') },
              { from: path.join(__dirname, 'Imker'), to: path.join(__dirname, 'dist/sharing/Imker') },
              { from: path.join(__dirname, 'Games'), to: path.join(__dirname, 'dist/sharing/Games') },
              { from: path.join(__dirname, 'ShadersVFX'), to: path.join(__dirname, 'dist/sharing/ShadersVFX') }

            ],
          }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject:true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: 'localhost',
        port: 9000
    }
};
