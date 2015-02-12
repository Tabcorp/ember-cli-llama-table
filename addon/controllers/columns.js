import Em from 'ember';
import Column from './column';
var ArrayProxy = Em.ArrayProxy;
var Sortable = Em.SortableMixin;

var ControllerArray = ArrayProxy.extend({
	itemController: Em.ObjectController,
	lookupItemController: function (object) {
		return this.get('itemController');
	},
	mapController: function (obj) {
		var controllerClass = this.lookupItemController(obj);
		if (controllerClass) {
			return controllerClass.create({
				target: this,
				parentController: this,
				content: obj
			});
		}
	},
	arrangedContent: function () {
		return this.get('content').map(this.mapController, this);
	}.property('content'),
	contentArrayDidChange: function (arr, i, removedCount, addedCount) {
		var addedObjects = arr.slice(i, i + addedCount);
		addedObjects = addedObjects.map(this.mapController, this);
		this.get('arrangedContent').replace(i, removedCount, addedObjects);
	},
	contentArrayWillChange: function (arr, i, removedCount, addedCount) {
		var arranged = this.get('arrangedContent');
		var removedObjects = arranged.slice(i, i + removedCount);
		removedObjects.invoke('destroy');
	},
	willDestroy: function () {
		this.get('arrangedContent').invoke('destroy');
		this._super();
	}
});

var Columns = ArrayProxy.extend(Sortable, {
	content: function (key, value) {
		return ControllerArray.create({
			itemController: Column,
			content: value
		});
	}.property(),
	willDestroy: function () {
		this.get('content').destroy();
		this._super();
	}
});

export default Columns;
