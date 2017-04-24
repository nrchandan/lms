// Allows us to use ES6 in our migrations and tests.
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    private: {
      host: 'localhost',
      port: 8089,
      network_id: '*'
    }
  }
}
