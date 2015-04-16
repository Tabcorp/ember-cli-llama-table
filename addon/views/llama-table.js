import Em from 'ember';
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var collect = computed.collect;

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	dualHeaders: alias('controller.dualHeaders'),
	showFooter: alias('controller.showFooter'),
	childViews: collect('headerView', 'bodyView'),

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

	footerView: computed(function () {
		var View = this.get('controller.FooterView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups'),
			rows: this.get('rows')
		});
	}),

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
		if (showFooter) {
			this.pushObject(this.get('footerView'));
		}
		else {
			this.removeObject(this.get('footerView'));
		}
	}).on('didInsertElement')
});

export default LlamaTable;
