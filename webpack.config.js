const HtmlPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const colors = require('colors');
const msBuilder = require('./src/app/metalsmith-builder');
const paths = require('./src/app/paths')

const { join, resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: join(__dirname, 'src', 'app', 'index.js'), 
    output: {
        path: paths.dist, 
        filename: join('js', 'bundle.js'),  
        //publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: join(__dirname, 'src', 'assets', 'style'),
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(jpg)$/,
                loader: 'file-loader',
                include: join(__dirname, 'src', 'assets', 'images'),
                options: {
                    outputPath: 'images',
                    //publicPath: './assets/images/'
                }
            }
        ]
    },
    plugins: [  
        {
            apply: (compiler) =>{
                compiler.hooks.beforeRun.tap('AdhocPlugin', (compilation) => {
                    msBuilder();
                })
            }
        },
        new CopyPlugin([
            { from: join(__dirname, 'ms-build'), to: join(__dirname, 'dist') }
        ]),
        // new CleanWebpackPlugin({
        //     dry: false,
        //     verbose: true,
        //     // cleanOnceBeforeBuildPatterns: ['../**/*'],  // also clean files produced by metalsmith
        //     // dangerouslyAllowCleanPatternsOutsideProject: true // required to step out of ./dist/assets
        // }),
        // new HtmlPlugin({
        //     //template: join(__dirname, 'src', 'public', 'index.html'),
        //     inject: 'body',
        //     hash: true,
        //     title: 'Bingi bongo',
        //     // filename: join(__dirname, 'dist', 'index.html')
        // })
    ],
};