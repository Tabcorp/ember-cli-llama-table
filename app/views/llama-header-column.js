import Em from 'ember';

var LlamaHeaderColumn = Em.View.extend({
	layoutName: 'llama-header-column',
	classNames: 'llama-header-column llama-column',

	// column definition
	column: null
});

export default LlamaHeaderColumn;
