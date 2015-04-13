import Em from 'ember';
var alias = Em.computed.alias;

var EmptyView = Em.View.extend({
	templateName: 'llama-empty',
	classNames: ['llama-empty'],
	content: alias('controller.emptyText')
});

export default EmptyView;
