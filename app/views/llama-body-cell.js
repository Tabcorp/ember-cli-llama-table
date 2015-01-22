import Em from 'ember';
import LlamaCell from './llama-cell';
var get = Em.get;

var LlamaBodyCell = LlamaCell.extend({
	layoutName: 'llama-body-cell',
	classNames: 'llama-body-cell llama-cell',
	attributeBindings: ['tabindex'],
	tabindex: 0,

	// column definition
	column: null,

	// table definition
	row: null,

	value: function () {
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		return value;
	}.property('column', 'row')
});

export default LlamaBodyCell;
