import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';

var LlamaBody = Em.ContainerView.extend(ScrollXYMixin, {
	classNames: ['llama-body'],
	isEmpty: Em.computed.alias('controller.isEmpty'),

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

	emptyView: function () {
		var View = this.get('controller.EmptyView');
		return this.createChildView(View, {});
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
	}.on('init').observes('controller.hasSubcontent'),

	toggleEmpty: function () {
		var isEmpty = this.get('isEmpty');
		if (isEmpty) {
			this.pushObject(this.get('emptyView'));
		}
		else {
			this.removeObject(this.get('emptyView'));
		}
	}.on('init').observes('isEmpty'),

	actions: {
		scrollX: function (pos) {
			this.get('controller').send('scrollX', pos);
		},
		scrollY: function (pos) {
			this.get('controller').send('scrollY', pos);
		}
	}
});

export default LlamaBody;
