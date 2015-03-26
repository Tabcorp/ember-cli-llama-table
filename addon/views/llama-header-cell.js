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

	isSortable: defaultValue('column.isSortable', true),
	isResizable: defaultValue('column.isResizable', true),

	sortProperties: Em.computed.alias('controller.sortProperties'),
	sortAscending: Em.computed.alias('controller.sortAscending'),
	sortDescending: Em.computed.not('sortAscending'),

	sortByThis: function () {
		var sortProperties = this.get('sortProperties');
		var thisColumn = this.get('column.name');
		var contained = Em.isArray(sortProperties) && sortProperties.contains(thisColumn);
		return contained;
	}.property('sortProperties', 'column.name'),

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
