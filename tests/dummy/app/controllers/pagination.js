import Em from 'ember';
import PaginationFooterController from './pagination-footer';
var set = Em.set;
var get = Em.get;

var PaginationController = Em.Controller.extend({

	currentPage: 0,

	tableColumns: [
		{
			name: 'item',
			label: 'Item',
			order: 1,
			type: 'number',
			width: 50
		},
	],

	tableData: [
		{ item: 1 },
		{ item: 2 },
		{ item: 3 },
		{ item: 4 },
		{ item: 5 },
		{ item: 6 },
		{ item: 7 },
		{ item: 8 },
		{ item: 9 },
		{ item: 10 },
	],

	tableConfig: {
		maxHeight: 300,
		showFooter: true,
		footerController: PaginationFooterController,
	},

	actions: {
		setPage: function (page) {
			this.set('currentPage', page);
		},
	},

});

export default PaginationController;
