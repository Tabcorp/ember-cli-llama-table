import Em from 'ember';
import { join } from 'llama-table/computed';
var get = Em.get;
var set = Em.set;
var on = Em.on;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var bool = computed.bool;
var not = computed.not;
var filterBy = computed.filterBy;

var LlamaColumn = Em.Component.extend({
	classNames: 'llama-column',
	classNameBindings: ['textAlignClass', 'columnClassNames', 'isVisible', 'isHidden'],
	attributeBindings: ['columnName:data-column-name', 'columnType:data-column-type'],
	width: alias('column.width'),
	isHidden: bool('column.isHidden'),
	isVisible: not('isHidden'),
	columnClassNames: join('column.classNames', ' '),
	columnName: alias('column.name'),
	columnType: alias('column.type'),

	rows: null,
	column: null,

	config: computed('columnType', 'columnName', 'root.config.types', {
		get: function () {
			var types = this.get('root.config.types');
			if (!Em.isArray(types)) {
				return null;
			}
			var name = this.get('columnType') || this.get('columnName');
			var type = Em.A(types).findBy('name', name);
			return type;
		}
	}),

	setWidth: on('didInsertElement', observer('width', function () {
		var width = this.get('width');
		var $column = Em.$(this.$());
		$column.width(width);
	})),

	cellViews: filterBy('childViews', 'isVisible', true),

	textAlignClass: computed('config.textAlign', 'column.textAlign', function () {
		var textAlign = this.get('config.textAlign') || this.get('column.textAlign');
		switch (textAlign) {
			case 'left': return 'text-left';
			case 'right': return 'text-right';
			case 'center': return 'text-center';
			case 'justify': return 'text-justify';
		}
	})
});

export default LlamaColumn;
