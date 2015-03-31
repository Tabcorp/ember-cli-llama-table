import Em from 'ember';
import LlamaCell from './llama-cell';
import { defaultValue } from 'llama-table/computed';

var LlamaHeaderCell = LlamaCell.extend({
	templateName: 'llama-header-cell',
	classNames: 'llama-header-cell',
	classNameBindings: ['sortByThis', 'sortByThisAscending', 'sortByThisDescending', 'isSortable'],
	attributeBindings: ['title'],
	showLabel: Em.computed.alias('column.showLabel'),

	column: null,

	title: function () {
		var label = this.get('column.label');
		if (Em.isBlank(label)) {
			label = this.get('column.name');
		}
		return label;
	}.property('column.label'),

	tableIsSortable: defaultValue('controller.isSortable', true),
	columnIsSortable: defaultValue('column.isSortable', true),
	isSortable: Em.computed.and('tableIsSortable', 'columnIsSortable'),
	tableIsResizable: defaultValue('controller.isResizable', true),
	columnIsResizable: defaultValue('column.isResizable', true),
	isResizable: Em.computed.and('tableIsResizable', 'columnIsResizable'),

	sortProperties: Em.computed.alias('controller.sortProperties'),
	sortAscending: Em.computed.alias('controller.sortAscending'),
	sortDescending: Em.computed.not('sortAscending'),

	sortByThis: function () {
		var sortBy = this.get('sortProperties.firstObject');
		var thisColumn = this.get('column.name');
		return sortBy === thisColumn;
	}.property('sortProperties.firstObject', 'column.name'),

	sortByThisAscending: Em.computed.and('sortByThis', 'sortAscending'),
	sortByThisDescending: Em.computed.and('sortByThis', 'sortDescending'),

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
