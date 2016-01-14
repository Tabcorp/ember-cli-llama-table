import Em from 'ember';
import LlamaBodyCell from 'llama-table/components/llama-body-cell/component';
var computed = Em.computed;

var LlamaNumberCell = LlamaBodyCell.extend({
	classNames: 'number',
	formatted: computed('value', {
		get: function () {
			var value = this.get('value');
			var number = Number(value);
			return number;
		}
	})
});

export default LlamaNumberCell;
