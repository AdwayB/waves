const webpack = require('webpack');
require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  watch: true,
  mode: 'development',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  entry: ['./packages/src/index.tsx', './packages/component-library/index.ts'],
  output: {
    publicPath: '/',
    filename: '[name].bundle.[contenthash].js',
    path: path.resolve(__dirname, '.dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './packages/src/assets/favicon.png',
    }),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: true,
    host: 'localhost',
    client: {
      overlay: false,
    },
  },
  watchOptions: { ignored: /node_modules/ },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|json)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015',
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|woff(2)?|ttf|eot|pdf|gif|svg|cur)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.mdx?$/,
        use: [{ loader: 'ts-loader' }, { loader: '@mdx-js/loader' }],
      },
    ],
  },
};
