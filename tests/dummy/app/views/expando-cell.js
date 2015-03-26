import Em from 'ember';
import LlamaBodyCell from 'llama-table/views/llama-body-cell';

var ExpandoCell = LlamaBodyCell.extend({
	templateName: 'expando-cell',
	classNames: 'no-padding',
	isExpanded: Em.computed.alias('content.isExpanded'),
	actions: {
		toggle: function () {
			this.toggleProperty('isExpanded');
		}
	}
});

export default ExpandoCell;
