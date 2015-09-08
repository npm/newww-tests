var tap = require('tap');
var urlOf = require('./lib/url');
var P = require('bluebird');

require('./lib/sharedNemo').then(function(nemo) {
  nemo.state.desiredUsername = 'test-org-' + Date.now();

  require('./signup');
  require('./logout');

  tap.test('join beta', function(t) {
    return P.all([
      nemo.driver.get(urlOf('/orgs?join-beta')),
      nemo.view.login.nameWaitVisible(),
      nemo.view.login.name().sendKeys(nemo.state.username),
      nemo.view.login.password().sendKeys('test123'),
      nemo.view.login.loginButton().click(),
      nemo.view.nav.usernameWaitVisible(),
      nemo.view.org.bannerInfoTextEquals('Organizations are here!')
    ]).then(t.ok).catch(function(error) {
      t.error(error);
      t.bailout();
    }).then(t.end);
  });
});
