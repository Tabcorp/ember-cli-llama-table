import LlamaColumngroup from './llama-columngroup';

var LlamaBodyColumngroup = LlamaColumngroup.extend({
	templateName: 'llama-body-columngroup',
	classNames: 'llama-body-columngroup',

	columns: null,
	rows: null
});

export default LlamaBodyColumngroup;
