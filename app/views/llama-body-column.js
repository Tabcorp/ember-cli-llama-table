import Em from 'ember';

var LlamaBodyColumn = Em.View.extend({
	layoutName: 'llama-body-column',
	classNames: 'llama-body-column llama-column',

	// column definition
	column: null,

	// table data
	rows: null
});

export default LlamaBodyColumn;
