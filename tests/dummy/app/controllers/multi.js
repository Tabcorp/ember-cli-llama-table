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

var MultiController = Em.Controller.extend({
	colsA: copy(cols),
	colsB: copy(cols),
	rowsA: copy(data),
	rowsB: copy(data)
});

export default MultiController;
