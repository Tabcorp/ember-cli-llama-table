import Em from 'ember';
import { join } from 'llama-table/computed';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;
var alias = computed.alias;
var not = computed.not;

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	classNameBindings: ['textAlignClass', 'columnClassNames'],
	width: alias('column.width'),
	isVisible: not('column.isHidden'),
	columnClassNames: join('column.classNames', ' '),

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

	cellViews: alias('childViews'),

	createChildView: function (View, attrs) {
		var column = this.get('column');
		set(attrs, 'column', column);
		return this._super(View, attrs);
	},

	textAlignClass: function () {
		var textAlign = this.get('column.textAlign');
		switch (textAlign) {
			case 'left': return 'text-left';
			case 'right': return 'text-right';
		}
	}.property('column.textAlign')
});

export default LlamaColumn;
