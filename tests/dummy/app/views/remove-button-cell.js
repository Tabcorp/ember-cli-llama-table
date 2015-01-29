import ButtonCell from './button-cell';

var RemoveButtonCell = ButtonCell.extend({
	buttonText: 'Remove',
	actions: {
		click: function () {
			var controller = this.get('controller');
			var rows = this.get('parentView.content');
			var row = this.get('content');
			var index = rows.indexOf(row);
			controller.sendAction('removeRow', index);
		}
	}
});

export default RemoveButtonCell;
