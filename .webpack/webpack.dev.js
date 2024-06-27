const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
require('webpack-dev-server');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = merge(commonConfig, {
  watch: true,
  mode: 'development',
  entry: [path.resolve(__dirname, '../src/index.tsx')],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.WAVES_SERVER_URL': JSON.stringify(process.env.WAVES_SERVER_URL),
      'process.env.WAVES_USER_URL': JSON.stringify(process.env.WAVES_USER_URL),
      'process.env.WAVES_EVENTS_URL': JSON.stringify(process.env.WAVES_EVENTS_URL),
    }),
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
});
