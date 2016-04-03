import Em from 'ember';
import { defaultValue } from 'llama-table/computed';
var computed = Em.computed;
var alias = computed.alias;

/**
 * Manages column attributes. All properties are JSON-encodable so that column
 *   configuration and updates can be embedded or transferred between entities.
 * @module controllers
 * @constructor
 * @class ColumnController
 * @extends Ember.ObjectProxy
 */
var ColumnController = Em.ObjectProxy.extend({
	/**
	 * Column name. Should match with property name of record to display.
	 * @property {String} name
	 */
	name: alias('model.name'),

	/**
	 * Text label. Shows in column header.
	 * @property {String} label
	 */
	label: alias('model.label'),

	/**
	 * Override column ordering with this property.
	 * @property {Number} order
	 */
	order: alias('model.order'),

	/**
	 * Column type which provides extra column configuration.
	 * @property {String} type
	 */
	type: alias('model.type'),

	/**
	 * Classes to apply to each column. Can be an array of strings or a single
	 *   string separated by spaces.
	 * @property {String|String[]} classNames
	 * @optional
	 */
	classNames: alias('model.classNames'),

	/**
	 * Properties to observe. By default, will observe the property specified by
	 *   `name`.
	 * @property {String[]} observes
	 * @optional
	 */
	observes: alias('model.observes'),

	/**
	 * Current width of the column in pixels.
	 * @property {Number} width
	 * @optional
	 * @default 200
	 */
	width: defaultValue('model.width', 200),

	/**
	 * Minimum width to allow this column to be resized to.
	 * @property {Number} minWidth
	 * @optional
	 * @default 50
	 */
	minWidth: defaultValue('model.minWidth', 50),

	/**
	 * Maximum width to allow this column to be resized to.
	 * @property {Number} maxWidth
	 * @optional
	 */
	maxWidth: alias('model.maxWidth'),

	/**
	 * Column values can be sorted by clicking column header.
	 * @property {Boolean} isSortable
	 * @optional
	 * @default true
	 */
	isSortable: defaultValue('model.isSortable', true),

	/**
	 * Get's the key name to use for sorting
	 * @property {String}
	 */
	sortBy: computed('model.sortBy', 'name', function () {
		const sortBy = this.get('model.sortBy');

		if (Em.isEmpty(sortBy)) {
			return this.get('name');
		}

		return sortBy;
	}),

	/**
	 * Values in the column can be edited. NOT YET IMPLEMENTED.
	 * @property {Boolean} isEditable
	 * @optional
	 * @default false
	 */
	isEditable: defaultValue('model.isEditable', false),

	/**
	 * Column is hidden from view.
	 * @property {Boolean} isHidden
	 * @optional
	 * @default false
	 */
	isHidden: defaultValue('model.isHidden', false),

	/**
	 * Column can be resized via the drag handle.
	 * @property {Boolean} isResizable
	 * @optional
	 * @default true
	 */
	isResizable: defaultValue('model.isResizable', true),

	/**
	 * Cells will fire a `cellClick` event from the component when clicked.
	 * @property {Boolean} isClickable
	 * @optional
	 * @default false
	 */
	isClickable: defaultValue('model.isClickable', false),

	/**
	 * Show the label text in the column header.
	 * @property {Boolean} showLabel
	 * @optional
	 * @default true
	 */
	showLabel: defaultValue('model.showLabel', true),

	/**
	 * Adds a `text-*` class to the column to indicate alignment. Can be used to
	 *   right-align numeric values.
	 * @property {String} textAlign
	 * @optional
	 * @default "left"
	 */
	textAlign: computed('model.textAlign', 'type', {
		get: function () {
			var value = this.get('model.textAlign');
			if (!Em.isEmpty(value)) {
				return value;
			}
			if (this.get('type') === 'number') {
				return 'right';
			}
			return 'left';
		},
	}),

	/**
	 * Available to formatted cells. Optionally defines a mask or pattern for
	 *   displaying data (for example, numbers or dates).
	 * @property {String} format
	 * @optional
	 */
	format: alias('model.format'),
});

export default ColumnController;
