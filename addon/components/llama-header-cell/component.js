import Em from 'ember';
import LlamaCell from 'llama-table/components/llama-cell/component';
import { defaultValue } from 'llama-table/computed';
import layout from './template';
var computed = Em.computed;
var alias = computed.alias;
var bool = computed.bool;
var and = computed.and;
var not = computed.not;

var LlamaHeaderCell = LlamaCell.extend({
	layout: layout,
	classNames: 'llama-header-cell',
	classNameBindings: ['sortByThis', 'sortByThisAscending', 'sortByThisDescending', 'isSortable'],
	attributeBindings: ['title'],
	showLabel: bool('column.showLabel'),

	column: null,

	title: computed('column.label', {
		get: function () {
			var label = this.get('column.label');
			if (Em.isBlank(label)) {
				label = this.get('column.name');
			}
			return label;
		},
	}),

	tableIsSortable: defaultValue('root.isSortable', true),
	columnIsSortable: defaultValue('column.isSortable', true),
	isSortable: and('tableIsSortable', 'columnIsSortable'),
	tableIsResizable: defaultValue('root.isResizable', true),
	columnIsResizable: defaultValue('column.isResizable', true),
	isResizable: and('tableIsResizable', 'columnIsResizable'),

	sortProperties: alias('root.sortProperties'),
	sortAscending: bool('root.sortAscending'),
	sortDescending: not('sortAscending'),

	sortByThis: computed('sortProperties.firstObject', 'column.sortBy', {
		get: function () {
			const sortBy = this.get('sortProperties.firstObject');
			if (Em.isEmpty(sortBy)) {
				return false;
			}
			const sortedColumn = String(sortBy).split(':', 1)[0];
			const thisColumn = this.get('column.sortBy');
			return sortedColumn === thisColumn;
		},
	}),

	sortByThisAscending: and('sortByThis', 'sortAscending'),
	sortByThisDescending: and('sortByThis', 'sortDescending'),

	mouseDown: function (e) {
		var isResizeAction = Em.$(e.target).is('.resize-handle');
		var controller = this.get('root');
		if (e.which === 1) {
			e.preventDefault();
			if (isResizeAction && this.get('isResizable')) {
				controller.send('startResize', e, this.get('column'));
			} else if (this.get('isSortable')) {
				controller.send('sortBy', this.get('column.sortBy'));
			}
		}
	},
});

export default LlamaHeaderCell;
