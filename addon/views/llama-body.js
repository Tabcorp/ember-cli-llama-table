import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';
import CopyController from 'llama-table/controllers/copy';
var get = Em.get;
var set = Em.set;

var LlamaBody = Em.CollectionView.extend(ScrollXYMixin, {
	classNames: 'llama-body',
	itemViewClass: Em.computed.alias('controller.BodyColumngroupView'),
	columngroupViews: Em.computed.alias('childViews'),

	rows: null,
	columngroups: null,
	contentBinding: 'columngroups',

	copyController: CopyController.create(),

	createChildView: function (View, attrs) {
		var rows = this.get('rows');
		var columns = get(attrs, 'content');
		set(attrs, 'rows', rows);
		set(attrs, 'columns', columns);
		return this._super(View, attrs);
	},

	keyDown: function (e) {
		var controller = this.get('copyController');
		var isCopy = controller.isShortcutCopy(e);
		var isRange = controller.isSelectionRange();
		if (isCopy && !isRange) {
			controller.copy(e.target);
		}
	},

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
