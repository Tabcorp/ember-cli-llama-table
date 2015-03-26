import Em from 'ember';
import LlamaColumngroup from './llama-columngroup';

var LlamaHeaderColumngroup = LlamaColumngroup.extend({
	classNames: 'llama-header-columngroup',
	itemViewClass: Em.computed.alias('controller.HeaderColumnView'),

	columns: null
});

export default LlamaHeaderColumngroup;
