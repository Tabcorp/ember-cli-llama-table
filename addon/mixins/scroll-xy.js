import Em from 'ember';
import ScrollHandlerMixin from 'llama-table/mixins/scroll-handler';

var SCROLL_LEFT_ACTION = 'scrollX';
var SCROLL_TOP_ACTION = 'scrollY';

var ScrollXYMixin = Em.Mixin.create(ScrollHandlerMixin, {

	_scrollLeft: Em.computed(function () {
		return this.$().scrollLeft();
	}),

	_scrollTop: Em.computed(function () {
		return this.$().scrollTop();
	}),

	scroll: function (e) {
		var oldScrollLeft = this.get('_scrollLeft');
		var newScrollLeft = this.$().scrollLeft();
		if (newScrollLeft !== oldScrollLeft) {
			this.set('_scrollLeft', newScrollLeft);
			this.send(SCROLL_LEFT_ACTION, newScrollLeft);
		}
		var oldScrollTop = this.get('_scrollTop');
		var newScrollTop = this.$().scrollTop();
		if (newScrollTop !== oldScrollTop) {
			this.set('_scrollTop', newScrollTop);
			this.send(SCROLL_TOP_ACTION, newScrollTop);
		}
	}
});

export default ScrollXYMixin;