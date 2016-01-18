import Em from 'ember';

var datasets = {
	dataset1: Em.A([
		{ col1: 'dataset1 row1 col1', col2: 'dataset1 row1 col2' },
		{ col1: 'dataset1 row2 col1', col2: 'dataset1 row2 col2' },
	]),
	dataset2: Em.A([
		{ col1: 'dataset2 row1 col1', col2: 'dataset2 row1 col2' },
		{ col1: 'dataset2 row2 col1', col2: 'dataset2 row2 col2' },
	]),
};

var columnsets = {
	columnset1: Em.A([
		{ name: 'col1' },
	]),
	columnset2: Em.A([
		{ name: 'col2' },
	]),
};

var SwitchController = Em.Controller.extend({
	rows: Em.ArrayProxy.create(),
	columns: Em.ArrayProxy.create(),

	datasets: datasets,
	columnsets: columnsets,

	init: function () {
		this._super();
		this.send('switchDataset', 'datasets.dataset1');
		this.send('switchColumnset', 'columnsets.columnset1');
	},

	actions: {
		switchDataset: function (name) {
			this.set('rows.content', this.get(name));
		},
		switchColumnset: function (name) {
			this.set('columns.content', this.get(name));
		},
	},
});

export default SwitchController;
