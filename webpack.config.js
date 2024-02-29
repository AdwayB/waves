const webpack = require('webpack');
require('webpack-dev-server');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  watch: true,
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
    hot: true,
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
        test: /\.(png|jp(e*)g|svg|woff(2)?|ttf|eot|pdf|gif|cur)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
