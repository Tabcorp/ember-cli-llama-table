import Em from 'ember';
import RowsController from 'llama-table/controllers/rows';
var get = Em.get;

var LlamaTable = Em.Component.extend({
	layoutName: 'llama-table',
	classNames: 'llama-table-component',

	// column definitions
	columns: null,

	// table data
	rows: null,

	rowsController: function () {
		return RowsController.create({
			model: this.get('rows')
		});
	}.property('rows'),

	columngroups: function () {
		var columns = this.get('columns');
		// single group for now
		return [columns];
	}.property('columns'),

	findCellAtPosition: function (row, col) {
		var $columns = this.$('.llama-body-column');
		var $column = $columns.eq(col);
		var $cells = $column.find('.llama-body-cell');
		var $cell = $cells.eq(row);
		return $cell;
	},

	actions: {
		scrollX: function (pos) {
			this.$('.llama-header').css('marginLeft', -pos);
		},
		focusLeft: function (row, col) {
			var $cell = this.findCellAtPosition(row, col - 1);
			$cell.focus();
		},
		focusUp: function (row, col) {
			var $cell = this.findCellAtPosition(row - 1, col);
			$cell.focus();
		},
		focusRight: function (row, col) {
			var $cell = this.findCellAtPosition(row, col + 1);
			$cell.focus();
		},
		focusDown: function (row, col) {
			var $cell = this.findCellAtPosition(row + 1, col);
			$cell.focus();
		},
		sortBy: function (column) {
			var sortedRows = this.get('rowsController');
			var sortProperties = sortedRows.get('sortProperties');
			if (column === sortProperties[0]) {
				sortedRows.setProperties({
					sortAscending: !sortedRows.get('sortAscending')
				});
			}
			else {
				sortedRows.setProperties({
					sortProperties: [column],
					sortAscending: true
				});
			}
		}
	}
});

export default LlamaTable;
