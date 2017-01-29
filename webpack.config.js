'use strict';
var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source
    entry: {
        app: './src/javascript/index.js',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: 'bundle.js',
        publicPath: "/assets",
    },
    module: {
        rules: [
        {
            test: /\.js$/, //Check for all js files
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.(sass|scss)$/, //Check for sass or scss file names
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
        { 
            test: /\.json$/, 
            loader: "json-loader"  //JSON loader
        }
        ]
    },
    //To run development server
    devServer: {
        contentBase: __dirname + '/src',
    },
};
