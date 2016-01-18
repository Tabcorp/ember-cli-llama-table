import Em from 'ember';
import LlamaBodyCell from 'llama-table/components/llama-body-cell/component';
import layout from 'dummy/templates/components/button-cell';
var computed = Em.computed;
var gt = computed.gt;
var not = computed.not;

var ButtonCell = LlamaBodyCell.extend({
	layout: layout,
	showButton: not('isFooter'),
	actions: {
		click: function () {
			var controller = this.get('root');
			var rows = controller.get('rows');
			var row = this.get('content');
			var index = rows.indexOf(row);
			controller.sendAction(this.get('actionName'), index);
		},
	},
});

export default ButtonCell;
