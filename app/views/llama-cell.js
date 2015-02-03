import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',

	click: function () {
		if (this.get('column.isClickable')) {
			var controller = this.get('controller');
			var row = this.get('row');
			var column = this.get('column');
			controller.sendAction('cellClick', row, column);
		}
	}

});

export default LlamaCell;
