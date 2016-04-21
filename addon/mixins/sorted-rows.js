import Em from 'ember';
import Row from 'llama-table/controllers/row';
import { makeArray } from 'llama-table/computed';
var computed = Em.computed;
var map = computed.map;
var sort = computed.sort;
var reads = computed.reads;

var SortedRowsMixin = Em.Mixin.create({
	_rowsSource: makeArray('rows'),

	_rowsSortOrder: makeArray('sortProperties'),

	_rowsMapped: map('_rowsSource', function (model) {
		if (!(model instanceof Row)) {
			return Row.create({ model });
		}

		return model;
	}),

	_rowsSorted: sort('_rowsMapped', '_rowsSortOrder'),

	/**
	 * Row values array with added sorting functionality. Uses a custom
	 *   'RowsController' if table has subcontent. Does not construct this
	 *   custom controller if it is not necessary.
	 * @property {Ember.ArrayProxy} sortedRows
	 */
	sortedRows: computed('_rowsMapped', '_rowsSortOrder', function () {
		if (Em.isEmpty(this.get('_rowsSortOrder'))){
			return this.get('_rowsMapped');
		} else {
			return this.get('_rowsSorted');
		}
	}),
});

export default SortedRowsMixin;
