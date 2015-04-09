import Em from 'ember';
import Column from 'llama-table/controllers/column';
import ItemControllerFunctionMixin from 'llama-table/mixins/item-controller-function';
var ArrayController = Em.ArrayController;

var Columns = ArrayController.extend(ItemControllerFunctionMixin, {
	itemController: Column
});

export default Columns;
