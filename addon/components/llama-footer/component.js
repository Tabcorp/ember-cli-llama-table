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

	didConstruct: false,

	data: computed('root.footerController', {
		get: function (key, val, old) {
			if (old) {
				old.destroy();
			}
			var footerController = this.get('root.footerController');
			var Constructor, instance;
			if (typeof footerController === 'function') {
				Constructor = footerController;
				instance = Constructor.create({
					content: this.get('rows')
				});
				this.set('didConstruct', true);
			}
			else if (footerController) {
				instance = footerController;
				this.set('didConstruct', false);
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
		if (this.get('didConstruct')) {
			const footerController = this.get('data');
			footerController.destroy();
		}
		this._super();
	},
});

export default LlamaFooter;
