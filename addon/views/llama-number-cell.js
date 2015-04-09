import Em from 'ember';
import LlamaBodyCell from './llama-body-cell';
import formatter from 'number-formatter';
var get = Em.get;

var LlamaNumberCell = LlamaBodyCell.extend({
	classNames: 'number',
	getValue: function () {
		var mask = this.get('column.format');
		var id = this.get('column.name');
		var row = this.get('row');
		var value = get(row, id);
		var formatted = formatter(mask, value);
		return formatted;
	}
});

export default LlamaNumberCell;
