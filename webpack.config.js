const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/app.ts", // starting point of project
    output: {
        path: path.resolve(__dirname, 'dist'), // Webpack requires an absolute path
        filename: "main.js", // compiled TypeScript code bundled in plain JavaScript code
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        open: true, // open browser
        overlay: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // search for files that end with .ts to apply a given rule
                use: "ts-loader",
                exclude: /node_modules/ // don't take into account node_modules folder
            },
            {
                test: /\.s?css$/,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'Fonts/',
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: 'url-loader?mimetype=image/png'
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [new htmlWebpackPlugin({
        template: "./src/html/index.html"
    }),
        new miniCssExtractPlugin()
    ]
};