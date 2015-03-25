import Em from 'ember';

var EmbeddedView = Em.View.extend({
	templateName: 'embedded',
	fullName: function () {
		return this.get('content.given_name') + ' ' + this.get('content.family_name');
	}.property('content.given_name', 'content.family_name')
});

export default EmbeddedView;
