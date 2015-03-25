import Em from 'ember';
import { defaultValue } from 'llama-table/computed';

var RowController = Em.ObjectController.extend({
	isExpanded: false,
	height: defaultValue('content.height', 30),
	subcontentHeight: Em.computed.alias('height')
});

export default RowController;
