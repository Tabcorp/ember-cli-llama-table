import Em from 'ember';

var SubcontentController = Em.Controller.extend({
	columns: [
		{ order: 1, name: 'id', label: 'Employee ID', isHidden: true },
		{ order: 2, name: 'given_name', label: 'Given Name' },
		{ order: 3, name: 'family_name', label: 'Family Name' }
	],
	config: {
		hasSubcontent: true,
		enableRowClick: true,
		sortProperties: ['family_name']
	},
	actions: {
		rowClick: function (row) {
			row.toggleProperty('isExpanded');
		}
	}
});

export default SubcontentController;
