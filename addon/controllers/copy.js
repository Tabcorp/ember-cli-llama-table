import Em from 'ember';
var run = Em.run;
var computed = Em.computed;

/**
 * Facilitate copying cell content when cell is focused.
 * @module controllers
 * @constructor
 * @class CopyController
 * @extends Ember.Controller
 */
var Copy = Em.Controller.extend({
	/**
	 * Key code of copy key. By default this value is the key code for 'C'.
	 * @property {Number} KEY_COPY
	 */
	KEY_COPY: 67,

	/**
	 * Determines if text highlighting is hidden.
	 * @property {Boolean} hideSelection
	 */
	hideSelection: true,

	/**
	 * Style tag which, when present in the DOM, will hide all text
	 *   highlighting.
	 * @property {jQuery} $hide
	 */
	$hide: computed({
		get: function () {
			var style = document.createElement('style');
			var contents = '::selection { background: inherit; color: inherit; }';
			style.appendChild(document.createTextNode(contents));
			return Em.$(style);
		}
	}),

	/**
	 * Select an entire element and its contents
	 * @method selectElementContents
	 * @param {Element} el DOM element
	 */
	selectElementContents: function (el) {
		var $el = Em.$(el);
		$el.each(function () {
			var range = document.createRange();
			range.selectNodeContents(this);
			window.getSelection().addRange(range);
		});
	},

	/**
	 * Remove all selections from the page
	 * @method clearSelection
	 */
	clearSelection: function () {
		window.getSelection().removeAllRanges();
	},

	/**
	 * Make selections transparent
	 * @method hideHighlight
	 */
	hideHighlight: function () {
		var $hide = this.get('$hide');
		Em.$('head').append($hide);
	},

	/**
	 * Restore selections to their previous appearance
	 * @method showHighlight
	 */
	showHighlight: function () {
		var $hide = this.get('$hide');
		$hide.remove();
	},

	/**
	 * Test an event object to see if it's a CTRL+C
	 * @method isShortcutCopy
	 * @param {Event} e Event object to test
	 * @return {Boolean} Event was a CTRL+C
	 */
	isShortcutCopy: function (e) {
		return e.ctrlKey && e.keyCode === this.get('KEY_COPY');
	},

	/**
	 * Test to see if any text is currently highlighted
	 * @method isSelectionRange
	 * @return {Boolean} Text is being highlighted
	 */
	isSelectionRange: function () {
		var sel = window.getSelection();
		var isRange = String(sel.type).toLowerCase() === 'range';
		return isRange;
	},

	/**
	 * Initiate the copy process on an element. Highlights the element before
	 *   the copy event and removes the highlight after.
	 * @method copy
	 * @param {Element|jQuery} el Element to copy
	 */
	copy: function (el) {
		var $el = Em.$(el);
		var hideSelection = this.get('hideSelection');
		this.selectElementContents($el);
		if (hideSelection) {
			this.hideHighlight();
			run.next(this, function () {
				this.clearSelection();
				this.showHighlight();
			});
		}
	}
});

export default Copy;
