import Em from 'ember';

var LlamaTable = Em.Component.extend({
	layoutName: 'llama-table',
	classNames: 'llama-table-component',

	// column definitions
	columns: null,

	// table data
	rows: null
});

export default LlamaTable;
