import Em from 'ember';
var set = Em.set;
var get = Em.get;

var IndexController = Em.Controller.extend({
	tableColumns: [
		{
			name: 'a',
			label: 'A',
			order: 1,
			type: 'number',
			width: 80,
		},
		{
			name: 'b',
			label: 'B',
			order: 2,
			type: 'number',
			width: 80,
		},
		{
			name: 'c',
			label: 'C',
			order: 3,
			type: 'number',
			width: 80,
		},
		{
			name: 'd',
			label: 'D',
			order: 4,
			type: 'number',
			width: 80,
		},
		{
			name: 'e',
			label: 'E',
			order: 5,
			type: 'number',
			width: 80,
		}
	],
	tableData: Em.A(),
	tableConfig: {
		maxHeight: 200,
		isSortable: false,
		isResizable: false,
		onlyFocusEditable: true,
	},
	actions: {
		add: function (num) {
			var label = `Add ${num} rows`;
			console.profile('Adding rows');
			console.time(label);
			var data = [];
			for (var i = 0; i < num; i++) {
				data.push({
					a: Math.random(),
					b: Math.random(),
					c: Math.random(),
					d: Math.random(),
					e: Math.random(),
				});
			}
			this.get('tableData').pushObjects(data);
			console.timeEnd(label);
			label = `Render ${num} rows`;
			console.time(label);
			Em.run.next(function () {
				console.timeEnd(label);
			});
			console.profileEnd();
		},
		clear: function () {
			console.profile('Clearing rows');
			var len = this.get('tableData.length');
			var label = `Clear ${len} rows`;
			console.time(label);
			this.get('tableData').clear();
			console.timeEnd(label);
			console.profileEnd();
		},
	},
});

export default IndexController;
