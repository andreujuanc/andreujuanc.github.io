const path = require('path');
//https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
//https://github.com/dustinjackson/html-webpack-inline-source-plugin
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'andreu.os.js',
        //path: path.resolve(__dirname, 'dist')
        path: __dirname
    },
    plugins: [
        new HtmlWebpackPlugin({
            inlineSource: '.(js|css)$', // embed all javascript and css inline
            template: './src/html/index.html'
        }),
        new HtmlWebpackInlineSourcePlugin()
    ]
};