import Em from 'ember';
import ArrowKeysMixin from 'llama-table/mixins/arrow-keys';
import CopyController from 'llama-table/controllers/copy';
import layout from './template';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var filterBy = computed.filterBy;
var TAB = 9;
var ENTER = 13;

var LlamaContent = Em.Component.extend(ArrowKeysMixin, {
	layout: layout,
	classNames: 'llama-content',
	attributeBindings: ['tabindex'],
	tabindex: 0,
	itemViewClass: alias('root.BodyColumngroupView'),
	columngroupViews: filterBy('childViews', 'isVisible', true),

	rows: null,
	columngroups: null,
	contentBinding: 'columngroups',

	copyController: CopyController.create(),

	handleTabKey: function (e) {
		e.preventDefault();
		if (e.shiftKey) {
			this.get('root').send('reverseTabKey');
		}
		else {
			this.get('root').send('tabKey');
		}
	},

	handleEnterKey: function (e) {
		e.preventDefault();
		if (e.shiftKey) {
			this.get('root').send('reverseEnterKey');
		}
		else {
			this.get('root').send('enterKey');
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

	actions: {
		keyLeft: function (e) {
			var controller = this.get('root');
			if (e.shiftKey) {
				controller.send('focusHardLeft');
			}
			else {
				controller.send('focusLeft');
			}
		},
		keyUp: function (e) {
			var controller = this.get('root');
			if (e.shiftKey) {
				controller.send('focusHardUp');
			}
			else {
				controller.send('focusUp');
			}
		},
		keyRight: function (e) {
			var controller = this.get('root');
			if (e.shiftKey) {
				controller.send('focusHardRight');
			}
			else {
				controller.send('focusRight');
			}
		},
		keyDown: function (e) {
			var controller = this.get('root');
			if (e.shiftKey) {
				controller.send('focusHardDown');
			}
			else {
				controller.send('focusDown');
			}
		}
	}
});

export default LlamaContent;
