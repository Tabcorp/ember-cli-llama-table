import Em from 'ember';
var computed = Em.computed;
var get = Em.get;
var set = Em.set;
var isBlank = Em.isBlank;

export function defaultValue (watchKey, defaultValue) {
	return computed(watchKey, {
		set: function (setKey, value) {
			try {
				set(this, watchKey, value);
			}
			catch (e) {
				// swallow
			}
			return value;
		},
		get: function (value) {
			// getter
			value = get(this, watchKey);
			return isBlank(value) ? defaultValue : value;
		}
	});
}

export function join (watchKey, separator = ',') {
	return computed(watchKey, {
		get: function () {
			var value = Em.makeArray(this.get(watchKey));
			var strings = value.map(String);
			var result = strings.join(separator);
			return result;
		}
	});
}

export function makeArray (watchKey) {
	return computed(watchKey, {
		get: function () {
			return Em.A(this.get(watchKey));
		}
	});
}

export default {
	defaultValue: defaultValue,
	join: join,
	makeArray: makeArray
};
