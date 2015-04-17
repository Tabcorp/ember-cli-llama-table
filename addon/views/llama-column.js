import Em from 'ember';
import { join } from 'llama-table/computed';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var not = computed.not;

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	classNameBindings: ['textAlignClass', 'columnClassNames', 'isVisible', 'isHidden'],
	width: alias('column.width'),
	isHidden: alias('column.isHidden'),
	isVisible: not('isHidden'),
	columnClassNames: join('column.classNames', ' '),

	rows: null,
	column: null,

	config: computed('column.name', 'controller.config.types', function () {
		var types = this.get('controller.config.types');
		if (!Em.isArray(types)) {
			return null;
		}
		var name = this.get('column.name');
		var type = types.findBy('name', name);
		return type;
	}),

	setWidth: observer('width', function () {
		var width = this.get('width');
		var $column = this.$();
		if ($column && $column.length > 0) {
			$column.width(width);
		}
	}).on('didInsertElement'),

	cellViews: alias('childViews'),

	createChildView: function (View, attrs) {
		var column = this.get('column');
		set(attrs, 'column', column);
		return this._super(View, attrs);
	},

	textAlignClass: computed('column.textAlign', function () {
		var textAlign = this.get('column.textAlign');
		switch (textAlign) {
			case 'left': return 'text-left';
			case 'right': return 'text-right';
			case 'center': return 'text-center';
			case 'justify': return 'text-justify';
		}
	})
});

export default LlamaColumn;
