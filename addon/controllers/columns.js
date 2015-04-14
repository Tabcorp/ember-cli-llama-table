import Em from 'ember';
import Column from 'llama-table/controllers/column';
import ItemControllerFunctionMixin from 'llama-table/mixins/item-controller-function';
var ArrayController = Em.ArrayController;

/**
 * Array controller. Exposes the column item controller to consumers.
 * @module controllers
 * @constructor
 * @class ColumnsController
 * @extends Ember.ArrayController
 * @uses ItemControllerFunctionMixin
 */
var Columns = ArrayController.extend(ItemControllerFunctionMixin, {
	/**
	 * Column controller will be available to any consumers of this array.
	 * @property {Function|String} itemController
	 * @default ColumnController
	 */
	itemController: Column
});

export default Columns;
