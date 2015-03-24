import Em from 'ember';
import ScrollHandlerMixin from 'llama-table/mixins/scroll-handler';

var ScrollXYMixin = Em.Mixin.create(ScrollHandlerMixin, {

	_scrollLeft: function () {
		return this.$().scrollLeft();
	}.property(),

	_scrollTop: function () {
		return this.$().scrollTop();
	}.property(),

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