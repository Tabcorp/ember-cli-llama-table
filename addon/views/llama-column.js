import Em from 'ember';
import LlamaCell from './llama-cell';

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',
	itemViewClass: LlamaCell,
	width: Em.computed.alias('column.width'),

	setWidth: function () {
		var width = this.get('width');
		this.$().width(width);
	}.observes('width').on('didInsertElement')
});

export default LlamaColumn;
