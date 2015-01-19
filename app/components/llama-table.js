import Em from 'ember';

var LlamaTable = Em.Component.extend({
	layoutName: 'llama-table',
	classNames: 'llama-table-component',

	// column definitions
	columns: null,

	// table data
	data: null,

	init: function () {
		// initialize state
	}
});

export default LlamaTable;
