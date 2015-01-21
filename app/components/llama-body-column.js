import Em from 'ember';

var LlamaBodyColumn = Em.Component.extend({
	layoutName: 'llama-body-column',
	classNames: 'llama-body-column llama-column',

	// column definition
	column: null,

	// table data
	rows: null
});

export default LlamaBodyColumn;
