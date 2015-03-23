import Em from 'ember';
var get = Em.get;

var LlamaColumngroup = Em.View.extend({
	classNames: 'llama-columngroup',
	columns: null,
	columnViews: Em.computed.alias('childViews'),

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
	}.observes('width').on('didInsertElement')
});

export default LlamaColumngroup;
