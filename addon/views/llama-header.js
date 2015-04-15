import Em from 'ember';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var alias = Em.computed.alias;

var LlamaHeader = Em.CollectionView.extend({
	classNames: 'llama-header',
	itemViewClass: alias('controller.HeaderColumngroupView'),
	columngroupViews: alias('childViews'),
	contentBinding: 'columngroups',
	scrollLeft: alias('controller.scrollLeft'),

	columngroups: null,

	createChildView: function (View, attrs) {
		var columns = get(attrs, 'content');
		set(attrs, 'columns', columns);
		return this._super(View, attrs);
	},

	updateScrollPosition: observer('scrollLeft', function () {
		var $header = this.$();
		if ($header && $header.length > 0) {
			$header.css('marginLeft', this.get('scrollLeft') * -1);
		}
	}).on('didInsertElement')
});

export default LlamaHeader;
