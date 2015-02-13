import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var get = Em.get;

var ColumnController = Em.ObjectProxy.extend({
	width: defaultValue('content.width', 200),
	minWidth: defaultValue('content.minWidth', 50),
	isClickable: defaultValue('content.isClickable', true)
});

export default ColumnController;
