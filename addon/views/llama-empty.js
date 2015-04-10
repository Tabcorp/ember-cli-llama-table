import Em from 'ember';

var EmptyView = Em.View.extend({
	templateName: 'llama-empty',
	classNames: ['llama-empty'],
	content: Em.computed.alias('controller.emptyText')
});

export default EmptyView;
