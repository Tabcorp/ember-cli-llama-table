import Em from 'ember';
import RemoveButton from '../views/remove-button-cell';
var set = Em.set;
var get = Em.get;

var IndexController = Em.Controller.extend({
	tableColumns: [
		{
			name: 'a',
			label: 'A',
			order: 1,
			type: 'number',
			width: 80
		},
		{
			name: 'b',
			label: 'B',
			order: 2,
			type: 'number',
			width: 80
		},
		{
			name: 'c',
			label: 'C',
			order: 3,
			type: 'number',
			width: 80
		},
		{
			name: 'd',
			label: 'D',
			order: 4,
			type: 'number',
			width: 80
		},
		{
			name: 'e',
			label: 'E',
			order: 5,
			type: 'number',
			width: 80
		}
	],
	tableData: [],
	tableConfig: {
		maxHeight: 200,
		isSortable: false,
		isResizable: false
	},
	actions: {
		add: function (num) {
			var label = 'Add %@ rows'.fmt(num);
			console.time(label);
			for (var i = 0; i < num; i++) {
				this.get('tableData').pushObject({
					a: Math.random(),
					b: Math.random(),
					c: Math.random(),
					d: Math.random(),
					e: Math.random()
				});
			}
			console.timeEnd(label);
			label = 'Render %@ rows'.fmt(num);
			console.time(label);
			Em.run.next(function () {
				console.timeEnd(label);
			});
		},
		clear: function () {
			var len = this.get('tableData.length');
			var label = 'Clear %@ rows'.fmt(len);
			console.time(label);
			this.get('tableData').clear();
			console.timeEnd(label);
		}
	}
});

export default IndexController;
