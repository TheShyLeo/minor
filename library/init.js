'use strict';

global.shared = require('./util/shared');
global.logger = require('./util/logger');

module.exports = function (app, path) {
  shared.set('child_pid', []);
  shared.set('root', path);
  shared.set('base', {
    "page": require('./base/page'),
    "data": require('./base/data'),
    "dao": require('./base/dao')
  });
};