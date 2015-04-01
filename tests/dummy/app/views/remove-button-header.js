import LlamaHeaderCell from 'llama-table/views/llama-header-cell';

var RemoveButtonHeader = LlamaHeaderCell.extend({
	layoutName: 'button-cell',
	buttonText: 'Remove all',
	actions: {
		click: function () {
			this.get('controller').sendAction('removeAll');
		}
	}
});

export default RemoveButtonHeader;
