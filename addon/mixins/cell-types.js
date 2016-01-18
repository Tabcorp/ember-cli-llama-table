import Em from 'ember';
var get = Em.get;
var isBlank = Em.isBlank;

/**
 * Allows custom column cell type definitions.
 * @module mixins
 * @constructor
 * @class CellTypesMixin
 * @extends Ember.Mixin
 */
var CellTypesMixin = Em.Mixin.create({
	/**
	 * Lookup a column type and get the cell constructor.
	 * @method getCellType
	 * @param {String} name Column type name
	 * @return {Function} Cell constructor
	 */
	getCellType: function (name) {
		return this.getConfigCellType(name) || this.getDefaultCellType(name);
	},

	/**
	 * Lookup a column type in the table config and get the cell constructor.
	 * @method getConfigCellType
	 * @param {String} name Column type name
	 * @return {Function} Cell constructor
	 */
	getConfigCellType: function (name) {
		var types = this.get('config.types');
		if (isBlank(types)) {
			return null;
		}
		var type = types.findBy('name', name);
		if (isBlank(type)) {
			return null;
		}
		return get(type, 'view');
	},

	/**
	 * Lookup a built in column type and get the cell constructor.
	 * @method getDefaultCellType
	 * @param {String} name Column type name
	 * @return {Function} Cell constructor
	 */
	getDefaultCellType: function (name) {
		switch (name) {
			case 'number':
				return this.get('NumberCellView');
			default:
				return this.get('BodyCellView');
		}
	},
});

export default CellTypesMixin;
