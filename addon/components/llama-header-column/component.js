import Em from 'ember';
import LlamaColumn from 'llama-table/components/llama-column/component';
import layout from './template';
var set = Em.set;
var computed = Em.computed;

var LlamaHeaderColumn = LlamaColumn.extend({
	layout: layout,
	classNames: 'llama-header-column',

	column: null,

	itemViewClass: computed('config.header', {
		get: function () {
			var ViewClass = this.get('config.header');
			if (Em.isEmpty(ViewClass)) {
				ViewClass = this.get('root.HeaderCellView');
			}
			return ViewClass;
		}
	})
});

export default LlamaHeaderColumn;
