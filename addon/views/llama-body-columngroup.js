import Em from 'ember';
import LlamaColumngroup from './llama-columngroup';
var set = Em.set;

var LlamaBodyColumngroup = LlamaColumngroup.extend({
	classNames: 'llama-body-columngroup',
	itemViewClass: Em.computed.alias('controller.BodyColumnView'),

	columns: null,
	rows: null,
	visibleRows: null,

	createChildView: function (View, attrs) {
		var rows = this.get('rows');
		var visibleRows = this.get('visibleRows');
		set(attrs, 'rows', rows);
		set(attrs, 'visibleRows', visibleRows);
		return this._super(View, attrs);
	}
});

export default LlamaBodyColumngroup;
