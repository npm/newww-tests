var pass = require('./pass');
var P = require('bluebird');

module.exports = function fillStripeForm(t, nemo) {
  return nemo.view.stripeCheckout.frame().then(function() {
    return nemo.view.stripeCheckout.frame();
  }).then(function(el) {
    return nemo.driver.switchTo().frame(el).then(pass(t, 'switched frame'));
  }).then(function() {
    return P.all([
      nemo.view.joinwhoshiring.emailWaitVisible().sendKeys('test' + Date.now() + '@npmjs.com').then(t.pass),
      nemo.view.joinwhoshiring.cardNumberWaitVisible().sendKeys('4242'),
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242'),
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242'),
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242'),
      nemo.view.joinwhoshiring.ccExp().sendKeys('12'),
      nemo.view.joinwhoshiring.ccExp().sendKeys('16'),
      nemo.view.joinwhoshiring.cvc().sendKeys('513'),
      nemo.view.joinwhoshiring.submit().click().then(pass(t, 'submitted payment'))
    ]).then(function() {
      nemo.driver.switchTo().defaultContent()
    });
  });
};
