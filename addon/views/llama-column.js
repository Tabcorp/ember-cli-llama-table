import Em from 'ember';
var get = Em.get;
var set = Em.set;

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	width: Em.computed.alias('column.width'),

	rows: null,
	column: null,

	config: function () {
		var types = this.get('controller.config.types');
		if (!Em.isArray(types)) {
			return null;
		}
		var name = this.get('column.name');
		var type = types.findBy('name', name);
		return type;
	}.property('column.name', 'controller.config.types'),

	setWidth: function () {
		var width = this.get('width');
		this.$().width(width);
	}.observes('width').on('didInsertElement'),

	cellViews: Em.computed.alias('childViews'),

	createChildView: function (View, attrs) {
		var column = this.get('column');
		set(attrs, 'column', column);
		return this._super(View, attrs);
	},

	setTextAlign: function () {
		var textAlign = this.get('column.textAlign');
		var $column = this.$();
		if ($column) {
			$column.css('textAlign', textAlign);
		}
	}.observes('column.textAlign').on('didInsertElement')
});

export default LlamaColumn;
