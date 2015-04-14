import Em from 'ember';
import ScrollHandlerMixin from 'llama-table/mixins/scroll-handler';
var computed = Em.computed;

/**
 * Fires 'scrollX' and 'scrollY' events when each axis is scrolled.
 * @module mixins
 * @constructor
 * @class ScrollXYMixin
 * @extends Ember.Mixin
 */
var ScrollXYMixin = Em.Mixin.create(ScrollHandlerMixin, {

	_scrollLeft: computed(function () {
		return this.$().scrollLeft();
	}),

	_scrollTop: computed(function () {
		return this.$().scrollTop();
	}),

	scroll: function (e) {
		var oldScrollLeft = this.get('_scrollLeft');
		var newScrollLeft = this.$().scrollLeft();
		if (newScrollLeft !== oldScrollLeft) {
			this.set('_scrollLeft', newScrollLeft);
			this.send('scrollX', newScrollLeft);
		}
		var oldScrollTop = this.get('_scrollTop');
		var newScrollTop = this.$().scrollTop();
		if (newScrollTop !== oldScrollTop) {
			this.set('_scrollTop', newScrollTop);
			this.send('scrollY', newScrollTop);
		}
	}
});

export default ScrollXYMixin;