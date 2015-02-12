import Em from 'ember';
import ResizeController from 'llama-table/controllers/resize-controller';
var get = Em.get;
var set = Em.set;
var isEmpty = Em.isEmpty;

var ResizeColumns = Em.Mixin.create({
	resizeColumn: null,
	resizeBeginWidth: null,

	resizeController: function () {
		return ResizeController.create();
	}.property(),

	willDestroy: function () {
		this.get('resizeController').destroy();
		this._super();
	},

	updateResize: function () {
		var beginWidth = this.get('resizeBeginWidth');
		var column = this.get('resizeColumn');
		var maxWidth = get(column, 'maxWidth');
		var minWidth = get(column, 'minWidth');
		var deltaX = this.get('resizeController.deltaX');
		var newWidth = beginWidth + deltaX;
		if (!isEmpty(minWidth)) {
			newWidth = Math.max(newWidth, minWidth);
		}
		if (!isEmpty(maxWidth)) {
			newWidth = Math.min(newWidth, maxWidth);
		}
		set(column, 'width', newWidth);
	}.observes('resizeController.deltaX'),

	actions: {
		startResize: function (e, column) {
			this.set('resizeColumn', column);
			this.set('resizeBeginWidth', get(column, 'width'));
			this.get('resizeController').send('startResize', e);
		}
	}
});

export default ResizeColumns;
