import Em from 'ember';
var copy = Em.copy;

var cols = [
	{ name: 'foo', label: 'Foo' },
	{ name: 'bar', label: 'Bar' }
];

var data = [
	{ foo: 'a1', bar: 'b1' },
	{ foo: 'a2', bar: 'b2' }
];

var config = {};

var MultiController = Em.Controller.extend({
	colsA: copy(cols, true),
	colsB: copy(cols, true),
	colsC: cols,
	colsD: cols,
	rowsA: copy(data, true),
	rowsB: copy(data, true),
	rowsC: data,
	rowsD: data,
	configC: config,
	configD: config,
	tableMove: function (direction, table) {
		var up = direction === 'up';
		var $table = table.$();
		var $focused = $(document.activeElement);
		var $column = $focused.parent('.llama-body-column');
		var $allColumns = $column.siblings().andSelf();
		var columnIndex = $column.index($allColumns);
		var $columngroup = $column.parent('.llama-body-columngroup');
		var $allColumngroups = $columngroup.siblings().andSelf();
		var columngroupIndex = $columngroup.index($allColumngroups);
		var $other = up ?
			$table.prevAll('.llama-table-component').first() :
			$table.nextAll('.llama-table-component').first();
		var $cells = $other
			.find('.llama-body-columngroup').eq(columngroupIndex)
			.find('.llama-body-column').eq(columnIndex)
			.find('.llama-body-cell');
		if (up) $cells.last().focus();
		else $cells.first().focus();
	},
	actions: {
		outOfBounds: function (direction, table) {
			switch (direction) {
				case 'up':
				case 'down':
					return this.tableMove(direction, table);
			}
		}
	}
});

export default MultiController;
