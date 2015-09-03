var tap = require('tap');

tap.test("Sign up a user", function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    return nemo.driver.getCapabilities().then(function(caps) {
      t.pass("Nemo successfully launched " + caps.caps_.browserName);
      return nemo;
    })
  }).then(function(nemo) {
    nemo.driver.get(process.env.NPM_SELENIUM_URL || 'https://staging.npmjs.com');
    nemo.view.signup.signupLink().click();
    nemo.view.signup.usernameWaitVisible().sendKeys('test' + Date.now());
    nemo.view.signup.password().sendKeys('test123');
    nemo.view.signup.verify().sendKeys('test123');
    nemo.view.signup.email().sendKeys('aria+test@npmjs.com');
    nemo.view.signup.makeItSo().click();
    nemo.view.page.h1WaitVisible();
    return nemo.view.page.h1TextEquals("edit your profile").then(t.pass);
  }).catch(function(error) {
    t.error(error);
    t.bailout();
  }).then(t.end);
});
