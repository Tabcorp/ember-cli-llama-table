import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var ControllerMixin = Em.ControllerMixin;
var get = Em.get;
var computed = Em.computed;

var ColumnController = Em.ObjectProxy.extend(ControllerMixin, {
	width: defaultValue('content.width', 200),
	minWidth: defaultValue('content.minWidth', 50),
	isClickable: defaultValue('content.isClickable', false),
	showLabel: defaultValue('content.showLabel', true),
	textAlign: computed('content.textAlign', 'type', function () {
		var value = this.get('content.textAlign');
		if (!Em.isEmpty(value)) {
			return value;
		}
		if (this.get('type') === 'number') {
			return 'right';
		}
		return 'left';
	})
});

export default ColumnController;
