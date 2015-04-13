import Em from 'ember';
var computed = Em.computed;

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',

	rows: null,
	columngroups: null,

	headerView: computed(function () {
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
	}
});

export default LlamaTable;
