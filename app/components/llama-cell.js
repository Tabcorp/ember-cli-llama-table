import Em from 'ember';

var LlamaCell = Em.Component.extend({
	classNames: 'llama-cell',

	beforeInsertElement: function () {
		console.log('todo: find out what this event is called');
	}
});

export default LlamaCell;
