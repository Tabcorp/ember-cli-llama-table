import LlamaColumngroup from './llama-columngroup';
import template from 'llama-table/templates/llama-body-columngroup';

var LlamaBodyColumngroup = LlamaColumngroup.extend({
	template: template,
	classNames: 'llama-body-columngroup'
});

export default LlamaBodyColumngroup;
