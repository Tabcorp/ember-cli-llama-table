import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',

	click: function() {
		if (this.get('column.isClickable')) {
			var controller = this.get('controller');
			controller.sendAction('cellClick', this.get('content'), this.get('column.name'));
		}
	}

});

export default LlamaCell;
