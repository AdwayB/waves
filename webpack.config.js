const webpack = require('webpack');
require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  watch: true,
  entry: './packages/src/index.tsx',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
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
      // favicon: 'public/favicon.ico'
    }),
    // new ForkTsCheckerWebpackPlugin(),
    // new BundleAnalyzerPlugin(), // Uncomment this line to show bundle analysis in web
    new MiniCssExtractPlugin(),
  ],
  cache: {
    type: 'filesystem',
    maxAge: 604800000,
  },
  devServer: {
    historyApiFallback: true,
    port: 3001,
    compress: true,
    host: '127.0.0.1',
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
              sourceMap: true, //TODO: Modify this on production. Make sourcemap false
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.mdx?$/,
        use: [{ loader: 'ts-loader' }, { loader: '@mdx-js/loader' }],
      },
    ],
  },
};
