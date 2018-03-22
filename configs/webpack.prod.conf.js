module.exports = (libraryName, distPath) => {
  const config = require('./webpack.base.conf.js')(libraryName, distPath);
  config.mode = 'production';

  return config;
}
