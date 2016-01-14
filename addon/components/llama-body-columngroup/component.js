import Em from 'ember';
import LlamaColumngroup from 'llama-table/components/llama-columngroup/component';
import layout from './template';
var set = Em.set;

var LlamaBodyColumngroup = LlamaColumngroup.extend({
	layout: layout,
	classNames: 'llama-body-columngroup',
	itemViewClass: Em.computed.alias('root.BodyColumnView'),

	columns: null,
	rows: null
});

export default LlamaBodyColumngroup;
