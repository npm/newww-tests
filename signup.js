var tap = require('tap');
var urlOf = require('./lib/url');

tap.test("Sign up a user", function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    nemo.driver.get(urlOf('/'));
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
