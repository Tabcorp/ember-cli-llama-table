import Em from 'ember';

var FooterController = Em.Controller.extend({
	columns: [
		{ order: 0, name: 'expando', label: 'Expand subcontent', type: 'expando', width: 50, isResizable: false, isSortable: false, showLabel: false },
		{ order: 1, name: 'id', label: 'Employee ID', isHidden: true },
		{ order: 2, name: 'given_name', label: 'Given Name' },
		{ order: 3, name: 'family_name', label: 'Family Name' }
	],
	config: {
		showFooter: true
	}
});

export default FooterController;
