var tap = require('tap');
var urlOf = require('./lib/url');
var P = require('bluebird');
var pass = require('./lib/pass');

require('./lib/sharedNemo').then(function(nemo) {
  require('./signup');
  require('./logout');

  tap.test('ineligible user tries to join beta', {
    bail: true
  }, function(t) {
    return P.all([
      nemo.driver.get(urlOf('/orgs?join-beta')),
      nemo.view.login.nameWaitVisible(),
      nemo.view.login.name().sendKeys(nemo.state.username),
      nemo.view.login.password().sendKeys('test123'),
      nemo.view.login.loginButton().click(),
      nemo.view.page.h2WaitVisible(),
      nemo.view.page.h2TextEquals('Help us test Orgs').then(pass(t, "Got redirected to the info page"))
    ]).then(t.ok).catch(t.error).then(t.end);
  });
});
