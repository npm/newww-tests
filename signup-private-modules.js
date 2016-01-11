var tap = require('tap');
var urlOf = require('./lib/url');
var pass = require('./lib/pass');
var P = require('bluebird');

require('./lib/sharedNemo').then(function(nemo) {
  require('./signup');

  tap.test('sign up for private modules ', {
    bail: true
  }, function(t) {
    return P.all([
      nemo.driver.get(urlOf('/settings/billing/subscribe')),
      nemo.view.billing.cardNumberWaitVisible().then(pass(t, "card number field is visible")),
      nemo.view.billing.cardNumber().sendKeys("4242424242424242").then(pass(t, "sent account number")),
      nemo.view.billing.cardExpMonth().sendKeys("12").then(pass(t, "sent month")),
      nemo.view.billing.cardExpYear().sendKeys("2016").then(pass(t, "sent year")),
      nemo.view.billing.cardCVC().sendKeys("513").then(pass(t, "sent cvv")),
      nemo.view.billing.submit().click().then(pass(t, "submitted form")),
      nemo.view.billing.noticeWaitVisible().then(pass(t, "found notice"))
    ]).then(function() {
      if (!module.parent) {
        return nemo.driver.quit();
      }
    }).catch(t.error).then(t.end);
  });
});
