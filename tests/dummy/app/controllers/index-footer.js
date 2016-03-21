import Em from 'ember';
var computed = Em.computed;
var alias = Em.computed.alias;

var IndexFooterController = Em.Controller.extend({
	episode: alias('content.length'),
	million_viewers: computed('content.@each.million_viewers', function () {
		var vals = this.get('content').mapBy('million_viewers');
		var sum = vals.reduce(function (total, val) {
			return total + val;
		}, 0);
		return sum;
	}),
});

export default IndexFooterController;
