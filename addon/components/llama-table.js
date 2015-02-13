import Em from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import ResizeColumns from 'llama-table/mixins/resize-columns';
import CellTypes from 'llama-table/mixins/cell-types';
import ViewConstructors from 'llama-table/mixins/view-constructors';
import Columns from 'llama-table/controllers/columns';
import Rows from 'llama-table/controllers/rows';
import { defaultValue } from 'llama-table/computed';

/**
 * Llama Table Ember component.
 * See https://github.com/luxbet/ember-cli-llama-table.
 * @class LlamaTable
 * @constructor
 * @extends Ember.Component
 * @uses ResizeColumnsMixin
 */
var LlamaTable = Em.Component.extend(InboundActions, ResizeColumns, CellTypes, ViewConstructors, {
	classNames: 'llama-table-component',

	/**
	 * Column definitions array
	 * @property {Object[]} columns
	 * @public
	 * @see https://github.com/luxbet/ember-cli-llama-table/wiki/Column-definition
	 */
	columns: null,

	/**
	 * Row values array
	 * @property {Object[]} rows
	 * @public
	 */
	rows: null,

	/**
	 * Component configuration
	 * @property {Object} config
	 * @public
	 * @see https://github.com/luxbet/ember-cli-llama-table/wiki/Table-configuration
	 */
	config: null,

	/**
	 * Column definitions array with added sorting functionality.
	 * @property {Ember.ArrayProxy} sortedColumns
	 */
	sortedColumns: function () {
		return Columns.create({
			sortProperties: ['order'],
			sortAscending: true,
			content: this.get('columns')
		});
	}.property(),

	/**
	 * Row values array with added sorting functionality.
	 * @property {Ember.ArrayProxy} sortedRows
	 */
	sortedRows: function () {
		var options = {
			sortProperties: this.get('sortProperties'),
			sortAscending: this.get('sortAscending'),
			content: this.get('rows')
		};
		// if `sortFunction` is present it will be called
		// even if the value itself is falsy and not a function
		var sortFunction = this.get('config.sortFunction');
		if (typeof sortFunction === 'function') {
			options.sortFunction = sortFunction;
		}
		var orderBy = this.get('config.orderBy');
		if (typeof orderBy === 'function') {
			options.orderBy = orderBy;
		}
		return Rows.create(options);
	}.property(),

	/**
	 * Enables sorting columns by clicking headers.
	 * @property {Boolean} isSortable
	 * @optional
	 * @default true
	 */
	isSortable: defaultValue('config.isSortable', true),

	/**
	 * Enables resizing columns by dragging header boundaries.
	 * @property {Boolean} isResizable
	 * @optional
	 * @default true
	 */
	isResizable: defaultValue('config.isResizable', true),

	/**
	 * Column names to sort table by.
	 * @property {String[]} sortProperties
	 */
	sortProperties: Em.computed.alias('config.sortProperties'),

	/**
	 * Sort columns in ascending order.
	 * @property {Boolean} sortAscending
	 * @optional
	 * @default true
	 */
	sortAscending: defaultValue('config.sortAscending', true),

	/**
	 * Triggers a row sort order update. Observes the `sortAscending` property.
	 * @method updateRowSortOrder
	 */
	updateRowSortOrder: function () {
		this.set('sortedRows.sortAscending', this.get('sortAscending'));
	}.observes('sortAscending'),

	/**
	 * Column definitions grouped into sets.
	 * @property {Object[][]} columngroups
	 */
	columngroups: function () {
		var columns = this.get('sortedColumns');
		// single group for now
		return [columns];
	}.property('sortedColumns'),

	/**
	 * Allows row click actions to propagate.
	 * @property {Boolean} enableRowClick
	 * @optional
	 * @default true
	 */
	enableRowClick: defaultValue('config.enableRowClick', true),

	/**
	 * Destroy created objects.
	 * @method willDestroy
	 */
	willDestroy: function () {
		this.get('sortedColumns').destroy();
		this.get('sortedRows').destroy();
		this._super();
	},

	/**
	 * Returns the cell at a given row/column position.
	 * @method findCellAtPosition
	 * @param {Object} row Reference to row data
	 * @param {Object} col Reference to column definition
	 * @return {jQuery} Cell at row/column position
	 */
	findCellAtPosition: function (row, col) {
		var $columns = this.$('.llama-body-column');
		var $column = $columns.eq(col);
		var $cells = $column.find('.llama-body-cell');
		var $cell = $cells.eq(row);
		return $cell;
	},

	actions: {
		scrollX: function (pos) {
			this.$('.llama-header').css('marginLeft', -pos);
		},
		focusLeft: function (row, col) {
			var $cell = this.findCellAtPosition(row, col - 1);
			$cell.focus();
		},
		focusUp: function (row, col) {
			var $cell = this.findCellAtPosition(row - 1, col);
			$cell.focus();
		},
		focusRight: function (row, col) {
			var $cell = this.findCellAtPosition(row, col + 1);
			$cell.focus();
		},
		focusDown: function (row, col) {
			var $cell = this.findCellAtPosition(row + 1, col);
			$cell.focus();
		},
		sortBy: function (column) {
			var sortedRows = this.get('sortedRows');
			var sortProperties = sortedRows.get('sortProperties');
			if (Em.isArray(sortProperties) && column === sortProperties[0]) {
				this.toggleProperty('sortAscending');
			}
			else {
				this.set('sortAscending', true);
				sortedRows.set('sortProperties', [column]);
			}
		}
	}
});

export default LlamaTable;
