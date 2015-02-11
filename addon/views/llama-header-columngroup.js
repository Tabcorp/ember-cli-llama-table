import LlamaColumngroup from './llama-columngroup';
import template from 'llama-table/templates/llama-header-columngroup';

var LlamaHeaderColumngroup = LlamaColumngroup.extend({
	template: template,
	classNames: 'llama-header-columngroup'
});

export default LlamaHeaderColumngroup;
