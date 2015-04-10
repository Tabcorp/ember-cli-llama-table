import Em from 'ember';
import EmptyView from 'llama-table/views/llama-empty';

var LoadingView = EmptyView.extend({
	classNames: ['llama-loading'],
	content: Em.computed.alias('controller.loadingText')
});

export default LoadingView;
