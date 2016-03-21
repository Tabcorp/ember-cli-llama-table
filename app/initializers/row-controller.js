import RowController from 'llama-table/controllers/row';

var initializer = {
	name: 'llama-row',
	initialize: function (container) {
		container.register('controller:llama-row', RowController);
	},
};

export default initializer;
