import Em from 'ember';

var LlamaTrBody = Em.Component.extend({
	tagName: 'tr',
	layoutName: 'llama-tr-body',
	classNames: 'llama-tr-body llama-tr',

	// column definitions
	columns: null,

	// table data for this row
	row: null
});

export default LlamaTrBody;
