import Em from 'ember';
import LlamaColumngroup from './llama-columngroup';
var set = Em.set;

var LlamaBodyColumngroup = LlamaColumngroup.extend({
	templateName: 'llama-body-columngroup',
	classNames: 'llama-body-columngroup',
	itemViewClass: Em.computed.alias('controller.BodyColumnView'),

	columns: null,
	rows: null,

	createChildView: function (View, attrs) {
		var rows = this.get('rows');
		set(attrs, 'rows', rows);
		return this._super(View, attrs);
	}
});

export default LlamaBodyColumngroup;
