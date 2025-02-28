import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        oneOf: [
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                            }
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ],

    }

    const tsxLoader = {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
            getCustomTransformers: () => ({ // Hot Module Replacement
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
        },
        exclude: /node_modules/,
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
            }

],
    }


    return [scssLoader, tsxLoader, assetLoader, svgLoader]
}