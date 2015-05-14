import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;

var LlamaTable = Em.ContainerView.extend(ScrollXYMixin, {
	classNames: 'llama-table',
	dualHeaders: alias('controller.dualHeaders'),
	showFooter: alias('controller.showFooter'),
	scrollLeft: alias('controller.scrollLeft'),
	scrollTop: alias('controller.scrollTop'),

	rows: null,
	columngroups: null,

	headerView: computed(function () {
		var View = this.get('controller.HeaderView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups')
		});
	}),

	dualHeaderView: computed(function () {
		var View = this.get('controller.HeaderView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups')
		});
	}),

	bodyView: computed(function () {
		var View = this.get('controller.BodyView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups'),
			rows: this.get('rows')
		});
	}),

	footerView: null,

	init: function () {
		this._super();
		this.pushObject(this.get('headerView'));
		this.pushObject(this.get('bodyView'));
	},

	toggleDualHeader: observer('dualHeaders', function () {
		var dualHeaders = this.get('dualHeaders');
		if (dualHeaders) {
			this.pushObject(this.get('dualHeaderView'));
		}
		else {
			this.removeObject(this.get('dualHeaderView'));
		}
	}).on('didInsertElement'),

	toggleFooter: observer('showFooter', function () {
		var showFooter = this.get('showFooter');
		var View, footerView;
		if (showFooter) {
			// create and show footer
			View = this.get('controller.FooterView');
			footerView = this.createChildView(View, {
				columngroups: this.get('columngroups'),
				rows: this.get('rows')
			});
			this.set('footerView', footerView);
			this.pushObject(footerView);
		}
		else {
			// remove and unset footer
			footerView = this.get('footerView');
			this.removeObject(footerView);
			this.set('footerView', null);
		}
	}).on('didInsertElement'),

	updateScrollPosition: observer('scrollLeft', 'scrollTop', function () {
		var $table = Em.$(this.$());
		$table.scrollLeft(this.get('scrollLeft'));
		$table.scrollTop(this.get('scrollTop'));
	}).on('didInsertElement'),

	setHeight: observer('controller.maxHeight', function () {
		var $table = Em.$(this.$());
		$table.css('maxHeight', this.get('controller.maxHeight'));
	}).on('didInsertElement'),

	actions: {
		scrollX: function (pos) {
			this.set('scrollLeft', pos);
		},
		scrollY: function (pos) {
			this.set('scrollTop', pos);
		}
	}
});

export default LlamaTable;
