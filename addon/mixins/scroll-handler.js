import Em from 'ember';
var get = Em.get;
var run = Em.run;

var ScrollHandlerMixin = Em.Mixin.create({
	didInsertElement: function () {
		this._super();
		var context = this;
		this.$().on('scroll.scroll-handler-mixin', function (e) {
			context.handleEvent('scroll', e);
		});
	},
	willDestroyElement: function () {
		this.$().off('scroll.scroll-handler-mixin');
		this._super();
	}
});

export default ScrollHandlerMixin;
