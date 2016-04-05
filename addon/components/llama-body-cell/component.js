import Em from 'ember';
import LlamaCell from 'llama-table/components/llama-cell/component';
import { eq } from 'llama-table/computed';
import layout from './template';
var defineProperty = Em.defineProperty;
var deprecate = Em.deprecateFunc;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var or = computed.or;
var and = computed.and;
var bool = computed.bool;
var empty = computed.empty;
var not = computed.not;
var ESC = 27;
var SPACE = 32;

var LlamaBodyCell = LlamaCell.extend({
	layout: layout,
	classNames: 'llama-body-cell',
	classNameBindings: ['hover', 'columnIsClickable', 'rowIsClickable', 'isClickable', 'isEmpty', 'showingSubcontent', 'isEditable'],
	attributeBindings: ['tabindex'],
	height: alias('row.height'),
	columnIsClickable: alias('column.isClickable'),
	rowIsBody: not('isFooter'),
	rowIsClickable: and('root.enableRowClick', 'rowIsBody'),
	isClickable: or('columnIsClickable', 'rowIsClickable'),
	showingSubcontent: bool('row.isExpanded'),
	isEmpty: empty('value'),
	isEditable: bool('column.isEditable'),
	isFooter: false,

	isFocusColumn: eq('root.focusColumn', 'column'),
	isFocusRow: eq('root.focusRow', 'row'),
	isFocusCell: and('isFocusColumn', 'isFocusRow'),

	focusObserver: observer('isFocusCell', function () {
		if (this.get('isFocusCell')) {
			var $cell = Em.$(this.$());
			$cell.focus();
			this.set('root.focusCell', this);
		}
	}),

	column: null,
	row: null,

	cell: null,
	value: alias('cell'),
	formatted: alias('value'),

	hover: computed('root.hoverRow', 'row', 'isFooter', {
		get: function () {
			return !this.get('isFooter') && this.get('root.hoverRow') === this.get('row');
		},
	}),

	tabindex: computed('isEditable', {
		get: function () {
			var onlyFocusEditable = this.get('root.onlyFocusEditable');
			var isEditable = this.get('isEditable');
			var index = onlyFocusEditable && !isEditable ? null : 0;
			return index;
		},
	}),

	// only calculated once
	observedFields: computed({
		get: function () {
			var observes = this.get('column.observes');
			if (!Em.isEmpty(observes)) {
				return observes;
			}
			var id = this.get('column.name');
			return id;
		},
	}),

	marginBottom: computed('showingSubcontent', 'row.subcontentHeight', {
		get: function () {
			var isExpanded = this.get('showingSubcontent');
			if (isExpanded) {
				return this.get('row.subcontentHeight');
			}
			return null;
		},
	}),

	init: function () {
		this._super();
		this.buildComputedValue();
		this.focusObserver();
	},

	didInsertElement: function () {
		this._super();
		this.setHeight();
		this.setMarginBottom();
	},

	setHeight: observer('height', function () {
		var $cell = Em.$(this.$());
		$cell.css('height', this.get('height'));
	}),

	setMarginBottom: observer('marginBottom', function () {
		var $cell = Em.$(this.$());
		$cell.css('marginBottom', this.get('marginBottom') || 0);
	}),

	getValue: deprecate('Override `value` property instead', function () {}),

	updateValue: deprecate('Override `value` property instead', function () {}),

	buildComputedValue: observer('column.name', function () {
		var columnName = this.get('column.name');
		var prop = alias('row.' + columnName);
		defineProperty(this, 'cell', prop);
	}),

	mouseEnter: function () {
		var row = this.get('row');
		this.get('root').send('highlightRow', row);
	},

	mouseLeave: function () {
		this.get('root').send('stopHighlightingRows');
	},

	click: function () {
		var controller = this.get('root');
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
		var controller = this.get('root');
		var row = this.get('row');
		var column = this.get('column');
		controller.send('focusCell', row, column);
		return false;
	},

	keyDown: function (e) {
		if (e.which === ESC) {
			this.$().blur();
		} else if (e.which === SPACE) {
			this.send('primaryAction', e);
		} else {
			this._super(e);
		}
	},

	actions: {
		primaryAction: function (e) {
			// cancel action by default
			e.preventDefault();
		},
	},
});

export default LlamaBodyCell;
