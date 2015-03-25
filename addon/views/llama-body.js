import Em from 'ember';

var LlamaBody = Em.ContainerView.extend({
	classNames: ['llama-body'],

	columngroups: null,
	rows: null,

	contentView: function () {
		return this.get('controller.ContentView').create({
			container: this.get('container'),
			controller: this.get('controller'),
			columngroups: this.get('columngroups'),
			rows: this.get('rows')
		});
	}.property(),

	subcontentView: function () {
		return this.get('controller.SubcontentView').create({
			container: this.get('container'),
			controller: this.get('controller'),
			rows: this.get('rows')
		});
	}.property(),

	init: function () {
		this._super();
		this.pushObject(this.get('contentView'));
	},

	toggleSubcontent: function () {
		var hasSubcontent = this.get('controller.hasSubcontent');
		if (hasSubcontent) {
			this.pushObject(this.get('subcontentView'));
		}
		else {
			this.removeObject(this.get('subcontentView'));
		}
	}.on('init').observes('controller.hasSubcontent')
});

export default LlamaBody;
