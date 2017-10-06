const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const copyFiles = [
    {
        from: './node_modules/angular-material/angular-material.min.css',
        to: 'css/angular-material.min.css'
    },
    {
        from: './website/assets/styles/styles.css',
        to: 'css/styles.css'
    },
    {
        from: './website/templates/index.html',
        to: 'index.html'
    },
    {
        from: './website/views',
        to: 'views'
    },
    {
        from: './website/assets',
        to: 'assets'
    }
];
const config = {
    entry: {
        app: path.resolve(__dirname, './website/js/index.js'),
        vendors: [
            'angular',
            'angular-route',
            'angular-animate',
            'angular-aria',
            'angular-messages',
            'angular-material',
            'angular-sanitize',
            'angular-material-icons'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js'
    },
    resolve: {
        alias: {
            code: path.resolve(__dirname, './website/js')
        }
    },
    module: {
        noParse: []
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'js/vendors.js' }),
        new CopyWebpackPlugin(copyFiles)
    ]
};
const deps = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-aria/angular-aria.min.js',
    './node_modules/angular-messages/angular-messages.min.js',
    './node_modules/angular-material/angular-material.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    './node_modules/angular-material-icons/angular-material-icons.min.js'
];
for (let i of deps) {
    const pt = path.resolve(__dirname, i);
    config.resolve.alias[i.split(path.sep)[1]] = pt;
    config.module.noParse.push(pt);
}
module.exports = config;
