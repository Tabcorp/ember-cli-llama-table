import Em from 'ember';

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

/**
 * Fires custom events on the implementor when arrow keys are pressed.
 * @module mixins
 * @constructor
 * @class ArrowKeysMixin
 * @extends Ember.Mixin
 */
var ArrowKeysMixin = Em.Mixin.create({
	keyDown: function (e) {
		switch (e.which) {
			case KEY_LEFT:
				this.send('keyLeft');
				e.preventDefault();
				break;
			case KEY_UP:
				this.send('keyUp');
				e.preventDefault();
				break;
			case KEY_RIGHT:
				this.send('keyRight');
				e.preventDefault();
				break;
			case KEY_DOWN:
				this.send('keyDown');
				e.preventDefault();
				break;
		}
	}
});

export default ArrowKeysMixin;