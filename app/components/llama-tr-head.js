import Em from 'ember';

var LlamaTrHead = Em.Component.extend({
	tagName: 'tr',
	layoutName: 'llama-tr-head',
	classNames: 'llama-tr-head llama-tr',

	// column definitions
	columns: null,

	// table data for this row
	row: null
});

export default LlamaTrHead;
