/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();

app.import('bower_components/number-formatter/lib/format.js');

module.exports = app.toTree();
