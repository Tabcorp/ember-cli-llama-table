import Em from 'ember';
import LlamaColumngroup from './llama-columngroup';
var alias = Em.computed.alias;

var LlamaHeaderColumngroup = LlamaColumngroup.extend({
	classNames: 'llama-header-columngroup',
	itemViewClass: alias('controller.HeaderColumnView'),

	columns: null
});

export default LlamaHeaderColumngroup;
