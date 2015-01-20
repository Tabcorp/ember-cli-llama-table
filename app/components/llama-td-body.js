import Em from 'ember';
var get = Em.get;

var LlamaTdBody = Em.Component.extend({
	tagName: 'td',
	layoutName: 'llama-td-body',
	classNames: 'llama-td-body llama-td',

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

export default LlamaTdBody;
