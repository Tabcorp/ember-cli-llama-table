import Em from 'ember';

var EpisodeController = Em.ObjectController.extend({
	description_length: Em.computed.alias('description.length')
});

export default EpisodeController;
