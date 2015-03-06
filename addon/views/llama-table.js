import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	HeaderView: Em.computed.alias('controller.HeaderView'),
	BodyView: Em.computed.alias('controller.BodyView'),
	headerView: Em.computed.alias('childViews.0'),
	bodyView: Em.computed.alias('childViews.1'),
	init: function () {
		this._super();
		var headerView = this.get('HeaderView').create({
			container: this.container
		});
		this.pushObject(headerView);
		var bodyView = this.get('BodyView').create({
			container: this.container
		});
		this.pushObject(bodyView);
	}
});

export default LlamaTable;
