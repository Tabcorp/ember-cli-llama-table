import Em from 'ember';
var get = Em.get;
var set = Em.set;

var LlamaHeader = Em.CollectionView.extend({
	classNames: 'llama-header',
	itemViewClass: Em.computed.alias('controller.HeaderColumngroupView'),
	columngroupViews: Em.computed.alias('childViews'),
	contentBinding: 'columngroups',

	columngroups: null,

	createChildView: function (View, attrs) {
		var columns = get(attrs, 'content');
		set(attrs, 'columns', columns);
		return this._super(View, attrs);
	}
});

export default LlamaHeader;
