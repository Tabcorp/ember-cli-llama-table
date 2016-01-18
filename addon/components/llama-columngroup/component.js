import Em from 'ember';
import layout from './template';
var get = Em.get;
var set = Em.set;
var on = Em.on;
var observer = Em.observer;
var computed = Em.computed;
var setDiff = computed.setDiff;
var filterBy = computed.filterBy;
var mapBy = computed.mapBy;
var sum = computed.sum;

var LlamaColumngroup = Em.Component.extend({
	layout: layout,
	classNames: 'llama-columngroup',
	columnViews: filterBy('childViews', 'isVisible', true),
	contentBinding: 'columns',

	columns: null,

	hiddenColumns: filterBy('columns', 'isHidden'),
	visibleColumns: setDiff('columns', 'hiddenColumns'),
	visibleColumnWidths: mapBy('visibleColumns', 'width'),
	width: sum('visibleColumnWidths'),

	setWidth: on('didInsertElement', observer('width', function () {
		var width = this.get('width');
		var $columngroup = Em.$(this.$());
		$columngroup.width(width);
	})),
});

export default LlamaColumngroup;
