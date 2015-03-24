import Em from 'ember';
import LlamaCell from './llama-cell';
var get = Em.get;
var addObserver = Em.addObserver;
var removeObserver = Em.removeObserver;
var ESC = 27;

var LlamaBodyCell = LlamaCell.extend({
	templateName: 'llama-body-cell',
	classNames: 'llama-body-cell',
	classNameBindings: ['hover', 'columnIsClickable', 'rowIsClickable', 'isClickable'],
	attributeBindings: ['tabindex'],
	tabindex: 0,
	hover: false,
	height: Em.computed.alias('controller.rowHeight'),
	columnIsClickable: Em.computed.alias('column.isClickable'),
	rowIsClickable: Em.computed.alias('controller.enableRowClick'),
	isClickable: Em.computed.or('columnIsClickable', 'rowIsClickable'),

	column: null,
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
		this._super();
		var row = this.get('row');
		var observes = this.get('observedFields');
		addObserver(row, observes, this, 'updateValue');
	},

	willDestroyElement: function () {
		var row = this.get('row');
		var observes = this.get('observedFields');
		removeObserver(row, observes, this, 'updateValue');
		this._super();
	},

	setHeight: function () {
		var $cell = this.$();
		if ($cell) {
			$cell.css('height', this.get('height'));
		}
	}.on('didInsertElement').observes('height'),

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

	mouseEnter: function () {
		var row = this.get('row');
		this.get('controller').send('highlightRow', row);
	},

	mouseLeave: function () {
		this.get('controller').send('stopHighlightingRows');
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

	focusIn: function () {
		var controller = this.get('controller');
		var row = this.get('row');
		var column = this.get('column');
		controller.send('focusCell', row, column);
		return false;
	},

	keyDown: function (e) {
		if (e.which === ESC) {
			this.$().blur();
		}
		else {
			this._super(e);
		}
	}
});

export default LlamaBodyCell;
