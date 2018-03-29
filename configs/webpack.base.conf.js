const path = require('path');
const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (libraryName, basePath) => ({
  mode: 'development',
  entry: ['./index.ts'],
  output: {
      path: path.join(basePath, 'dist'),
      filename: 'index.js',
      library: libraryName,
      libraryTarget: "umd",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: basePath,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
    }]
  },
});
