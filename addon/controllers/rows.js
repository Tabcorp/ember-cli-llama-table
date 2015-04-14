import Em from 'ember';
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
var Rows = ArrayController.extend(ItemControllerFunctionMixin);

export default Rows;
