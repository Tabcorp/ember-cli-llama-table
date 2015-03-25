import Em from 'ember';
var get = Em.get;
var set = Em.set;

var LlamaSubcontent = Em.CollectionView.extend({
	classNames: ['llama-subcontent'],
	contentBinding: 'expandedRows',

	rows: null,

	itemViewClass: Em.computed.alias('controller.EmbedView'),
	expandedRows: Em.computed.filterBy('rows', 'isExpanded'),

	createChildView: function (View, attrs) {
		var row = get(attrs, 'content');
		set(attrs, 'row', row);
		return this._super(View, attrs);
	}
});

export default LlamaSubcontent;