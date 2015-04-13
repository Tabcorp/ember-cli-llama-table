import Em from 'ember';
import LlamaColumn from './llama-column';
var set = Em.set;
var computed = Em.computed;

var LlamaHeaderColumn = LlamaColumn.extend({
	classNames: 'llama-header-column',

	column: null,

	itemViewClass: computed('config.header', function () {
		var ViewClass = this.get('config.header');
		if (Em.isEmpty(ViewClass)) {
			ViewClass = this.get('controller.HeaderCellView');
		}
		return ViewClass;
	}),

	init: function () {
		// override default assignment of `content` property
		this.set('content', [this.get('column')]);
		this._super();
	}
});

export default LlamaHeaderColumn;
