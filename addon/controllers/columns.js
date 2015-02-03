import Em from 'ember';
import Column from './column';
var ArrayProxy = Em.ArrayProxy;
var Sortable = Em.SortableMixin;

var mapColumn = function (column) {
	return Column.create({
		content: column
	});
};

var Columns = ArrayProxy.extend(Sortable, {
	arrangedContent: function () {
		return this.get('content').map(mapColumn);
	}.property('content'),
	contentArrayDidChange: function (arr, i, removedCount, addedCount) {
		var addedObjects = arr.slice(i, i + addedCount);
		addedObjects = addedObjects.map(mapColumn);
		this.get('arrangedContent').replace(i, removedCount, addedObjects);
	}
});

export default Columns;
