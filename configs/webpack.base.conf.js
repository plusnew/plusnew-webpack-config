const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ]
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
    }]
  },
});
