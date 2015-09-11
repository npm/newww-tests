var Nemo = require('nemo');

var tap = require('tap');
var urlOf = require('./lib/url.js');

var P = require('bluebird');

require('./lib/sharedNemo').then(function(nemo) {
  tap.test("Pay for one month of who's hiring", {
    bail: true
  }, function(t) {
    P.all([
      nemo.driver.get(urlOf('/joinwhoshiring')).then(pass(t, 'loaded page')),
      nemo.view.joinwhoshiring.oneMonthLink().click().then(pass(t, 'clicked form')),
      fillStripeForm(t).then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible().then(pass(t, 'got success'));
      }).then(pass(t, 'form filled'))
    ]).catch(t.error).then(t.end);
  });

  function fillStripeForm(t) {
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
  }

  function pass(t, message) {
    return function() {
      t.pass(message);
    };
  }

  tap.test("Pay for three months of who's hiring", {
    bail: true
  }, function(t) {
    P.all([
      nemo.driver.get(urlOf('/joinwhoshiring')).then(t.pass),
      nemo.view.joinwhoshiring.threeMonthsLink().click().then(t.pass),
      fillStripeForm(t).then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible();
      }).then(t.pass)
    ]).catch(t.error).then(t.end);
  })
}).catch(tap.error).then(tap.end);
