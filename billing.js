var Nemo = require('nemo');

var tap = require('tap');

var nemo = Nemo(__dirname, function(err) {
  tap.error(err);

  if (err) return;

  nemo.driver.getCapabilities().then(function(caps) {
    tap.pass("Nemo successfully launched " + caps.caps_.browserName);
  }).then(null, function(err) {
    tap.error(err);
  }).then(function() {
    tap.test("Let's get billing!", function(t) {
      nemo.driver.get('https://staging.npmjs.com');
      nemo.view.signup.signupLink().click();
      nemo.view.signup.usernameWaitVisible().sendKeys('test' + Date.now());
      nemo.view.signup.password().sendKeys('test123');
      nemo.view.signup.verify().sendKeys('test123');
      nemo.view.signup.email().sendKeys('aria@npmjs.com');
      nemo.view.signup.makeItSo().click();
      //nemo.driver.quit();
      t.pass();
      t.end();
    });
  });
});
