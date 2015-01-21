import Em from 'ember';

var LlamaBody = Em.Component.extend({
	layoutName: 'llama-body',
	classNames: 'llama-body',

	// column definitions
	columns: null,

	// table data
	rows: null
});

export default LlamaBody;
