import Em from 'ember';

var LlamaHeaderColumn = Em.View.extend({
	layoutName: 'llama-header-column',
	classNames: 'llama-header-column llama-column',

	// column definition
	column: null,

	// table data
	rows: null
});

export default LlamaHeaderColumn;
