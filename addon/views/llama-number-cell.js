import Em from 'ember';
import LlamaBodyCell from './llama-body-cell';
var computed = Em.computed;

var LlamaNumberCell = LlamaBodyCell.extend({
	classNames: 'number',
	formatted: computed('value', function () {
		var value = this.get('value');
		var number = Number(value);
		return number;
	})
});

export default LlamaNumberCell;
