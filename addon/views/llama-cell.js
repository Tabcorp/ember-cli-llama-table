import Em from 'ember';

var LlamaCell = Em.View.extend({
	classNames: 'llama-cell',

	column: null,
	row: null,

	config: function () {
		var types = this.get('controller.config.types');
		if (!Em.isArray(types)) {
			return null;
		}
		var name = this.get('column.name');
		var type = types.findBy('name', name);
		return type;
	}.property('column.name', 'controller.config.types')
});

export default LlamaCell;
