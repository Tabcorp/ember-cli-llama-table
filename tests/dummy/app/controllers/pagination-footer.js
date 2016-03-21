import Em from 'ember';
var computed = Em.computed;
var alias = Em.computed.alias;

var PaginationFooterController = Em.Controller.extend({
	item: computed('content.@each.item', function () {
		var vals = this.get('content').mapBy('item');
		var sum = vals.reduce(function (total, val) {
			return total + val;
		}, 0);
		return sum;
	})
});

export default PaginationFooterController;
