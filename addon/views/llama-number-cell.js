import Em from 'ember';
import LlamaBodyCell from './llama-body-cell';
var get = Em.get;

var LlamaNumberCell = LlamaBodyCell.extend({
	classNames: 'number',
	getValue: function () {
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		return value;
	}
});

export default LlamaNumberCell;
