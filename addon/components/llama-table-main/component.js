import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';
import layout from './template';
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var bool = computed.bool;

var LlamaTable = Em.Component.extend(ScrollXYMixin, {
	layout: layout,
	classNames: 'llama-table',
	dualHeaders: bool('root.dualHeaders'),
	showFooter: bool('root.showFooter'),
	scrollLeft: alias('root.scrollLeft'),
	scrollTop: alias('root.scrollTop'),

	rows: null,
	columngroups: null,

	didInsertElement: function () {
		this._super();
		this.setHeight();
		this.updateScrollPosition();
	},

	updateScrollPosition: observer('scrollLeft', 'scrollTop', function () {
		var $table = Em.$(this.$());
		$table.scrollLeft(this.get('scrollLeft'));
		$table.scrollTop(this.get('scrollTop'));
	}),

	setHeight: observer('root.maxHeight', function () {
		var $table = Em.$(this.$());
		$table.css('maxHeight', this.get('root.maxHeight'));
	}),

	actions: {
		scrollX: function (pos) {
			this.set('scrollLeft', pos);
		},
		scrollY: function (pos) {
			this.set('scrollTop', pos);
		}
	}
});

export default LlamaTable;
