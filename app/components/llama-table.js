import Em from 'ember';

var LlamaTable = Em.Component.extend({
	layoutName: 'llama-table',
	classNames: 'llama-table-component',

	// column definitions
	columns: null,

	// table data
	rows: null,

	columngroups: function () {
		var columns = this.get('columns');
		// single group for now
		return [columns];
	}.property('columns'),

	actions: {
		scrollX: function (pos) {
			this.$('.llama-header').css('marginLeft', -pos);
		}
	}
});

export default LlamaTable;
