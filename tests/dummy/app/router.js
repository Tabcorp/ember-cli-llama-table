import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route('stress');
	this.route('multi');
	this.route('subcontent');
	this.route('footer');
});

export default Router;
