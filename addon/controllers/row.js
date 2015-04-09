import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var computed = Em.computed;
var alias = computed.alias;
var reads = computed.reads;

var RowController = Em.ObjectProxy.extend({
	content: alias('model'),
	isExpanded: false,
	height: defaultValue('content.height', 30),
	subcontentHeight: reads('height')
});

export default RowController;
