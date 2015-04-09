import Em from 'ember';
import ItemControllerFunctionMixin from 'llama-table/mixins/item-controller-function';
var ArrayController = Em.ArrayController;

var Rows = ArrayController.extend(ItemControllerFunctionMixin);

export default Rows;
