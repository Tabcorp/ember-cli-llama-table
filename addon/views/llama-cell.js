import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',
	classNameBindings: ['column.isClickable:is-clickable'],
});

export default LlamaCell;
