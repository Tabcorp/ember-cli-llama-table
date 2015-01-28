import Em from 'ember';
import LlamaCell from './llama-cell';
import ArrowKeysMixin from 'llama-table/mixins/arrow-keys';
var get = Em.get;

var LlamaBodyCell = LlamaCell.extend(ArrowKeysMixin, {
	layoutName: 'llama-body-cell',
	classNames: 'llama-body-cell',
	attributeBindings: ['tabindex'],
	tabindex: 0,

	// column definition
	column: null,

	// table definition
	row: null,

	value: function () {
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		return value;
	}.property('column', 'row'),

	getColumnIndex: function () {
		var column = this.get('column');
		var columns = this.get('controller.columns');
		return columns.indexOf(column);
	},

	getRowIndex: function () {
		var row = this.get('row');
		var rows = this.get('controller.rows');
		return rows.indexOf(row);
	},

	mouseEnter: function () {
		var $this = this.$();
		var $body = $this.closest('.llama-body');
		var $columns = $body.find('.llama-column');
		var index = $this.index();
		$columns.each(function () {
			var $column = Em.$(this);
			var $cells = $column.find('.llama-cell');
			var $cell = $cells.eq(index);
			$cell.addClass('hover');
		});
	},

	mouseLeave: function () {
		var $this = this.$();
		var $body = $this.closest('.llama-body');
		var $columns = $body.find('.llama-column');
		var index = $this.index();
		$columns.each(function () {
			var $column = Em.$(this);
			var $cells = $column.find('.llama-cell');
			var $cell = $cells.eq(index);
			$cell.removeClass('hover');
		});
	},

	actions: {
		keyLeft: function () {
			var row = this.getRowIndex();
			var col = this.getColumnIndex();
			this.get('controller').send('focusLeft', row, col);
		},
		keyUp: function () {
			var row = this.getRowIndex();
			var col = this.getColumnIndex();
			this.get('controller').send('focusUp', row, col);
		},
		keyRight: function () {
			var row = this.getRowIndex();
			var col = this.getColumnIndex();
			this.get('controller').send('focusRight', row, col);
		},
		keyDown: function () {
			var row = this.getRowIndex();
			var col = this.getColumnIndex();
			this.get('controller').send('focusDown', row, col);
		}
	}
});

export default LlamaBodyCell;
