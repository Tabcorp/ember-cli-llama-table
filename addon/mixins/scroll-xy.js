import Em from 'ember';
import ScrollHandlerMixin from 'llama-table/mixins/scroll-handler';
var computed = Em.computed;
var observer = Em.observer;

/**
 * Fires 'scrollX' and 'scrollY' events when each axis is scrolled.
 * @module mixins
 * @constructor
 * @class ScrollXYMixin
 * @extends Ember.Mixin
 */
var ScrollXYMixin = Em.Mixin.create(ScrollHandlerMixin, {

	_scrollLeft: computed(function () {
		return Em.$(this.$()).scrollLeft();
	}),

	_scrollTop: computed(function () {
		return Em.$(this.$()).scrollTop();
	}),

	_updateScrollLeftAndTop: observer(function () {
		this.get('_scrollLeft');
		this.get('_scrollTop');
	}),

	didInsertElement: function () {
		this._super();
		this._updateScrollLeftAndTop();
	},

	scroll: function (e) {
		var $el = Em.$(this.$());
		var oldScrollLeft = this.get('_scrollLeft');
		var newScrollLeft = $el.scrollLeft();
		if (newScrollLeft !== oldScrollLeft) {
			this.set('_scrollLeft', newScrollLeft);
			this.send('scrollX', newScrollLeft);
		}
		var oldScrollTop = this.get('_scrollTop');
		var newScrollTop = $el.scrollTop();
		if (newScrollTop !== oldScrollTop) {
			this.set('_scrollTop', newScrollTop);
			this.send('scrollY', newScrollTop);
		}
	}
});

export default ScrollXYMixin;