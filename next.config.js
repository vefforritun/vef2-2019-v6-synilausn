const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  publicRuntimeConfig: {
    apiUrl: 'https://vefforritun2-2019-v4-synilausn.herokuapp.com/',
    // apiUrl: 'http://localhost:5000'
  },
});
