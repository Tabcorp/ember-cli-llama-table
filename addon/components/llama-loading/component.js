import Em from 'ember';
import EmptyView from 'llama-table/components/llama-empty/component';
var alias = Em.computed.alias;

var LoadingView = EmptyView.extend({
	classNames: ['llama-loading'],
	content: alias('root.loadingText')
});

export default LoadingView;
