import Em from 'ember';

var ColumnsController = Em.ArrayController.extend({
	sortProperties: ['order'],
	sortAscending: true
});

export default ColumnsController;
