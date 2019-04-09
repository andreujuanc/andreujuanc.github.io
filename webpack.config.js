const path = require('path');
var webpack = require('webpack');

//https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

//https://github.com/dustinjackson/html-webpack-inline-source-plugin
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

//https://github.com/webpack-contrib/copy-webpack-plugin
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        // 'andreu.os.js': [
        //     './src/js/index.js'
        // ],
        'andreu.os.min.js': [
            './src/js/index.js'
        ],
        'privacy.js': [
            './src/bakersnotebook/privacy.js'
        ]
        // 'index.min.css': [
        //     path.resolve(__dirname, 'src', 'css', 'index.css')
        // ],
    },
    output: {
        filename: '[name]',
        path: __dirname
            //path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            /* your options here */
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //presets: ['es2015']
                        //presets: ['@babel/preset-env']
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     include: /\.min\.js$/,
        //     minimize: true,
        //     compress: { warnings: false }
        // }),
        new HtmlWebpackPlugin({
            filename: 'docs/index.html',
            inlineSource: '.(js|css)$', // embed all javascript and css inline
            template: './src/html/index.html',
            minify: {
                minifyJS: true,
                minifyCSS: true
            },
            // hash: false
        }),
        new HtmlWebpackPlugin({
            filename: 'docs/bakersnotebook/privacy.html',
            chunks: ['privacy.js'],
            template: './src/bakersnotebook/privacy.html',
            minify: {
                minifyJS: true,
                minifyCSS: true
            },
            // hash: false
        }),
        //new HtmlWebpackInlineSourcePlugin(),
        // new CopyWebpackPlugin([ 
        //     { from: 'dist/index.html', to: '../', force: true }
        // ],
        //     { copyUnmodified: true }
        // )
    ]
};