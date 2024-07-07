const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  plugins: [
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 2,
      }),
      new CssMinimizerPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 244000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  stats: {
    warnings: false,
  },
});
