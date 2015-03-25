import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';
import ArrowKeysMixin from 'llama-table/mixins/arrow-keys';
import CopyController from 'llama-table/controllers/copy';
var get = Em.get;
var set = Em.set;
var TAB = 9;
var ENTER = 13;

var LlamaBody = Em.CollectionView.extend(ScrollXYMixin, ArrowKeysMixin, {
	classNames: 'llama-body',
	attributeBindings: ['tabindex'],
	tabindex: 0,
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

	handleTabKey: function (e) {
		e.preventDefault();
		if (e.shiftKey) {
			this.get('controller').send('reverseTabKey');
		}
		else {
			this.get('controller').send('tabKey');
		}
	},

	handleEnterKey: function (e) {
		e.preventDefault();
		if (e.shiftKey) {
			this.get('controller').send('reverseEnterKey');
		}
		else {
			this.get('controller').send('enterKey');
		}
	},

	keyDown: function (e) {
		var controller = this.get('copyController');
		var isCopy = controller.isShortcutCopy(e);
		var isRange = controller.isSelectionRange();
		if (isCopy && !isRange) {
			controller.copy(e.target);
		}
		else if (e.which === TAB) {
			this.handleTabKey(e);
		}
		else if (e.which === ENTER) {
			this.handleEnterKey(e);
		}
		else {
			this._super(e);
		}
	},

	setHeight: function () {
		var $body = this.$();
		if ($body) {
			$body.css('maxHeight', this.get('controller.maxHeight'));
		}
	}.on('didInsertElement').observes('controller.maxHeight'),

	actions: {
		scrollX: function (pos) {
			this.get('controller').send('scrollX', pos);
		},
		scrollY: function (pos) {
			this.get('controller').send('scrollY', pos);
		},
		keyLeft: function () {
			this.get('controller').send('focusLeft');
		},
		keyUp: function () {
			this.get('controller').send('focusUp');
		},
		keyRight: function () {
			this.get('controller').send('focusRight');
		},
		keyDown: function () {
			this.get('controller').send('focusDown');
		}
	}
});

export default LlamaBody;
