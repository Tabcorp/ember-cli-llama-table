import Em from 'ember';
import LlamaCell from './llama-cell';
import ArrowKeysMixin from 'llama-table/mixins/arrow-keys';
var get = Em.get;
var addObserver = Em.addObserver;
var removeObserver = Em.removeObserver;

var LlamaBodyCell = LlamaCell.extend(ArrowKeysMixin, {
	templateName: 'llama-body-cell',
	classNames: 'llama-body-cell',
	classNameBindings: ['hover', 'isClickable'],
	attributeBindings: ['tabindex'],
	tabindex: 0,
	hover: false,
	isClickable: Em.computed.alias('column.isClickable'),

	// column definition
	column: null,

	// table definition
	row: null,

	// only calculated once
	observedFields: function () {
		var observes = this.get('column.observes');
		if (!Em.isEmpty(observes)) {
			return observes;
		}
		var id = this.get('column.name');
		return id;
	}.property(),

	didInsertElement: function () {
		var row = this.get('row');
		var observes = this.get('observedFields');
		addObserver(row, observes, this, 'updateValue');
	},

	willDestroyElement: function () {
		var row = this.get('row');
		var observes = this.get('observedFields');
		removeObserver(row, observes, this, 'updateValue');
	},

	getValue: function () {
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		return value;
	},

	updateValue: function () {
		var value = this.getValue();
		this.set('value', value);
	}.on('init').observes('column'),

	getColumnIndex: function () {
		var column = this.get('column');
		var columns = this.get('controller.sortedColumns');
		columns = columns.filter(function (column) {
			return !column.get('isHidden');
		});
		return columns.indexOf(column);
	},

	getRowIndex: function () {
		var row = this.get('row');
		var rows = this.get('controller.sortedRows');
		return rows.indexOf(row);
	},

	updateHoverState: function () {
		var hover = this.get('hover');
		var rowIndex = this.getRowIndex();
		var columns = this.get('controller').getBodyColumnViews();
		columns.forEach(function (column) {
			column.get('cellViews')
				.objectAt(rowIndex)
				.set('hover', hover);
		});
	}.observes('hover'),

	mouseEnter: function () {
		this.set('hover', true);
	},

	mouseLeave: function () {
		this.set('hover', false);
	},

	click: function () {
		var controller = this.get('controller');
		var row = this.get('row');
		var column = this.get('column');
		if (this.get('isClickable')) {
			controller.sendAction('cellClick', row, column);
		}
		if (controller.get('enableRowClick')) {
			controller.sendAction('rowClick', row);
		}
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
