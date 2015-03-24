import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',

	rows: null,
	columngroups: null,

	headerView: function () {
		return this.get('controller.HeaderView').create({
			container: this.get('container'),
			controller: this.get('controller'),
			columngroups: this.get('columngroups')
		});
	}.property(),

	bodyView: function () {
		return this.get('controller.BodyView').create({
			container: this.get('container'),
			controller: this.get('controller'),
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
