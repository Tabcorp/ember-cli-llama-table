import Em from 'ember';

var RowHeightsController = Em.Controller.extend({
	tableColumns: [
		{ name: 'height', label: 'Row height (px)' }
	],

	tableData: Em.A(),

	numRows: 10,
	maxHeight: 400,

	init: function () {
		this._super();
		this.generateData();
	},

	generateData: function () {
		var rows = this.get('tableData');
		var count = this.get('numRows');
		var maxHeight = this.get('maxHeight');
		var data = [];
		// remove existing data
		rows.clear();
		// generate values
		for (var i = 0; i < count; i++) {
			data.push(Math.random());
		}
		// get sum of values
		var total = data.reduce(function (total, value) {
			return total + value;
		}, 0);
		// generate row data
		data = data.map(function (value) {
			return {
				height: Math.round(maxHeight * (value / total))
			};
		});
		// set row data
		rows.pushObjects(data);
	},

	actions: {
		regenerate: function () {
			this.generateData();
		}
	}
});

export default RowHeightsController;
