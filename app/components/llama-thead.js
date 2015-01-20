import Em from 'ember';

var LlamaThead = Em.Component.extend({
	tagName: 'thead',
	layoutName: 'llama-thead',
	classNames: 'llama-thead',

	// column definitions
	columns: null
});

export default LlamaThead;
