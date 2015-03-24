import Em from 'ember';
import LlamaColumn from './llama-column';
var set = Em.set;

var LlamaHeaderColumn = LlamaColumn.extend({
	classNames: 'llama-header-column',
	content: Em.computed.collect('column'),
	itemViewClass: Em.computed.alias('controller.HeaderCellView'),

	column: null
});

export default LlamaHeaderColumn;
