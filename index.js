/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
	name: 'llama-table',

	included: function (app, parentAddon) {
		(app || parentAddon).import('bower_components/number-formatter/lib/format.js');
	},

	blueprintsPath: function () {
		return path.join(__dirname, 'blueprints');
	}
};
