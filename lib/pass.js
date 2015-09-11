module.exports = function pass(t, message) {
  return function() {
    t.pass(message);
  };
}
