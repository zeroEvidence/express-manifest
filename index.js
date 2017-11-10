var _ = require('lodash');
var defaults = require('./defaults');

module.exports = function(config) {

  return require('./lib/manifestHelper')(config);
};
