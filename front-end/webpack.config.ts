const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { Configuration } from 'webpack';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig: Configuration = {
    mode: "production",
    entry: {
        homepage: './src/views/homepage/index.ts',
        database: './src/views/database/database.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/javascript/[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|pdf|docx?)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/resources/[contenthash][ext][query]',
                },
            },
        ],
    },
    //   devServer: {
    //     contentBase: './dist',
    //   },
    plugins: [
        new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
        new HtmlWebpackPlugin({
            template: './src/views/homepage/index.html',
            filename: 'views/index.html',
            chunks: ['homepage'],
        }),
        new HtmlWebpackPlugin({
          template: './src/views/database/database.html',
          filename: 'views/database.html',
          chunks: ['database'],
        }),
        // new HtmlWebpackPlugin({
        //   template: './src/contact.html',
        //   filename: 'views/contact.html',
        //   chunks: ['contact'],
        // }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[contenthash].css',
          }),
    ],
    optimization: {
        chunkIds: 'deterministic',
      },
};

export default webpackConfig;