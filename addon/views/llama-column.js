import Em from 'ember';

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	width: Em.computed.alias('column.width'),

	setWidth: function () {
		var width = this.get('width');
		this.$().width(width);
	}.observes('width').on('didInsertElement')
});

export default LlamaColumn;
