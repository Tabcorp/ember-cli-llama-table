import Em from 'ember';
import layout from './template';
var on = Em.on;
var observer = Em.observer;
var computed = Em.computed;
var bool = computed.bool;
var not = computed.not;
var and = computed.and;

var LlamaBody = Em.Component.extend({
	layout: layout,
	classNames: ['llama-body'],
	isEmpty: bool('root.datasetIsEmpty'),
	isLoading: bool('root.isLoading'),
	notLoading: not('isLoading'),
	hasSubcontent: bool('root.hasSubcontent'),

	columngroups: null,
	rows: null,

	renderContent: true,
	renderSubcontent: bool('hasSubcontent'),
	renderEmpty: and('isEmpty', 'notLoading'),
	renderLoading: and('isEmpty', 'isLoading'),
});

export default LlamaBody;
