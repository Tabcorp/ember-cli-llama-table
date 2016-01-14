import Em from 'ember';
import layout from './template';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;
var alias = computed.alias;
var filterBy = computed.filterBy;

var LlamaSubcontent = Em.Component.extend({
	layout: layout,
	classNames: ['llama-subcontent'],
	contentBinding: 'expandedRows',

	rows: null,

	itemViewClass: alias('root.EmbedView'),
	expandedRows: filterBy('rows', 'isExpanded')
});

export default LlamaSubcontent;
