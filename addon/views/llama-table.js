import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',

	rows: null,
	columngroups: null,

	headerView: function () {
		var View = this.get('controller.HeaderView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups')
		});
	}.property(),

	bodyView: function () {
		var View = this.get('controller.BodyView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups'),
			rows: this.get('rows')
		});
	}.property(),

	init: function () {
		this._super();
		this.pushObject(this.get('headerView'));
		this.pushObject(this.get('bodyView'));
	}
});

export default LlamaTable;
