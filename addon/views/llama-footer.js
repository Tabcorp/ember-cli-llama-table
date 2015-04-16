import Em from 'ember';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var alias = Em.computed.alias;

var LlamaFooter = Em.CollectionView.extend({
	classNames: 'llama-footer',
	itemViewClass: alias('controller.FooterColumngroupView'),
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
		var $footer = this.$();
		if ($footer && $footer.length > 0) {
			$footer.css('marginLeft', this.get('scrollLeft') * -1);
		}
	}).on('didInsertElement')
});

export default LlamaFooter;
