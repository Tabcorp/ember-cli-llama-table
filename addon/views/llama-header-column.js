import Em from 'ember';
import LlamaColumn from './llama-column';
var set = Em.set;

var LlamaHeaderColumn = LlamaColumn.extend({
	classNames: 'llama-header-column',

	column: null,

	itemViewClass: function () {
		var ViewClass = this.get('config.header');
		if (Em.isEmpty(ViewClass)) {
			ViewClass = this.get('controller.HeaderCellView');
		}
		return ViewClass;
	}.property('config.header'),

	init: function () {
		// override default assignment of `content` property
		this.set('content', [this.get('column')]);
		this._super();
	}
});

export default LlamaHeaderColumn;
