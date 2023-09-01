const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/weather',
    createProxyMiddleware({
      target: 'http://api.weatherstack.com/',
      changeOrigin: true,
    })
  );
};