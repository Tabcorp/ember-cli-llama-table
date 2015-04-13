import Em from 'ember';
var get = Em.get;
var set = Em.set;
var computed = Em.computed;
var alias = computed.alias;
var filterBy = computed.filterBy;

var LlamaSubcontent = Em.CollectionView.extend({
	classNames: ['llama-subcontent'],
	contentBinding: 'expandedRows',

	rows: null,

	itemViewClass: alias('controller.EmbedView'),
	expandedRows: filterBy('rows', 'isExpanded'),

	createChildView: function (View, attrs) {
		var row = get(attrs, 'content');
		set(attrs, 'row', row);
		return this._super(View, attrs);
	}
});

export default LlamaSubcontent;