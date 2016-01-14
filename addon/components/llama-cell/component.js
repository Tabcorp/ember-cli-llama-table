import Em from 'ember';
var computed = Em.computed;
var alias = computed.alias;

var LlamaCell = Em.Component.extend({
	classNames: 'llama-cell',

	column: null,
	row: null,

	columnView: alias('parentView'),
	config: alias('columnView.config')
});

export default LlamaCell;
