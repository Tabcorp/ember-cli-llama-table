import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',

	column: null,
	row: null,

	columnView: Em.computed.alias('parentView'),
	config: Em.computed.alias('columnView.config')
});

export default LlamaCell;
