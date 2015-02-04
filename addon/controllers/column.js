import Em from 'ember';
var get = Em.get;

var defaultValue = function (prop, val) {
	return Em.computed('content.' + prop, function () {
		var content = this.get('content');
		return content && get(content, prop) || val;
	});
};

var ColumnController = Em.ObjectProxy.extend({
	width: defaultValue('width', 200),
	minWidth: defaultValue('minWidth', 50)
});

export default ColumnController;
