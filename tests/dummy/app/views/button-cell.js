import LlamaBodyCell from 'llama-table/views/llama-body-cell';

var ButtonCell = LlamaBodyCell.extend({
	layoutName: 'button-cell',
	actions: {
		click: function () {
			var controller = this.get('controller');
			var rows = controller.get('rows');
			var row = this.get('content');
			var index = rows.indexOf(row);
			controller.sendAction(this.get('actionName'), index);
		}
	}
});

export default ButtonCell;
