const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
require('webpack-dev-server');

module.exports = merge(commonConfig, {
  watch: true,
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../packages/src/index.tsx'),
    path.resolve(__dirname, '../packages/component-library/index.ts'),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
});
