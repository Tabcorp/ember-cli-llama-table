import Em from 'ember';
import LlamaColumngroup from './llama-columngroup';
var set = Em.set;

var LlamaFooterColumngroup = LlamaColumngroup.extend({
	templateName: 'llama-footer-columngroup',
	classNames: 'llama-footer-columngroup',
	itemViewClass: Em.computed.alias('controller.FooterColumnView'),

	columns: null,
	rows: null,

	createChildView: function (View, attrs) {
		var rows = this.get('rows');
		set(attrs, 'rows', rows);
		return this._super(View, attrs);
	}
});

export default LlamaFooterColumngroup;
