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
	itemViewClass: LlamaBodyCell,

	createChildView: function (View, attrs) {
		var controller = this.get('controller');
		var column = this.get('column');
		var type = get(column, 'type');
		var Type = controller.getCellType(type);
		if (Type) {
			View = Type;
		}
		set(attrs, 'column', column);
		set(attrs, 'row', attrs.content);
		return this._super(View, attrs);
	},

	// column definition
	column: null
});

export default LlamaBodyColumn;
