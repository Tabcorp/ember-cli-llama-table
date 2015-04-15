import Em from 'ember';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;

var LlamaColumngroup = Em.CollectionView.extend({
	classNames: 'llama-columngroup',
	columnViews: alias('childViews'),
	contentBinding: 'columns',

	columns: null,

	width: computed('columns.@each.width', 'columns.@each.isHidden', function () {
		var widths = this.get('columns').rejectBy('isHidden').mapBy('width');
		var total = widths.reduce(function (total, val) {
			return total + val;
		}, 0);
		return total;
	}),

	setWidth: observer('width', function () {
		var width = this.get('width');
		var $columngroup = this.$();
		if ($columngroup && $columngroup.length > 0) {
			$columngroup.width(width);
		}
	}).on('didInsertElement'),

	createChildView: function (View, attrs) {
		var columns = this.get('columns');
		var column = get(attrs, 'content');
		set(attrs, 'columns', columns);
		set(attrs, 'column', column);
		return this._super(View, attrs);
	}
});

export default LlamaColumngroup;
