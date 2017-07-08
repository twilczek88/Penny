//Konfiguracja Webpack
const path = require("path");
module.exports = {
    entry: ['./js/input.jsx', './scss/main.scss'],
    output: {
        path: path.resolve("js"),
        filename: "output.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            },
            {
                //npm install style-loader css-loader --save-dev
                //npm install node-sass sass-loader --save-dev
                //npm install autoprefixer-loader --save-dev
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader' ]

            }
        ]
    }
}

//dev server
//sudo npm install webpack-dev-server --save-dev

//localinstall webpack
//sudo npm install --save-dev webpack
//launch
//./node_modules/.bin/webpack-dev-server --inline --hot
