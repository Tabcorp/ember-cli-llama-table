import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	childViews: ['HeaderView', 'BodyView'],
	HeaderView: Em.computed.alias('controller.HeaderView'),
	BodyView: Em.computed.alias('controller.BodyView'),
	headerView: Em.computed.alias('childViews.0'),
	bodyView: Em.computed.alias('childViews.1')
});

export default LlamaTable;
