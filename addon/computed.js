import Em from 'ember';
var computed = Em.computed;
var get = Em.get;
var set = Em.set;

export var defaultValue = function (watchKey, defaultValue) {
	return computed(watchKey, function (setKey, value) {
		// setter
		if (arguments.length > 1) {
			set(this, watchKey, value);
			return value;
		}
		// getter
		value = get(this, watchKey);
		return value === undefined ? defaultValue : value;
	});
};

export default {
	defaultValue: defaultValue
};
