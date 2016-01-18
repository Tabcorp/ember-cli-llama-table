import Em from 'ember';
import RowController from 'llama-table/controllers/row';

var initializer = {
	name: 'llama-row',
	initialize: function (container, app) {
		container.register('controller:llama-row', RowController);
	},
};

export default initializer;
