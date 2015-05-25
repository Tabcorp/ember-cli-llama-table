import Em from 'ember';
import LlamaCell from './llama-cell';
var get = Em.get;
var set = Em.set;
var defineProperty = Em.defineProperty;
var deprecate = Em.deprecateFunc;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var or = computed.or;
var and = computed.and;
var bool = computed.bool;
var empty = computed.empty;
var gt = computed.gt;
var ESC = 27;
var SPACE = 32;

var LlamaBodyCell = LlamaCell.extend({
	templateName: 'llama-body-cell',
	classNames: 'llama-body-cell',
	classNameBindings: ['hover', 'columnIsClickable', 'rowIsClickable', 'isClickable', 'isEmpty', 'showingSubcontent', 'isEditable'],
	attributeBindings: ['tabindex'],
	hover: false,
	height: alias('row.height'),
	columnIsClickable: alias('column.isClickable'),
	rowIsBody: gt('row.contentIndex', -1),
	rowIsClickable: and('controller.enableRowClick', 'rowIsBody'),
	isClickable: or('columnIsClickable', 'rowIsClickable'),
	showingSubcontent: bool('row.isExpanded'),
	isEmpty: empty('value'),
	isEditable: bool('column.isEditable'),
	isFooter: false,

	column: null,
	row: null,

	cell: null,
	value: alias('cell'),
	formatted: alias('value'),

	tabindex: computed('isEditable', function () {
		var onlyFocusEditable = this.get('controller.onlyFocusEditable');
		var isEditable = this.get('isEditable');
		var index = onlyFocusEditable && !isEditable ? null : 0;
		return index;
	}),

	// only calculated once
	observedFields: computed(function () {
		var observes = this.get('column.observes');
		if (!Em.isEmpty(observes)) {
			return observes;
		}
		var id = this.get('column.name');
		return id;
	}),

	marginBottom: computed('showingSubcontent', 'row.subcontentHeight', function () {
		var isExpanded = this.get('showingSubcontent');
		if (isExpanded) {
			return this.get('row.subcontentHeight');
		}
		return null;
	}),

	setHeight: observer('height', function () {
		var $cell = Em.$(this.$());
		$cell.css('height', this.get('height'));
	}).on('didInsertElement'),

	setMarginBottom: observer('marginBottom', function () {
		var $cell = Em.$(this.$());
		$cell.css('marginBottom', this.get('marginBottom') || 0);
	}).on('didInsertElement'),

	getValue: deprecate('Override `value` property instead', function () {}),

	updateValue: deprecate('Override `value` property instead', function () {}),

	buildComputedValue: observer('column.name', function () {
		var columnName = this.get('column.name');
		var prop = alias('row.' + columnName);
		defineProperty(this, 'cell', prop);
	}).on('init'),

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
		else if (e.which === SPACE) {
			this.send('primaryAction', e);
		}
		else {
			this._super(e);
		}
	},

	actions: {
		primaryAction: function (e) {
			// cancel action by default
			e.preventDefault();
		}
	}
});

export default LlamaBodyCell;
