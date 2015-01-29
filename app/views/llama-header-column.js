import Em from 'ember';
import LlamaColumn from './llama-column';
import LlamaHeaderCell from './llama-header-cell';
var set = Em.set;

var LlamaHeaderColumn = LlamaColumn.extend({
	layoutName: 'llama-header-column',
	classNames: 'llama-header-column',

	content: function () {
		return [this.get('column')];
	}.property(),

	itemViewClass: LlamaHeaderCell,

	createChildView: function (View, attrs) {
		var column = this.get('column');
		set(attrs, 'column', column);
		return this._super(View, attrs);
	},

	// column definition
	column: null
});

export default LlamaHeaderColumn;
