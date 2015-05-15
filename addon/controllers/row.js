import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var makeArray = Em.makeArray;
var computed = Em.computed;
var alias = computed.alias;
var reads = computed.reads;

/**
 * Adds some extra properties to row definitions.
 * @module controllers
 * @constructor
 * @class RowController
 * @extends Ember.ObjectProxy
 */
var RowController = Em.ObjectProxy.extend({
	content: alias('model'),
	contentIndex: computed('parentController.[]', function () {
		var array = this.get('parentController');
		var content = this;
		var index = makeArray(array).indexOf(content);
		return index;
	}),
	isExpanded: false,
	height: defaultValue('model.height', 30),
	subcontentHeight: reads('height')
});

export default RowController;
