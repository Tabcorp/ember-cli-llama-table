import Em from 'ember';
import EmptyView from 'llama-table/views/llama-empty';
var alias = Em.computed.alias;

var LoadingView = EmptyView.extend({
	classNames: ['llama-loading'],
	content: alias('controller.loadingText')
});

export default LoadingView;
