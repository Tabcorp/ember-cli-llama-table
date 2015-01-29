import Em from 'ember';
import ScrollXYMixin from 'llama-table/mixins/scroll-xy';

var LlamaBody = Em.View.extend(ScrollXYMixin, {
	templateName: 'llama-body',
	classNames: 'llama-body',

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
