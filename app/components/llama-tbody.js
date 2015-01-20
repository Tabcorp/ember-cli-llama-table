import Em from 'ember';

var LlamaTbody = Em.Component.extend({
	tagName: 'tbody',
	layoutName: 'llama-tbody',
	classNames: 'llama-tbody',

	// column definitions
	columns: null,

	// table data
	rows: null
});

export default LlamaTbody;
