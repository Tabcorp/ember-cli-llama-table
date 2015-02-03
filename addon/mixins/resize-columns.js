import Em from 'ember';
import ResizeController from 'llama-table/controllers/resize-controller';
var get = Em.get;

var ResizeColumns = Em.Mixin.create({
	resizeColumnRef: null,
	resizeColumnWidth: null,

	resizeController: ResizeController.create(),

	updateResize: function () {
		var deltaX = this.get('resizeController.deltaX');
		var newWidth = Math.max(this.get('resizeColumnWidth') + deltaX, 10);
		this.set('resizeColumnRef.width', newWidth);
	}.observes('resizeController.deltaX'),

	actions: {
		startResize: function (e, column) {
			this.set('resizeColumnRef', column);
			this.set('resizeColumnWidth', get(column, 'width'));
			this.get('resizeController').send('startResize', e);
		}
	}
});

export default ResizeColumns;
