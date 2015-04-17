import Em from 'ember';
import LlamaColumn from './llama-column';
import LlamaFooterCell from './llama-footer-cell';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;

var LlamaFooterColumn = LlamaColumn.extend({
	classNames: 'llama-footer-column',
	contentBinding: 'rows',

	rows: null,
	column: null,

	itemViewClass: computed(function () {
		var controller = this.get('controller');
		var column = this.get('column');
		var type = get(column, 'type');
		return controller.getCellType(type);
	}),

	createChildView: function (View, attrs) {
		var row = get(attrs, 'content');
		set(attrs, 'row', row);
		return this._super(View, attrs);
	},

	init: function () {
		// override default assignment of `content` property
		this.set('content', [this.get('column')]);
		this._super();
	}
});

export default LlamaFooterColumn;
