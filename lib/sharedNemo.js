var P = require('bluebird');
var Nemo = require('nemo');
var path = require('path');

module.exports = new P(function(accept, reject) {
  var nemo = Nemo(path.resolve(__dirname, '..'), function(err) {
    if (err) {
      reject(err);
    } else {
      accept(nemo);
    }
  });

  nemo.state = {};
}).then(function(nemo) {
  return nemo.driver.getCapabilities().then(function(caps) {
    return nemo;
  });
});
