import Em from 'ember';

var LlamaBody = Em.ContainerView.extend({
	classNames: ['llama-body'],

	columngroups: null,
	rows: null,

	contentView: function () {
		var View = this.get('controller.ContentView');
		return this.createChildView(View, {
			columngroups: this.get('columngroups'),
			rows: this.get('rows')
		});
	}.property(),

	subcontentView: function () {
		var View = this.get('controller.SubcontentView');
		return this.createChildView(View, {
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
