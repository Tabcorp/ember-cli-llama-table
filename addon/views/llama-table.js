import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	headerView: function () {
		return this.get('controller.HeaderView').create({
			container: this.get('container'),
			controller: this.get('controller')
		});
	}.property(),
	bodyView: function () {
		return this.get('controller.BodyView').create({
			container: this.get('container'),
			controller: this.get('controller')
		});
	}.property(),
	init: function () {
		this._super();
		this.pushObject(this.get('headerView'));
		this.pushObject(this.get('bodyView'));
	}
});

export default LlamaTable;
