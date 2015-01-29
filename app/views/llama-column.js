import Em from 'ember';
import LlamaCell from './llama-cell';

var LlamaColumn = Em.CollectionView.extend({
	classNames: 'llama-column',

	itemViewClass: LlamaCell,

	getWidth: function () {
		return this.$().width();
	}
});

export default LlamaColumn;
