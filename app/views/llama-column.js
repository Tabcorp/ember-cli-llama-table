import Em from 'ember';

var LlamaColumn = Em.View.extend({
	classNames: 'llama-column',

	getWidth: function () {
		return this.$().width();
	}
});

export default LlamaColumn;
