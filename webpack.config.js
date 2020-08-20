const path = require('path')
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const finalPath = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => ({
    mode: argv.mode,
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: finalPath,
        filename: 'app.js',
        chunkFilename: '[name].js',
    },
    resolve: {
        alias: {
            img: path.resolve(__dirname, 'src/img'),
            js: path.resolve(__dirname, 'src/js'),
            home: path.resolve(__dirname, 'src/js/home'),
            about: path.resolve(__dirname, 'src/js/about'),
            work: path.resolve(__dirname, 'src/js/work'),
            font: path.resolve(__dirname, 'src/fonts'),
        },
    },
    // stats: false,
    performance: {
        hints: false
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
                extractComments: true,
                sourceMap: argv.mode === 'development',
                terserOptions: {
                    ecma: 6,
                    ie8: false,
                    compress: true,
                    warnings: false,
                },
            }),
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: argv.mode === 'development',
            // }),
            // new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    name: 'vendors',
                    // sync + async chunks
                    chunks: 'all',
                    // import file path containing node_modules
                    test: /node_modules/
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: argv.mode === 'development',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: argv.mode === 'development',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            syntax: 'postcss-scss',
                            sourceMap: argv.mode === 'development',
                            plugins() {
                                return [require('autoprefixer'), require('postcss-combine-duplicated-selectors'), require('postcss-discard-duplicates')];
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: argv.mode === 'development',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                    },
                }, ],
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader',
                ],
            },
        ],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         //{ from: './src/fonts', to: path.join(finalPath, '/fonts'), force: true },
        //         { from: './src/img', to: path.join(finalPath, '/img'), force: true },
        //     ],
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
            chunkFilename: '[id].css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: '.' },
        })
    ]
})
