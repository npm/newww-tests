var tap = require('tap');
var urlOf = require('./lib/url');
var P = require('bluebird');

require('./signup');
require('./logout');

tap.test('join beta', function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    return nemo.driver.get(urlOf('/orgs?join-beta')).then(function() {
      return P.all([
        nemo.view.login.nameWaitVisible(),
        nemo.view.login.name().sendKeys(nemo.state.username),
        nemo.view.login.password().sendKeys('test123'),
        nemo.view.login.loginButton().click(),
        nemo.view.nav.usernameWaitVisible()
      ]).then(t.ok);
    });
  }).catch(function(error) {
    t.error(error);
    t.bailout();
  }).then(t.end);
});
