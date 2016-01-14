import Em from 'ember';
import layout from './template';
var alias = Em.computed.alias;

var EmptyView = Em.Component.extend({
	layout: layout,
	classNames: ['llama-empty'],
	content: alias('root.emptyText')
});

export default EmptyView;
