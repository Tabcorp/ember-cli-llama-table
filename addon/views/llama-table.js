import Em from 'ember';
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	dualHeaders: alias('controller.dualHeaders'),

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
	}).on('didInsertElement')
});

export default LlamaTable;
