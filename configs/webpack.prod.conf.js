module.exports = (libraryName, basePath) => {
  const config = require('./webpack.base.conf.js')(libraryName, basePath);
  config.mode = 'production';

  return config;
}
