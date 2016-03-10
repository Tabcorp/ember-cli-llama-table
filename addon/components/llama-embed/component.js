import Em from 'ember';
import layout from './template';
var get = Em.get;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;

var LlamaEmbed = Em.Component.extend({
	layout: layout,
	classNames: 'llama-embed',
	height: alias('row.subcontentHeight'),

	row: null,

	rows: alias('root.sortedRows'),

	didInsertElement: function () {
		this._super();
		this.updateOffsetTop();
		this.updateHeight();
	},

	calculateRowHeight: function (row) {
		var result = get(row, 'height');
		if (get(row, 'isExpanded')) {
			result += get(row, 'subcontentHeight') || 0;
		}
		return result;
	},

	offsetTop: null,

	rowHeightHandler: function () {
		var sortedRows = this.get('rows');
		var row = this.get('row');
		var index = sortedRows.indexOf(row);
		var previous = sortedRows.slice(0, index);
		var previousHeight = previous.reduce((total, row) => {
			return total + this.calculateRowHeight(row);
		}, 0);
		var thisHeight = get(row, 'height');
		var offsetTop = previousHeight + thisHeight;
		this.set('offsetTop', offsetTop);
	},

	rowHeightObserver: observer('rows.@each.isExpanded', 'rows.@each.height', 'rows.@each.subcontentHeight', function () {
		Em.run.once(this, this.rowHeightHandler);
	}),

	updateOffsetTop: observer('offsetTop', function () {
		var $embed = Em.$(this.$());
		$embed.css('top', this.get('offsetTop'));
	}),

	updateHeight: observer('height', function () {
		var $embed = Em.$(this.$());
		$embed.css('height', this.get('height'));
	}),
});

export default LlamaEmbed;
