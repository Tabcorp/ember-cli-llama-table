import Em from 'ember';
import LlamaBodyCell from 'llama-table/components/llama-body-cell/component';
import layout from 'dummy/templates/components/expando-cell';

var ExpandoCell = LlamaBodyCell.extend({
	layout: layout,
	classNames: 'no-padding',
	isExpanded: Em.computed.alias('content.isExpanded'),
	actions: {
		primaryAction: function (e) {
			e.preventDefault();
			this.send('toggle');
		},
		toggle: function () {
			this.toggleProperty('isExpanded');
		}
	}
});

export default ExpandoCell;
