import Em from 'ember';
import Column from 'llama-table/controllers/column';
import { makeArray } from 'llama-table/computed';
var computed = Em.computed;
var map = computed.map;
var sort = computed.sort;
var reads = computed.reads;

var SortedColumnsMixin = Em.Mixin.create({
	_columnsSource: makeArray('columns'),

	_columnsSortOrder: ['order'],

	_columnsMapped: map('_columnsSource', function (model) {
		return Column.create({ model });
	}),

	_columnsSorted: sort('_columnsMapped', '_columnsSortOrder'),

	/**
	 * Column definitions array with added sorting functionality.
	 * @property {Ember.ArrayProxy} sortedColumns
	 */
	sortedColumns: reads('_columnsSorted'),
});

export default SortedColumnsMixin;
