import Em from 'ember';
import LlamaCell from './llama-cell';
var get = Em.get;
var observer = Em.observer;
var addObserver = Em.addObserver;
var removeObserver = Em.removeObserver;
var computed = Em.computed;
var alias = computed.alias;
var or = computed.or;
var bool = computed.bool;
var empty = computed.empty;
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
	rowIsClickable: alias('controller.enableRowClick'),
	isClickable: or('columnIsClickable', 'rowIsClickable'),
	showingSubcontent: bool('row.isExpanded'),
	isEmpty: empty('value'),
	isEditable: bool('column.isEditable'),

	column: null,
	row: null,

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

	setHeight: observer('height', function () {
		var $cell = this.$();
		if ($cell) {
			$cell.css('height', this.get('height'));
		}
	}).on('didInsertElement'),

	setMarginBottom: observer('marginBottom', function () {
		var $cell = this.$();
		if ($cell) {
			$cell.css('marginBottom', this.get('marginBottom') || 0);
		}
	}).on('didInsertElement'),

	getValue: function () {
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		return value;
	},

	updateValue: observer('column', function () {
		var value = this.getValue();
		this.set('value', value);
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
