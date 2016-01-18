import Em from 'ember';
var EmberError = Em.Error;
var get = Em.get;

/**
 * Allows array controllers to define their item controller as a constructor
 *   rather than a string. Avoids using the container to lookup a class. Useful
 *   for item controllers which are not added to the container such as those
 *   defined by addons.
 * @module mixins
 * @constructor
 * @class ItemControllerFunctionMixin
 * @extends Ember.Mixin
 */
var ItemControllerFunctionMixin = Em.Mixin.create({
	/**
	 * Optional item controller.
	 * @property {String|Function} itemController
	 * @default null
	 */
	itemController: null,

	/**
	 * Reimplement `Ember.ArrayController#controllerAt` to allow
	 *   `itemController` to be a constructor, not just a string.
	 * @method controllerAt
	 * @param {Number} idx Index of item
	 * @param {*} object Item
	 * @param {String|Function} controllerClass Item controller class
	 */
	controllerAt: function (idx, object, controllerClass) {
		var container = get(this, 'container');
		var subControllers = this._subControllers;
		var fullName, subController, subControllerFactory, parentController, options, controllerClassType, Class;

		if (subControllers.length > idx) {
			subController = subControllers[idx];
			if (subController) {
				return subController;
			}
		}

		if (this._isVirtual) {
			parentController = get(this, 'parentController');
		}
		else {
			parentController = this;
		}

		controllerClassType = typeof controllerClass;
		// differs from default implementation here
		if (controllerClassType === 'function') {
			Class = controllerClass;
		}
		else if (controllerClassType === 'string') {
			fullName = 'controller:' + controllerClass;
			if (!container.has(fullName)) {
				throw new EmberError('Could not resolve itemController: "' + controllerClass + '"');
			}
			Class = container.lookupFactory(fullName);
		}
		else {
			throw new EmberError('itemController must be string or function, is ' + controllerClassType);
		}

		subController = Class.create({
			target: parentController,
			parentController: parentController,
			model: object
		});

		subControllers[idx] = subController;

		return subController;
	},
});

export default ItemControllerFunctionMixin;
