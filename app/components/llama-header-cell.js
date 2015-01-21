import Em from 'ember';

var LlamaHeaderCell = Em.Component.extend({
	layoutName: 'llama-header-cell',
	classNames: 'llama-header-cell llama-cell',

	// column definition
	column: null
});

export default LlamaHeaderCell;
