import Em from 'ember';
import LlamaColumn from './llama-column';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;

var LlamaBodyColumn = LlamaColumn.extend({
	classNames: 'llama-body-column',
	contentBinding: 'subsetRows',
	visibleIndexStart: computed.alias('controller.visibleIndexStart'),
	visibleIndexEnd: computed.alias('controller.visibleIndexEnd'),

	rows: null,
	column: null,

	subsetRows: computed('visibleIndexStart', 'visibleIndexEnd', 'rows.[]', function() {
		const start = this.get('visibleIndexStart');
		const end = this.get('visibleIndexEnd');

		return this.get('rows').slice(start, end);
	}),

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
	}
});

export default LlamaBodyColumn;
