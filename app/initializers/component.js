import Em from 'ember';
import LlamaTable from 'llama-table/components/llama-table';

var initializer = {
	name: 'llama-table-component',
	initialize: function (container, app) {
		container.register('component:llama-table', LlamaTable);
	}
};

export default initializer;
