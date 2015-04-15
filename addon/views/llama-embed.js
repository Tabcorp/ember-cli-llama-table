import Em from 'ember';
var get = Em.get;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var collect = computed.collect;

var LlamaEmbed = Em.ContainerView.extend({
	classNames: 'llama-embed',
	height: alias('row.subcontentHeight'),
	childViews: collect('subcontentView'),

	row: null,

	rows: alias('controller.sortedRows'),

	calculateRowHeight: function (row) {
		var result = get(row, 'height');
		if (get(row, 'isExpanded')) {
			result += get(row, 'subcontentHeight') || 0;
		}
		return result;
	},

	offsetTop: computed('rows.@each.isExpanded', 'rows.@each.height', 'rows.@each.subcontentHeight', function () {
		var sortedRows = this.get('rows');
		var row = this.get('row');
		var index = sortedRows.indexOf(row);
		var previous = sortedRows.slice(0, index);
		var calc = this.calculateRowHeight;
		var previousHeight = previous.reduce(function (total, row) {
			return total + calc(row);
		}, 0);
		var thisHeight = get(row, 'height');
		var offsetTop = previousHeight + thisHeight;
		return offsetTop;
	}),

	updateOffsetTop: observer('offsetTop', function () {
		var $embed = this.$();
		if ($embed) {
			$embed.css('top', this.get('offsetTop'));
		}
	}).on('didInsertElement'),

	updateHeight: observer('height', function () {
		var $embed = this.$();
		if ($embed) {
			$embed.css('height', this.get('height'));
		}
	}).on('didInsertElement'),

	subcontentView: computed(function () {
		var View = this.get('controller.config.subcontentView');
		return this.createChildView(View, {
			content: this.get('content')
		});
	})
});

export default LlamaEmbed;
