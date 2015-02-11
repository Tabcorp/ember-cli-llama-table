import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';
import CopyController from 'llama-table/controllers/copy';
import template from 'llama-table/templates/llama-body';

var LlamaBody = Em.View.extend(ScrollXYMixin, {
	template: template,
	classNames: 'llama-body',

	copyController: CopyController.create(),

	keyDown: function (e) {
		var controller = this.get('copyController');
		var isCopy = controller.isShortcutCopy(e);
		var isRange = controller.isSelectionRange();
		if (isCopy && !isRange) {
			controller.copy(e.target);
		}
	},

	actions: {
		scrollX: function (pos) {
			this.get('controller').send('scrollX', pos);
		},
		scrollY: function (pos) {
			this.get('controller').send('scrollY', pos);
		}
	}
});

export default LlamaBody;
