import Em from 'ember';
import LlamaCell from './llama-cell';

var LlamaHeaderCell = LlamaCell.extend({
	templateName: 'llama-header-cell',
	classNames: 'llama-header-cell',
	attributeBindings: ['title'],
	title: Em.computed.alias('column.label'),

	// column definition
	column: null,

	mouseDown: function (e) {
		if (e.which === 1) {
			e.preventDefault();
			this.get('controller').send('sortBy', this.get('column.name'));
		}
	}
});

export default LlamaHeaderCell;
