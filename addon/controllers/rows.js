import Em from 'ember';
import Row from 'llama-table/controllers/row';
import ItemControllerFunctionMixin from 'llama-table/mixins/item-controller-function';
var ArrayController = Em.ArrayController;

/**
 * Array controller. Used to store data records.
 * @module controllers
 * @constructor
 * @class RowsController
 * @extends Ember.ArrayController
 * @uses ItemControllerFunctionMixin
 */
var Rows = ArrayController.extend(ItemControllerFunctionMixin, {
	/**
	 * Row controller will be available to any consumers of this array.
	 * @property {Function|String} itemController
	 * @default RowController
	 */
	itemController: Row
});

export default Rows;
