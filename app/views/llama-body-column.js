import Em from 'ember';
import LlamaColumn from './llama-column';
import LlamaBodyCell from './llama-body-cell';
var get = Em.get;
var set = Em.set;

var LlamaBodyColumn = LlamaColumn.extend({
	layoutName: 'llama-body-column',
	classNames: 'llama-body-column',

	controller: Em.computed.alias('parentView.parentView.parentView'),

	content: Em.computed.alias('controller.rows'),
	itemViewClass: function () {
		var controller = this.get('controller');
		var column = this.get('column');
		var type = get(column, 'type');
		return controller.getCellType(type);
	}.property(),

	createChildView: function (View, attrs) {
		var column = this.get('column');
		var row = get(attrs, 'content');
		set(attrs, 'column', column);
		set(attrs, 'row', row);
		return this._super(View, attrs);
	},

	// column definition
	column: null
});

export default LlamaBodyColumn;
