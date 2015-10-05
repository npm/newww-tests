var tap = require('tap');
var urlOf = require('./lib/url');
var P = require('bluebird');

require('./signup');

tap.test("Log out a user", function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    return P.all([
      nemo.driver.get(urlOf('/')),
      nemo.view.nav.logoutLink().click(),
      nemo.view.nav.loginLinkWaitVisible()
    ]).then(t.ok).then(function() {
      if (!module.parent) {
        nemo.driver.quit();
      }
    });
  }).catch(function(error) {
    t.error(error);
    t.bailout();
  }).then(t.end);
});
