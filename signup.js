var tap = require('tap');
var urlOf = require('./lib/url');
var pass = require('./lib/pass');

tap.test("Sign up a user", function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    var desiredUsername = nemo.state.desiredUsername || 'test-' + Date.now();
    t.pass("Signing up " + desiredUsername);
    nemo.driver.get(urlOf('/'));
    nemo.view.nav.signupLink().click();
    nemo.view.signup.usernameWaitVisible().sendKeys(desiredUsername);
    nemo.view.signup.password().sendKeys('test123');
    nemo.view.signup.verify().sendKeys('test123');
    nemo.view.signup.email().sendKeys('blackhole+' + desiredUsername + '@npmjs.com');
    nemo.view.signup.makeItSo().click();
    nemo.view.page.h1WaitVisible();
    nemo.view.page.h1TextEquals("edit your profile").then(t.pass);
    return nemo.view.nav.username().getText().then(function(text) {
      t.ok(text, 'username is shown');
      nemo.state.username = text;
      t.pass("signed up " + text);
    }).then(function() {
      if (!module.parent) {
        return nemo.driver.quit();
      }
    });
  }).catch(function(error) {
    t.error(error);
    t.bailout();
  }).then(t.end);
});
