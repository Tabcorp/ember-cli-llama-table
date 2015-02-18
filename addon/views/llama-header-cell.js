import Em from 'ember';
import LlamaCell from './llama-cell';
import { defaultValue } from 'llama-table/computed';

var LlamaHeaderCell = LlamaCell.extend({
	templateName: 'llama-header-cell',
	classNames: 'llama-header-cell',
	classNameBindings: ['sortByThis', 'sortByThisAscending', 'sortByThisDescending', 'isSortable'],
	attributeBindings: ['title'],
	title: Em.computed.alias('column.label'),

	isSortable: defaultValue('column.isSortable', true),
	isResizable: defaultValue('column.isResizable', true),

	// column definition
	column: null,

	sortProperties: Em.computed.alias('controller.sortedRows.sortProperties'),
	sortAscending: Em.computed.alias('controller.sortedRows.sortAscending'),
	sortDescending: Em.computed.not('sortAscending'),

	sortByThis: function () {
		var sortProperties = this.get('sortProperties');
		var thisColumn = this.get('column.name');
		var contained = Em.isArray(sortProperties) && sortProperties.contains(thisColumn);
		return contained;
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
