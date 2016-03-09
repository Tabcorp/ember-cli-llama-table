import Em from 'ember';
import LlamaColumn from './llama-column';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;

var LlamaBodyColumn = LlamaColumn.extend({
	classNames: 'llama-body-column',
	contentBinding: 'visibleRows',
	currentPage: computed.alias('controller.currentPage'),
	rowsPerPage: computed.alias('controller.rowsPerPage'),

	rows: null,
	visibleRows: null,
	column: null,

	itemViewClass: computed(function () {
		var controller = this.get('controller');
		var column = this.get('column');
		var type = get(column, 'type');
		return controller.getCellType(type);
	}),

	createChildView: function (View, attrs) {
		var row = get(attrs, 'content');
		set(attrs, 'row', row);
		return this._super(View, attrs);
	}
});

export default LlamaBodyColumn;
