module.exports = (libraryName, basePath) => {
  const config = require('./webpack.base.conf.js')(libraryName, basePath);
  const path = require('path');
  const webpack = require('webpack');

  config.devtool = 'source-map-inline';

  if(!config.plugins) config.plugins = [];

  config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|tsx)($|\?)/i // process .js and .ts files only
    })
  );

  config.module.rules.push({
    enforce: 'post',
    test: /\.(ts|tsx)$/,
    loader: 'istanbul-instrumenter-loader',
    include: path.resolve('src/'),
    exclude: [
      /\.test\.(ts|tsx)$/,
    ]
  });

  return config;
};
