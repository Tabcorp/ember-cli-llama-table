import Em from 'ember';

var LlamaBody = Em.View.extend({
	layoutName: 'llama-body',
	classNames: 'llama-body',

	// column definitions
	columns: null,

	// table data
	rows: null
});

export default LlamaBody;
