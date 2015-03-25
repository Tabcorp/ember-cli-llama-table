import Em from 'ember';

var LlamaSubcontent = Em.CollectionView.extend({
	templateName: 'llama-subcontent',
	classNames: ['llama-subcontent'],
	contentBinding: 'expandedRows',

	rows: null,

	expandedRows: Em.computed.filterBy('rows', 'isExpanded')
});

export default LlamaSubcontent;
