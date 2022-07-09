const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    webpack: {
        plugins: {
            remove: ['ReactRefreshPlugin'],
            add: [
                new ReactRefreshPlugin({
                    exclude: [/^http.*/, /node_modules/],
                    overlay: false
                })
            ]
        },
        configure: (webpackConfig, {
            env,
            paths
        }) => {
            const shouldUseReactRefresh = process.env.FAST_REFRESH !== 'false';
            // Source maps are resource heavy and can cause out of memory issue for large source files.
            const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
            const isDev = env === "development";

            const cssLoaders = []

            if(isDev) {
                cssLoaders.push(
                    {
                        test: /\.(css|scss)$/,
                        use: ["style-loader", "css-loader", "sass-loader"],
                    }
                )
            } else {
                cssLoaders.push(
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: shouldUseSourceMap
                                }
                            }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: shouldUseSourceMap
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: shouldUseSourceMap
                                }
                            }
                        ]
                    }
                )
            }

            webpackConfig = {
                ...webpackConfig,
                module: {
                    rules: [
                        {
                            test: /\.(woff2?|jpe?g|png|gif|ico)$/,
                            use: 'file-loader?name=' + webpackConfig.output.assetModuleFilename
                        },
                        {
                            test: /\.svg$/,
                            use: [{
                                    loader: require.resolve('@svgr/webpack'),
                                    options: {
                                        prettier: false,
                                        svgo: false,
                                        svgoConfig: {
                                            plugins: [{
                                                removeViewBox: false
                                            }],
                                        },
                                        titleProp: true,
                                        ref: true,
                                    },
                                },
                                {
                                    loader: require.resolve('file-loader'),
                                    options: {
                                        name: 'static/media/[name].[hash].[ext]',
                                    },
                                },
                            ],
                            issuer: {
                                and: [/\.(js|jsx|ts|tsx|md|mdx)$/],
                            },
                        },
                        {
                            test: /\.(js|jsx)$/,
                            exclude: [/^http.*/, /node_modules/],
                            loader: require.resolve("babel-loader"),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),
                                plugins: [
                                    isDev && shouldUseReactRefresh && require.resolve('react-refresh/babel'),
                                ].filter(Boolean),
                                presets: [
                                    [
                                        require.resolve('babel-preset-react-app'),
                                        {
                                            runtime: process.env.DISABLE_NEW_JSX_TRANSFORM !== "true" ? 'automatic' : 'classic',
                                        },
                                    ]
                                ],
                            }
                        },
                        ...cssLoaders
                    ]
                },
                experiments: {
                    buildHttp: {
                        allowedUris: [
                            "https://framer.com/m/",
                            "https://framerusercontent.com/",
                            "https://fonts.gstatic.com/",
                            "https://ga.jspm.io/",
                            "https://jspm.dev/",
                            "https://cdn.skypack.dev/",
                        ]
                    }
                },
            }


            return webpackConfig;
        }
    }
}