import Em from 'ember';
import PaginationFooterController from './pagination-footer';
var set = Em.set;
var get = Em.get;
var computed = Em.computed;

function times (n, iteratee, context) {
	let result = [];

	for (let i = 0; i < n; i++) {
		result.push(iteratee.call(context, i));
	}

	return result;
}

var PaginationController = Em.Controller.extend({

	rowsInTable: 10,
	rowsPerPage: 3,
	currentPage: 1,

	buttons: computed('rowsInTable', 'rowsPerPage', function () {
		const rowsInTable = Number(this.get('rowsInTable'));
		const rowsPerPage = Number(this.get('rowsPerPage'));
		const numPages = Math.ceil(rowsInTable / rowsPerPage);

		return times(numPages, x => x + 1);
	}),

	tableColumns: [
		{
			name: 'item',
			label: 'Item',
			order: 1,
			type: 'number',
			width: 50
		},
	],

	tableData: computed('rowsInTable', function () {
		const rowsInTable = Number(this.get('rowsInTable'));
		return times(rowsInTable, (x) => {
			return { item: x + 1 };
		});
	}),

	tableConfig: {
		maxHeight: 300,
		showFooter: true,
		wrapFocusHorizontal: true,
		wrapFocusVertical: true,
		footerController: PaginationFooterController,
	},

	actions: {
		setPage: function (page) {
			this.set('currentPage', page);
		},
	},

});

export default PaginationController;
