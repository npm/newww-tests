var Nemo = require('nemo');

var tap = require('tap');
var urlOf = require('./lib/url.js');

var nemo = Nemo(__dirname, function(err) {
  tap.error(err);

  if (err) return;

  nemo.driver.getCapabilities().then(function(caps) {
    tap.pass("Nemo successfully launched " + caps.caps_.browserName);
  }).then(null, function(err) {
    tap.error(err);
  }).then(function() {
    tap.test("Pay for one month of who's hiring", function(t) {
      nemo.driver.get(urlOf('/joinwhoshiring'));
      nemo.view.joinwhoshiring.oneMonthLink().click();
      nemo.driver.switchTo().frame("stripe_checkout_app");
      nemo.view.joinwhoshiring.emailWaitVisible().sendKeys('test' + Date.now() + '@npmjs.com');
      nemo.view.joinwhoshiring.cardNumberWaitVisible().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.ccExp().sendKeys('12');
      nemo.view.joinwhoshiring.ccExp().sendKeys('16');
      nemo.view.joinwhoshiring.cvc().sendKeys('513');
      nemo.view.joinwhoshiring.submit().click();
      nemo.driver.switchTo().defaultContent().then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible();
      }).then(function(html) {
        //nemo.driver.quit();
        t.pass();
        t.end();
      });
    });

    tap.test("Pay for three months of who's hiring", function(t) {
      nemo.driver.get(urlOf('/joinwhoshiring'));
      nemo.view.joinwhoshiring.threeMonthsLink().click();
      nemo.driver.switchTo().frame("stripe_checkout_app");
      nemo.view.joinwhoshiring.emailWaitVisible().sendKeys('test' + Date.now() + '@npmjs.com');
      nemo.view.joinwhoshiring.cardNumberWaitVisible().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.cardNumber().sendKeys('4242');
      nemo.view.joinwhoshiring.ccExp().sendKeys('12');
      nemo.view.joinwhoshiring.ccExp().sendKeys('16');
      nemo.view.joinwhoshiring.cvc().sendKeys('513');
      nemo.view.joinwhoshiring.submit().click();
      nemo.driver.switchTo().defaultContent().then(function() {
        return nemo.view.joinwhoshiring.successTextWaitVisible();
      }).then(function(html) {
        //nemo.driver.quit();
        t.pass();
        t.end();
      });
    });
  });
});
