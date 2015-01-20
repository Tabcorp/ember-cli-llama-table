import Em from 'ember';

var LlamaThHead = Em.Component.extend({
	tagName: 'th',
	layoutName: 'llama-th-head',
	classNames: 'llama-th-head llama-th',

	// column definition
	column: null
});

export default LlamaThHead;
