import Em from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import ResizeColumns from 'llama-table/mixins/resize-columns';
import CellTypes from 'llama-table/mixins/cell-types';
import ViewConstructors from 'llama-table/mixins/view-constructors';
import FocusPosition from 'llama-table/mixins/focus-position';
import Columns from 'llama-table/controllers/columns';
import Rows from 'llama-table/controllers/rows';
import { defaultValue } from 'llama-table/computed';

/**
 * Llama Table Ember component.
 * See https://github.com/luxbet/ember-cli-llama-table.
 * @class LlamaTable
 * @constructor
 * @extends Ember.Component
 * @uses InboundActions
 * @uses ResizeColumnsMixin
 * @uses CellTypesMixin
 * @uses ViewConstructorsMixin
 */
var LlamaTable = Em.Component.extend(InboundActions, ResizeColumns, CellTypes, ViewConstructors, FocusPosition, {
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
	 * @optional
	 * @see https://github.com/luxbet/ember-cli-llama-table/wiki/Table-configuration
	 */
	config: null,

	/**
	 * Column definitions array with added sorting functionality.
	 * @property {Ember.ArrayProxy} sortedColumns
	 */
	sortedColumns: function () {
		return Columns.create({
			parentController: this,
			container: this.get('container'),
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
			parentController: this,
			itemController: this.get('itemController'),
			container: this.get('container'),
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
	 * Fixed height of each row.
	 * @property {Number} rowHeight
	 * @optional
	 * @default 30
	 */
	rowHeight: defaultValue('config.rowHeight', 30),

	/**
	 * Maximum height of table before introducing vertical scrollbars.
	 * @property {Number} maxHeight
	 */
	maxHeight: Em.computed.alias('config.maxHeight'),

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
	columngroups: Em.computed.collect('sortedColumns'),

	/**
	 * Allows row click actions to propagate.
	 * @property {Boolean} enableRowClick
	 * @optional
	 * @default true
	 */
	enableRowClick: defaultValue('config.enableRowClick', false),

	/**
	 * Optional controller for each row. Can define computed properties.
	 * @property {String} itemController
	 * @optional
	 */
	itemController: Em.computed.alias('config.itemController'),

	/**
	 * Table view. Contains header and footer.
	 * @property {Ember.View} tableView
	 */
	tableView: function () {
		var TableView = this.get('TableView');
		return this.createChildView(TableView, {
			columngroups: this.get('columngroups'),
			rows: this.get('sortedRows')
		});
	}.property(),

	/**
	 * Header container view.
	 * @property {Ember.View} headerView
	 */
	headerView: Em.computed.alias('tableView.headerView'),

	/**
	 * Body container view.
	 * @property {Ember.View} bodyView
	 */
	bodyView: Em.computed.alias('tableView.bodyView'),

	/**
	 * Columngroup views in body container.
	 * @property {Ember.View} bodyColumngroupViews
	 */
	bodyColumngroupViews: Em.computed.alias('bodyView.columngroupViews'),

	/**
	 * Get an array of visible column views from all body columngroups.
	 * @method getBodyColumnViews
	 * @return {Ember.View[]} Array of column views
	 */
	getBodyColumnViews: function () {
		var columngroupViews = this.get('bodyColumngroupViews');
		var columns = Em.A();
		columngroupViews.forEach(function (view) {
			var columnViews = view.get('columnViews').filterBy('isVisible');
			columns.pushObjects(columnViews);
		});
		return columns;
	},

	/**
	 * Custom render function which appends table view to component element.
	 * @method render
	 */
	render: function () {
		this._super.apply(this, arguments);
		this.appendChild(this.get('tableView'));
	},

	/**
	 * Destroy created objects.
	 * @method willDestroy
	 */
	willDestroy: function () {
		this.get('sortedColumns').destroy();
		this.get('sortedRows').destroy();
		this.get('tableView').destroy();
		this._super();
	},

	/**
	 * Highlights the cells representing the given row.
	 * @method highlightRow
	 * @param {Object} row Row object to highlight
	 */
	highlightRow: function (row) {
		var rows = this.get('sortedRows.arrangedContent');
		var index = rows.indexOf(row);
		this.highlightRowIndex(index);
	},

	/**
	 * Highlights the cells at the given 0-based row index.
	 * @method highlightRowIndex
	 * @param {Number} index Row index to highlight (0-based)
	 */
	highlightRowIndex: function (index) {
		var bodyColumngroupViews = this.get('bodyColumngroupViews');
		bodyColumngroupViews.forEach(function (columngroupView) {
			var columnViews = columngroupView.get('columnViews');
			columnViews.forEach(function (columnView) {
				var cellViews = columnView.get('cellViews');
				var toHover = cellViews.objectAt(index);
				cellViews.setEach('hover', false);
				if (toHover) {
					toHover.set('hover', true);
				}
			});
		});
	},

	/**
	 * Remove highlighting from all rows.
	 * @method stopHighlightingRows
	 */
	stopHighlightingRows: function () {
		this.highlightRowIndex(-1);
	},

	actions: {
		scrollX: function (pos) {
			this.get('headerView').$().css('marginLeft', -pos);
		},
		scrollY: function () {
			// no-op
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
		},
		stopHighlightingRows: function () {
			this.stopHighlightingRows();
		},
		highlightRow: function (row) {
			this.highlightRow(row);
		},
		tabKey: function () {
			this.send('focusRight');
		},
		reverseTabKey: function () {
			this.send('focusLeft');
		},
		enterKey: function () {
			this.send('focusDown');
		},
		reverseEnterKey: function () {
			this.send('focusUp');
		}
	}
});

export default LlamaTable;
