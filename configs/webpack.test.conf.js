module.exports = (libraryName, basePath) => {
  const config = require('./webpack.base.conf.js')(libraryName, basePath);
  const path = require('path');
  const webpack = require('webpack');
  const fs = require('fs');

  const testfiles = ['./src/index.ts'];
  
  function getTestFiles(dir) {
    const actualDir = path.join(basePath, dir);
    fs.readdirSync(actualDir).forEach((file) => {
      const filePath = path.join(dir, file);
      const actualFilePath = path.join(basePath, dir, file);
      // console.log(actualFilePath);
      if(fs.statSync(actualFilePath).isDirectory()) {
        console.log('DIR:' + filePath, actualFilePath)
        getTestFiles(filePath);
      } else if(filePath.match(/.spec.(tsx|ts)/)) {
        testfiles.push('./' + filePath);
      }
    });
  }

  getTestFiles('test');

  config.entry = testfiles; //testfiles.map(testFile => testFile.slice(0, 4) === 'src/' ? testFile.slice(4) : '../' + testFile);
  config.output.filename = 'index.test.js';
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
