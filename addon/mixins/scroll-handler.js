import Em from 'ember';

/**
 * Enables custom 'scroll' event.
 * @module mixins
 * @constructor
 * @class ScrollHandlerMixin
 * @extends Ember.Mixin
 */
var ScrollHandlerMixin = Em.Mixin.create({
	didInsertElement: function () {
		this._super();
		this.$().on('scroll.scroll-handler-mixin', (e) => {
			this.handleEvent('scroll', e);
		});
	},
	willDestroyElement: function () {
		this.$().off('scroll.scroll-handler-mixin');
		this._super();
	},
});

export default ScrollHandlerMixin;
