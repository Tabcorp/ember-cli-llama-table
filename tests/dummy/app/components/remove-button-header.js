import LlamaHeaderCell from 'llama-table/components/llama-header-cell/component';
import layout from 'dummy/templates/components/button-cell';

var RemoveButtonHeader = LlamaHeaderCell.extend({
	layout: layout,
	showButton: true,
	formatted: 'Remove all',
	actions: {
		click: function () {
			this.get('root').sendAction('removeAll');
		}
	}
});

export default RemoveButtonHeader;
