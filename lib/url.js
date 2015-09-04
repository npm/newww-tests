var url = require('url');

module.exports = function(path) {
  var u = url.parse(process.env.NPM_SELENIUM_URL || 'https://staging.npmjs.com');
  if (path) {
    u.pathname = path
  }
  return url.format(u);
};
