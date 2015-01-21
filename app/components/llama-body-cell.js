import Em from 'ember';
var get = Em.get;

var LlamaBodyCell = Em.Component.extend({
	layoutName: 'llama-body-cell',
	classNames: 'llama-body-cell llama-cell',

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
