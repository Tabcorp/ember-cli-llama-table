import Em from 'ember';
import LlamaColumngroup from 'llama-table/components/llama-columngroup/component';
import layout from './template';
var alias = Em.computed.alias;

var LlamaHeaderColumngroup = LlamaColumngroup.extend({
	layout: layout,
	classNames: 'llama-header-columngroup',
	itemViewClass: alias('root.HeaderColumnView'),

	columns: null
});

export default LlamaHeaderColumngroup;
