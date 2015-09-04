var tap = require('tap');
var urlOf = require('./lib/url');

tap.test("Sign up a user", function(t) {
  require('./lib/sharedNemo').then(function(nemo) {
    nemo.driver.get(urlOf('/'));
    nemo.view.nav.signupLink().click();
    nemo.view.signup.usernameWaitVisible().sendKeys(nemo.state.desiredUsername || 'test-' + Date.now());
    nemo.view.signup.password().sendKeys('test123');
    nemo.view.signup.verify().sendKeys('test123');
    nemo.view.signup.email().sendKeys('aria+test@npmjs.com');
    nemo.view.signup.makeItSo().click();
    nemo.view.page.h1WaitVisible();
    nemo.view.page.h1TextEquals("edit your profile").then(t.pass);
    return nemo.view.nav.username().getText().then(function(text) {
      t.ok(text);
      nemo.state.username = text;
    });
  }).catch(function(error) {
    t.error(error);
    t.bailout();
  }).then(t.end);
});
