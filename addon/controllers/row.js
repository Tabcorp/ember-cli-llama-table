import Em from 'ember';
import { defaultValue } from 'llama-table/computed';

var RowController = Em.ObjectProxy.extend({
	content: Em.computed.alias('model'),
	isExpanded: false,
	height: defaultValue('content.height', 30),
	subcontentHeight: Em.computed.reads('height')
});

export default RowController;
