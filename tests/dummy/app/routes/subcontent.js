import Em from 'ember';

var SubcontentRoute = Em.Route.extend({
	model: function () {
		return Em.A([
			{
				id: 0,
				given_name: 'Bob',
				family_name: 'Belcher'
			},
			{
				id: 1,
				given_name: 'Linda',
				family_name: 'Belcher'
			},
			{
				id: 2,
				given_name: 'Tina',
				family_name: 'Belcher'
			},
			{
				id: 3,
				given_name: 'Gene',
				family_name: 'Belcher'
			},
			{
				id: 4,
				given_name: 'Louise',
				family_name: 'Belcher'
			},
			{
				id: 5,
				given_name: 'Jimmy',
				family_name: 'Pesto'
			},
			{
				id: 6,
				given_name: 'Jimmy Jr',
				family_name: 'Pesto'
			},
			{
				id: 7,
				given_name: 'Andy',
				family_name: 'Pesto'
			},
			{
				id: 8,
				given_name: 'Ollie',
				family_name: 'Pesto'
			}
		]);
	}
});

export default SubcontentRoute;
