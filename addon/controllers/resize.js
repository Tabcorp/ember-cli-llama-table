import Em from 'ember';

/**
 * Used for starting and stopping resize events and monitoring the mouse
 *   position in-between.
 * @module controllers
 * @constructor
 * @class ResizeController
 * @extends Ember.Controller
 */
var ResizeController = Em.Controller.extend({
	eventBegin: null,
	deltaX: 0,
	deltaY: 0,
	init: function () {
		this.stopResize = this.stopResize.bind(this);
		this.handleResize = this.handleResize.bind(this);
	},
	startResize: function (e) {
		this.set('eventBegin', e);
		Em.$(window)
			.one('mouseup', this.stopResize)
			.on('mousemove', this.handleResize);
	},
	handleResize: function (e) {
		var begin = this.get('eventBegin');
		var beginPageX = begin.pageX;
		var beginPageY = begin.pageY;
		this.set('deltaX', e.pageX - beginPageX);
		this.set('deltaY', e.pageY - beginPageY);
	},
	stopResize: function (e) {
		Em.$(window).off('mousemove', this.handleResize);
		this.set('eventBegin', null);
	},
	actions: {
		startResize: function (e) {
			this.startResize(e);
		}
	}
});

export default ResizeController;
