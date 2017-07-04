const webpack = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let config = function (env) {
    let conf = {
        entry: "./src/index.tsx",
        output: {
            filename: "bundle.js",
            path: __dirname + "/dist"
        },
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
                {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env || 'production')
            })
        ]
    };

    if(!env || env == 'production') conf.plugins.push(new UglifyJSPlugin());

    return conf;
};

module.exports = config;