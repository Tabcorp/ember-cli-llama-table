import Em from 'ember';
import LlamaColumn from 'llama-table/components/llama-column/component';
import LlamaBodyCell from 'llama-table/components/llama-body-cell/component';
import layout from './template';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;

var LlamaBodyColumn = LlamaColumn.extend({
	layout: layout,
	classNames: 'llama-body-column',

	rows: null,
	column: null,

	itemViewClass: computed({
		get: function () {
			var controller = this.get('root');
			var column = this.get('column');
			var type = get(column, 'type');
			return controller.getCellType(type);
		}
	})
});

export default LlamaBodyColumn;
