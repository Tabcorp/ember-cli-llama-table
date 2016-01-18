import Em from 'ember';
import layout from './template';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var filterBy = computed.filterBy;

var LlamaFooter = Em.Component.extend({
	layout: layout,
	classNames: 'llama-footer',
	itemViewClass: alias('root.FooterColumngroupView'),
	columngroupViews: filterBy('childViews', 'isVisible', true),
	contentBinding: 'columngroups',
	scrollTop: alias('root.scrollTop'),

	columngroups: null,
	rows: null,

	data: computed('root.footerController', {
		get: function (key, val, old) {
			if (old) {
				old.destroy();
			}
			var Constructor = this.get('root.footerController');
			var instance;
			if (typeof Constructor === 'function') {
				instance = Constructor.create({
					content: this.get('rows')
				});
			}
			return instance;
		},
	}),

	didInsertElement: function () {
		this._super();
		this.updateScrollPosition();
	},

	createChildView: function (View, attrs) {
		var data = this.get('data');
		var columns = get(attrs, 'content');
		set(attrs, 'root', this.get('root'));
		set(attrs, 'columns', columns);
		set(attrs, 'data', data);
		return this._super(View, attrs);
	},

	updateScrollPosition: observer('scrollTop', function () {
		var $footer = Em.$(this.$());
		$footer.css('marginBottom', this.get('scrollTop') * -1);
	}),

	willDestroy: function () {
		this.get('data').destroy();
		this._super();
	},
});

export default LlamaFooter;
