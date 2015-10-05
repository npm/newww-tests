var Nemo = require('nemo');

var tap = require('tap');
var urlOf = require('./lib/url');
var pass = require('./lib/pass');
var fillStripeForm = require('./lib/fillStripeForm');

var P = require('bluebird');

require('./lib/sharedNemo').then(function(nemo) {
  tap.test("Pay for one month of who's hiring", {
    bail: true
  }, function(t) {
    P.all([
      nemo.driver.get(urlOf('/joinwhoshiring')).then(pass(t, 'loaded page')),
      nemo.view.joinwhoshiring.oneMonthLink().click().then(pass(t, 'clicked form')),
      fillStripeForm(t, nemo).then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible().then(pass(t, 'got success'));
      }).then(pass(t, 'form filled'))
    ]).catch(t.error).then(t.end);
  });

  tap.test("Pay for three months of who's hiring", {
    bail: true
  }, function(t) {
    P.all([
      nemo.driver.get(urlOf('/joinwhoshiring')).then(t.pass),
      nemo.view.joinwhoshiring.threeMonthsLink().click().then(t.pass),
      fillStripeForm(t, nemo).then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible();
      }).then(t.pass)
    ]).catch(t.error).then(t.end);
  })

  tap.test('close driver', function(t) {
    if (!module.parent) {
      nemo.driver.quit();
    }
    t.end();
  });

}).catch(tap.error).then(tap.end);
