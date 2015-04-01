import Em from 'ember';
import RowController from 'llama-table/controllers/row';

var EpisodeController = RowController.extend({
	description_length: Em.computed.alias('description.length')
});

export default EpisodeController;
