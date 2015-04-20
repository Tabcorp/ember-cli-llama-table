import Em from 'ember';
var copy = Em.copy;

var cols = [
	{ name: 'foo', label: 'Foo' },
	{ name: 'bar', label: 'Bar' },
	{ name: 'baz', label: 'Baz' },
	{ name: 'qux', label: 'Qux' }
];

var data = [
	{ foo: 'a0', bar: 'b0', baz: 'c0', qux: 'd0' },
	{ foo: 'a1', bar: 'b1', baz: 'c1', qux: 'd1' },
	{ foo: 'a2', bar: 'b2', baz: 'c2', qux: 'd3' },
	{ foo: 'a3', bar: 'b3', baz: 'c3', qux: 'd3' },
	{ foo: 'a4', bar: 'b4', baz: 'c4', qux: 'd4' },
	{ foo: 'a5', bar: 'b5', baz: 'c5', qux: 'd5' },
	{ foo: 'a6', bar: 'b6', baz: 'c6', qux: 'd6' },
	{ foo: 'a7', bar: 'b7', baz: 'c7', qux: 'd7' },
	{ foo: 'a8', bar: 'b8', baz: 'c8', qux: 'd8' },
	{ foo: 'a9', bar: 'b9', baz: 'c9', qux: 'd9' }
];

var config = {
	maxHeight: 149
};

var MultiController = Em.Controller.extend({
	colsA: copy(cols, true),
	colsB: copy(cols, true),
	colsC: cols,
	colsD: cols,
	rowsA: copy(data, true),
	rowsB: copy(data, true),
	rowsC: data,
	rowsD: data,
	configA: copy(config, true),
	configB: copy(config, true),
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
