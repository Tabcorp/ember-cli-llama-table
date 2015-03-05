import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',
	classNameBindings: ['column.isClickable:cell-clickable'],
});

export default LlamaCell;
