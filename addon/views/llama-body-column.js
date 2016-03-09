import Em from 'ember';
import LlamaColumn from './llama-column';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;

var LlamaBodyColumn = LlamaColumn.extend({
	classNames: 'llama-body-column',
	contentBinding: 'subsetRows',
	currentPage: computed.alias('controller.currentPage'),
	rowsPerPage: computed.alias('controller.rowsPerPage'),

	rows: null,
	column: null,

	subsetRows: computed('currentPage', 'rowsPerPage', 'rows.[]', function() {
		const currentPage = this.get('currentPage');
		const rowsPerPage = this.get('rowsPerPage');

		if (!currentPage && !rowsPerPage) {
			return this.get('rows');
		} else {
			const zeroedStart = !!currentPage ? currentPage - 1 : 0;

			const start = zeroedStart * rowsPerPage;
			const finish = start + rowsPerPage;

			return this.get('rows').slice(start, finish);
		}
	}),

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
