import Em from 'ember';
var get = Em.get;
var set = Em.set;

var LlamaColumngroup = Em.View.extend({
	classNames: 'llama-columngroup',
	columnViews: Em.computed.alias('childViews'),

	columns: null,

	width: function () {
		var widths = this.get('columns').rejectBy('isHidden').mapBy('width');
		var total = widths.reduce(function (total, val) {
			return total + val;
		}, 0);
		return total;
	}.property('columns.@each.width', 'columns.@each.isHidden'),

	setWidth: function () {
		var width = this.get('width');
		this.$().width(width);
	}.observes('width').on('didInsertElement'),

	createChildView: function (View, attrs) {
		var columns = this.get('columns');
		var column = get(attrs, 'content');
		set(attrs, 'columns', columns);
		set(attrs, 'column', column);
		return this._super(View, attrs);
	}
});

export default LlamaColumngroup;
