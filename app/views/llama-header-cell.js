import LlamaCell from './llama-cell';

var LlamaHeaderCell = LlamaCell.extend({
	layoutName: 'llama-header-cell',
	classNames: 'llama-header-cell',

	// column definition
	column: null,

	mouseDown: function (e) {
		if (e.which === 1) {
			e.preventDefault();
			this.get('controller').send('sortBy', this.get('column.name'));
		}
	}
});

export default LlamaHeaderCell;
