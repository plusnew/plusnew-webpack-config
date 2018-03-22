const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (libraryName, distPath) => ({
  mode: 'development',
  entry: ['./index.ts'],
  output: {
      path: distPath,
      filename: 'index.js',
      library: libraryName,
      libraryTarget: "umd",
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ]
  },
  plugins: [
    new CleanWebpackPlugin(distPath),
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
    }]
  },
});
