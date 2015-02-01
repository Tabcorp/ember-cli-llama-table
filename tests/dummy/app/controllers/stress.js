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
			type: 'number'
		},
		{
			name: 'b',
			label: 'B',
			order: 2,
			type: 'number'
		},
		{
			name: 'c',
			label: 'C',
			order: 3,
			type: 'number'
		},
		{
			name: 'd',
			label: 'D',
			order: 4,
			type: 'number'
		},
		{
			name: 'e',
			label: 'E',
			order: 5,
			type: 'number'
		}
	],
	tableData: [],
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
			console.time('Render records');
			Em.run.next(function () {
				console.timeEnd('Render records');
			});
		},
		clear: function () {
			this.get('tableData').clear();
		}
	}
});

export default IndexController;
