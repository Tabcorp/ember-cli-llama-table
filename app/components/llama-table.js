import Em from 'ember';
import Controller from 'llama-table/controllers/llama-table';

var LlamaTable = Em.Component.extend({
	layoutName: 'llama-table',
	classNames: 'llama-table-component',
	controller: Controller.create(),

	// column definitions
	columns: null,

	// table data
	rows: null
});

export default LlamaTable;
