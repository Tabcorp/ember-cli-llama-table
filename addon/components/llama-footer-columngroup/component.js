import Em from 'ember';
import LlamaColumngroup from 'llama-table/components/llama-columngroup/component';
import layout from './template';
var set = Em.set;
var alias = Em.computed.alias;

var LlamaFooterColumngroup = LlamaColumngroup.extend({
	layout: layout,
	classNames: 'llama-footer-columngroup',
	itemViewClass: alias('root.FooterColumnView'),

	columns: null,
	data: null,
});

export default LlamaFooterColumngroup;
