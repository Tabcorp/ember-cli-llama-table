import Em from 'ember';
import layout from './template';
var get = Em.get;
var set = Em.set;
var observer = Em.observer;
var alias = Em.computed.alias;
var filterBy = Em.computed.filterBy;

var LlamaHeader = Em.Component.extend({
	layout: layout,
	classNames: 'llama-header',
	itemViewClass: alias('root.HeaderColumngroupView'),
	columngroupViews: filterBy('childViews', 'isVisible', true),
	contentBinding: 'columngroups',
	scrollTop: alias('root.scrollTop'),

	columngroups: null,

	didInsertElement: function () {
		this._super();
		this.updateScrollPosition();
	},

	updateScrollPosition: observer('scrollTop', function () {
		var $header = Em.$(this.$());
		$header.css('marginTop', this.get('scrollTop'));
	}),
});

export default LlamaHeader;
