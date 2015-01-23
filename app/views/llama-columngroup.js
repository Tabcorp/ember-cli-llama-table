import Em from 'ember';

var LlamaColumngroup = Em.View.extend({
	classNames: 'llama-columngroup',

	columns: null,

	updateTotalWidth: function () {
		var total = 0;
		this.get('childViews').forEach(function (view) {
			total += view.getWidth();
		});
		this.$().width(total);
	},

	onChildViewUpdate: function () {
		Em.run.later(this, this.updateTotalWidth, 0);
	}.observes('childViews'),

	didInsertElement: function () {
		this._super();
		Em.run.scheduleOnce('afterRender', this, this.updateTotalWidth);
	}
});

export default LlamaColumngroup;
