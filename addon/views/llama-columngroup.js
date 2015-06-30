import Em from 'ember';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var setDiff = computed.setDiff;
var filterBy = computed.filterBy;
var mapBy = computed.mapBy;

var LlamaColumngroup = Em.CollectionView.extend({
	classNames: 'llama-columngroup',
	columnViews: alias('childViews'),
	contentBinding: 'columns',

	columns: null,

	hiddenColumns: filterBy('columns', 'isHidden'),
	visibleColumns: setDiff('columns', 'hiddenColumns'),

	width: computed('visibleColumns.@each.width', function () {
		var widths = this.get('visibleColumns').mapBy('width');
		var total = widths.reduce(function (total, val) {
			return total + val;
		}, 0);
		return total;
	}),

	setWidth: observer('width', function () {
		var width = this.get('width');
		var $columngroup = Em.$(this.$());
		$columngroup.width(width);
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
