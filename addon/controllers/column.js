import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var ControllerMixin = Em.ControllerMixin;
var get = Em.get;
var computed = Em.computed;

var ColumnController = Em.ObjectProxy.extend(ControllerMixin, {
	width: defaultValue('model.width', 200),
	minWidth: defaultValue('model.minWidth', 50),
	isClickable: defaultValue('model.isClickable', false),
	showLabel: defaultValue('model.showLabel', true),
	textAlign: computed('model.textAlign', 'type', function () {
		var value = this.get('model.textAlign');
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
