var lms = artifacts.require("./lms.sol");

contract('lms', function(accounts) {
  it("String testing", function() {
    return lms.deployed().then(function(instance) {
      return instance.addMemberWithBooks.call("name", "Ethereum|Ben Abner|CreateSpace;Title2|Author2|Publisher2", ";", "|");
    }).then(function(somestring) {
      console.log("hello world");
      assert.equal(somestring, "Ethereum");
    });
  });
});
