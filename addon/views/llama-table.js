import Em from 'ember';

var LlamaTable = Em.ContainerView.extend({
	classNames: 'llama-table',
	childViews: ['HeaderView', 'BodyView'],
	HeaderView: Em.computed.alias('controller.HeaderView'),
	BodyView: Em.computed.alias('controller.BodyView')
});

export default LlamaTable;
