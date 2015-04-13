import Em from 'ember';
var get = Em.get;
var set = Em.set;
var alias = Em.computed.alias;

var LlamaHeader = Em.CollectionView.extend({
	classNames: 'llama-header',
	itemViewClass: alias('controller.HeaderColumngroupView'),
	columngroupViews: alias('childViews'),
	contentBinding: 'columngroups',

	columngroups: null,

	createChildView: function (View, attrs) {
		var columns = get(attrs, 'content');
		set(attrs, 'columns', columns);
		return this._super(View, attrs);
	}
});

export default LlamaHeader;
