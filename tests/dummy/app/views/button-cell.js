import LlamaBodyCell from 'llama-table/views/llama-body-cell';
var gt = Em.computed.gt;

var ButtonCell = LlamaBodyCell.extend({
	showButton: gt('row.contentIndex', -1),
	layoutName: 'button-cell',
	actions: {
		click: function () {
			var controller = this.get('controller');
			var rows = controller.get('rows');
			var row = this.get('content.model');
			var index = rows.indexOf(row);
			controller.sendAction(this.get('actionName'), index);
		}
	}
});

export default ButtonCell;
