import Em from 'ember';
var get = Em.get;
var set = Em.set;

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	width: Em.computed.alias('column.width'),

	rows: null,
	column: null,

	setWidth: function () {
		var width = this.get('width');
		this.$().width(width);
	}.observes('width').on('didInsertElement'),

	cellViews: Em.computed.alias('childViews'),

	createChildView: function (View, attrs) {
		var column = this.get('column');
		set(attrs, 'column', column);
		return this._super(View, attrs);
	}
});

export default LlamaColumn;
