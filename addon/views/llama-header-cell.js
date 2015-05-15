import Em from 'ember';
import LlamaCell from './llama-cell';
import { defaultValue } from 'llama-table/computed';
var computed = Em.computed;
var alias = computed.alias;
var bool = computed.bool;
var and = computed.and;
var not = computed.not;

var LlamaHeaderCell = LlamaCell.extend({
	templateName: 'llama-header-cell',
	classNames: 'llama-header-cell',
	classNameBindings: ['sortByThis', 'sortByThisAscending', 'sortByThisDescending', 'isSortable'],
	attributeBindings: ['title'],
	showLabel: bool('column.showLabel'),

	column: null,

	title: computed('column.label', function () {
		var label = this.get('column.label');
		if (Em.isBlank(label)) {
			label = this.get('column.name');
		}
		return label;
	}),

	tableIsSortable: defaultValue('controller.isSortable', true),
	columnIsSortable: defaultValue('column.isSortable', true),
	isSortable: and('tableIsSortable', 'columnIsSortable'),
	tableIsResizable: defaultValue('controller.isResizable', true),
	columnIsResizable: defaultValue('column.isResizable', true),
	isResizable: and('tableIsResizable', 'columnIsResizable'),

	sortProperties: alias('controller.sortProperties'),
	sortAscending: bool('controller.sortAscending'),
	sortDescending: not('sortAscending'),

	sortByThis: computed('sortProperties.firstObject', 'column.name', function () {
		var sortBy = this.get('sortProperties.firstObject');
		var thisColumn = this.get('column.name');
		return sortBy === thisColumn;
	}),

	sortByThisAscending: and('sortByThis', 'sortAscending'),
	sortByThisDescending: and('sortByThis', 'sortDescending'),

	mouseDown: function (e) {
		var isResizeAction = Em.$(e.target).is('.resize-handle');
		var controller = this.get('controller');
		if (e.which === 1) {
			e.preventDefault();
			if (isResizeAction && this.get('isResizable')) {
				controller.send('startResize', e, this.get('column'));
			}
			else if (this.get('isSortable')) {
				controller.send('sortBy', this.get('column.name'));
			}
		}
	}
});

export default LlamaHeaderCell;
