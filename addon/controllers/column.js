import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var get = Em.get;

var ColumnController = Em.ObjectProxy.extend({
	width: defaultValue('content.width', 200),
	minWidth: defaultValue('content.minWidth', 50),
	isClickable: defaultValue('content.isClickable', false),
	textAlign: function () {
		var value = this.get('content.textAlign');
		if (!Em.isEmpty(value)) {
			return value;
		}
		if (this.get('type') === 'number') {
			return 'right';
		}
		return 'left';
	}.property('content.textAlign', 'type')
});

export default ColumnController;
