var urlr = require('url-resolve');


module.exports = function(fragment) {
  return urlr(process.env.NPM_SELENIUM_URL || 'https://staging.npmjs.com', fragment);
};
