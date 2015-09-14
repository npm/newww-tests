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
      nemo.driver.get(urlOf('/settings/billing')),
      nemo.view.billing.cardNumberWaitVisible().then(pass(t, "card number field is visible")),
      nemo.view.billing.cardNumber().sendKeys("4242424242424242"),
      nemo.view.billing.cardExpMonth().sendKeys("12"),
      nemo.view.billing.cardExpYear().sendKeys("16"),
      nemo.view.billing.cardCVC().sendKeys("513"),
      nemo.view.billing.submit().click(),
      nemo.view.billing.noticeWaitVisible()
    ]).then(t.ok).catch(t.error).then(t.end);
  });
});
