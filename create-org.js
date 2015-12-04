var tap = require('tap');
var urlOf = require('./lib/url');
var pass = require('./lib/pass');
var P = require('bluebird');

require('./lib/sharedNemo').then(function(nemo) {
  nemo.state.desiredUsername = "test-org-" + Date.now();
  nemo.state.desiredOrgScope = "test-org-scope" + Date.now();
  require('./signup');

  tap.test('create org', {
    bail: true
  }, function(t) {
    return P.all([
      nemo.driver.get(urlOf('/org/create')),
      nemo.view.createOrg.h1TextEquals('Create an Organization').then(pass(t, "Got to the right page")),
      nemo.view.createOrg.fullnameWaitVisible().then(pass(t, "Found form field")),
      nemo.view.createOrg.fullname().sendKeys(nemo.state.desiredUsername + "-org"),
      nemo.view.createOrg.orgScope().sendKeys(nemo.state.desiredOrgScope),
      nemo.view.createOrg.createOrgFormSubmit().click()
    ]).then(function() {
      return P.all([
        nemo.view.createOrg.h1WaitVisible().then(pass(t, "Billing org page navigated to")),
        nemo.view.createOrg.h1TextEquals('Billing information'),
        nemo.view.createOrg.cardNumber().sendKeys('4242 4242 4242 4242').then(pass(t, "card number entered")),
        nemo.view.createOrg.cardCVC().sendKeys('434').then(pass(t, "cvc entered")),
        nemo.view.createOrg.cardExpMonth().sendKeys('8').then(pass(t, "expiration month entered")),
        nemo.view.createOrg.cardExpYear().sendKeys(new Date().getFullYear() + 3).then(pass(t, "exp year entered")),
        nemo.view.createOrg.paymentFormSubmit().click()
      ])
    }).then(function() {
      return P.all([
        nemo.view.createOrg.h2WaitVisible().then(pass(t, "Packages header visible")),
        nemo.view.createOrg.h2TextEquals('0 packages'),
        nemo.view.nav.username().getText().then(textEquals(t, nemo.state.desiredUsername)).then(pass(t, "Username correct")),
        nemo.view.createOrg.h1TextEquals("@" + nemo.state.desiredOrgScope).then(pass(t, "Org name correct")),
      ])
    }).then(t.ok).catch(t.error).then(t.end);
  });
});

function textEquals(t, expected) {
  return function(text) {
    t.equals(expected, text);
  }
}
