import Em from 'ember';
import LlamaColumn from './llama-column';
var set = Em.set;

var LlamaHeaderColumn = LlamaColumn.extend({
	classNames: 'llama-header-column',
	itemViewClass: Em.computed.alias('controller.HeaderCellView'),

	column: null,

	init: function () {
		// override default assignment of `content` property
		this.set('content', [this.get('column')]);
		this._super();
	}
});

export default LlamaHeaderColumn;
