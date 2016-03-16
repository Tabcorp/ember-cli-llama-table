import Em from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import ResizeColumns from 'llama-table/mixins/resize-columns';
import CellTypes from 'llama-table/mixins/cell-types';
import ViewConstructors from 'llama-table/mixins/view-constructors';
import FocusPosition from 'llama-table/mixins/focus-position';
import Columns from 'llama-table/controllers/columns';
import Rows from 'llama-table/controllers/rows';
import { defaultValue } from 'llama-table/computed';
var get = Em.get;
var observer = Em.observer;
var computed = Em.computed;
var alias = computed.alias;
var eq = computed.equal;
var collect = computed.collect;
var throttle = Em.run.throttle;

var SortedController = Em.ArrayProxy.extend(Em.SortableMixin);

var SCROLL_INTERVAL = 1000 / 60; // 60 fps
var SCROLL_IMMEDIATE = false; // invoke on trailing edge

/**
 * Llama Table Ember component.
 * See https://github.com/luxbet/ember-cli-llama-table.
 * @module components
 * @class LlamaTable
 * @constructor
 * @extends Ember.Component
 * @uses InboundActions
 * @uses ResizeColumnsMixin
 * @uses CellTypesMixin
 * @uses ViewConstructorsMixin
 * @uses FocusPositionMixin
 */
var LlamaTable = Em.Component.extend(InboundActions, ResizeColumns, CellTypes, ViewConstructors, FocusPosition, {
	classNames: ['llama-table-component'],
	classNameBindings: ['isSortable', 'isResizable', 'isEmpty', 'isLoading', 'hasSubcontent', 'showHeader', 'showFooter'],

	/**
	 * Current page that is been viewed when using pagination
	 * To use pagination, override this property along with rowsPerPage
	 * @property {Number} currentPage
	 */
	currentPage: 1,

	/**
	 * Number of rows to display per page when using pagination
	 * To use pagination, override this property along with currentPage
	 * Defaults to length of entire set of rows, which means one page with the entire rowset
	 * @property {Number} rowsPerPage
	 */
	rowsPerPage: computed('sortedRows.[]', function () {
		return this.get('sortedRows.length');
	}),

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
	config: computed(function () {
		return {};
	}),

	/**
	 * Column definitions array with added sorting functionality.
	 * @property {Ember.ArrayProxy} sortedColumns
	 */
	sortedColumns: computed(function () {
		return Columns.create({
			parentController: this,
			container: this.get('container'),
			sortProperties: ['order'],
			sortAscending: true,
			content: this.get('columns')
		});
	}),

	/**
	 * Row values array with added sorting functionality. Uses a custom
	 *   'RowsController' if table has subcontent. Does not construct this
	 *   custom controller if it is not necessary.
	 * @property {Ember.ArrayProxy} sortedRows
	 */
	sortedRows: computed(function () {
		var options = {
			parentController: this,
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
		var Controller = SortedController;
		if (this.get('hasSubcontent')) {
			Controller = Rows;
		}
		return Controller.create(options);
	}),

	/**
	 * The visible rows to be displayed based on the currently paginated page
	 * @property {Ember.ArrayProxy} visibleRows
	 */
	visibleRows: computed('visibleIndexStart', 'visibleIndexEnd', 'sortedRows.[]', function () {
		const start = this.get('visibleIndexStart');
		const end = this.get('visibleIndexEnd');

		return this.get('sortedRows').slice(start, end);
	}),

	/**
	 * The index in sortedRows of the first visible row on the current page
	 * @property {Number} visibleIndexStart
	 */
	visibleIndexStart: computed('currentPage', 'rowsPerPage', 'sortedRows.[]', function () {
		const currentPage = this.get('currentPage');
		const rowsPerPage = this.get('rowsPerPage');
		const maxStart = this.get('sortedRows.length');

		const zeroedPageIndex = currentPage - 1;
		const start = zeroedPageIndex * rowsPerPage;

		if (start > maxStart) {
			return maxStart;
		} else if (start < 0) {
			return 0;
		}

		return start;
	}),

	/**
	 * The index in sortedRows of the last visible row on the current page
	 * @property {Number} visibleIndexEnd
	 */
	visibleIndexEnd: computed('visibleIndexStart', 'sortedRows.[]', function () {
		const start = this.get('visibleIndexStart');
		const rowsPerPage = this.get('rowsPerPage');
		const maxEnd = this.get('sortedRows.length');

		const end = start + rowsPerPage;

		return end <= maxEnd ? end : maxEnd;
	}),

	/**
	 * Maximum height of table before introducing vertical scrollbars.
	 * @property {Number} maxHeight
	 */
	maxHeight: alias('config.maxHeight'),

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
	 * Table is empty when there are no rows
	 * @property {Boolean} isEmpty
	 */
	isEmpty: eq('rows.length', 0),

	/**
	 * Can show a loading state.
	 * @property {Boolean} isLoading
	 * @optional
	 * @default false
	 */
	isLoading: defaultValue('config.isLoading', false),

	/**
	 * Column names to sort table by.
	 * @property {String[]} sortProperties
	 */
	sortProperties: alias('config.sortProperties'),

	/**
	 * Triggers a row sort properties update. Observes the `sortProperties`
	 *   property.
	 * @method updateSortProperties
	 */
	updateSortProperties: observer('sortProperties', function () {
		this.set('sortedRows.sortProperties', this.get('sortProperties'));
	}),

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
	updateRowSortOrder: observer('sortAscending', function () {
		this.set('sortedRows.sortAscending', this.get('sortAscending'));
	}),

	/**
	 * Column definitions grouped into sets.
	 * @property {Object[][]} columngroups
	 */
	columngroups: collect('sortedColumns'),

	/**
	 * Allows row click actions to propagate.
	 * @property {Boolean} enableRowClick
	 * @optional
	 * @default false
	 */
	enableRowClick: defaultValue('config.enableRowClick', false),

	/**
	 * Rows can be expanded to show additional content.
	 * @property {Boolean} hasSubcontent
	 * @optional
	 * @default false
	 */
	hasSubcontent: defaultValue('config.hasSubcontent', false),

	/**
	 * Limit focus to editable cells only.
	 * @property {Boolean} onlyFocusEditable
	 * @optional
	 * @default false
	 */
	onlyFocusEditable: defaultValue('config.onlyFocusEditable', false),

	/**
	 * When the leftmost cell is focused and a `focusLeft` action is triggered,
	 *   focus the rightmost cell instead of firing an `outOfBounds` action,
	 *   and vice-versa.
	 * @property {Boolean} wrapFocusHorizontal
	 * @optional
	 * @default false
	 */
	wrapFocusHorizontal: defaultValue('config.wrapFocusHorizontal', false),

	/**
	 * When the topmost cell is focused and a `focusTop` action is triggered,
	 *   focus the bottommost cell instead of firing an `outOfBounds` action,
	 *   and vice-versa.
	 * @property {Boolean} wrapFocusVertical
	 * @optional
	 * @default false
	 */
	wrapFocusVertical: defaultValue('config.wrapFocusVertical', false),

	/**
	 * Text to display when the table is empty.
	 * @property {String} emptyText
	 * @optional
	 * @default "No records to display"
	 */
	emptyText: defaultValue('config.emptyText', 'No records to display'),

	/**
	 * Text to display when table data is loading.
	 * @property {String} loadingText
	 * @optional
	 * @default "Loading..."
	 */
	loadingText: defaultValue('config.loadingText', 'Loading\u2026'),

	/**
	 * Sync the horizontal scroll position of this table.
	 * @property {Number} scrollLeft
	 * @optional
	 * @default 0
	 */
	scrollLeft: defaultValue('config.scrollLeft', 0),

	/**
	 * Sync the vertical scroll position of this table.
	 * @property {Number} scrollTop
	 * @optional
	 * @default 0
	 */
	scrollTop: defaultValue('config.scrollTop', 0),

	/**
	 * Table view. Contains header and footer.
	 * @property {Ember.View} tableView
	 */
	tableView: computed(function () {
		var TableView = this.get('TableView');
		return this.createChildView(TableView, {
			columngroups: this.get('columngroups'),
			rows: this.get('sortedRows')
		});
	}),

	/**
	 * Header container view.
	 * @property {Ember.View} headerView
	 */
	headerView: alias('tableView.headerView'),

	/**
	 * Show headers at the bottom of the table, too.
	 * @property {Boolean} dualHeaders
	 * @optional
	 * @default false
	 */
	dualHeaders: defaultValue('config.dualHeaders', false),

	/**
	 * Show header above body. Always true.
	 * @property {Boolean} showHeader
	 */
	showHeader: true,

	/**
	 * Show footer below body.
	 * @property {Boolean} showFooter
	 * @optional
	 * @default false
	 */
	showFooter: defaultValue('config.showFooter', false),

	/**
	 * Controller to use for calculating footer values.
	 * @property {Ember.Object} footerController
	 * @optional
	 */
	footerController: alias('config.footerController'),

	/**
	 * Footer view.
	 * @property {Ember.View} footerView
	 */
	footerView: alias('tableView.footerView'),

	/**
	 * Body container view.
	 * @property {Ember.View} bodyView
	 */
	bodyView: alias('tableView.bodyView.contentView'),

	/**
	 * Columngroup views in body container.
	 * @property {Ember.View} bodyColumngroupViews
	 */
	bodyColumngroupViews: alias('bodyView.columngroupViews'),

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
		var tableView = this.get('tableView');
		this.appendChild(tableView);
		tableView.render.apply(tableView, arguments);
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
		if (index === -1) {
			row = get(row, 'model') || get(row, 'content');
			if (!Em.isBlank(row)) {
				index = rows.indexOf(row);
			}
		}
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

	/**
	 * Find the current scroll position of the table and synchronize with all
	 *   views watching this position.
	 * @method syncScroll
	 */
	syncScroll: function () {
		var table = this.get('tableView');
		var $table = Em.$(table.$());
		this.setProperties({
			scrollLeft: $table.scrollLeft(),
			scrollTop: $table.scrollTop()
		});
	},

	actions: {
		scrollX: function (pos) {
			this.set('scrollLeft', pos);
		},
		scrollY: function (pos) {
			this.set('scrollTop', pos);
		},
		syncScroll: function () {
			throttle(this, this.syncScroll, SCROLL_INTERVAL, SCROLL_IMMEDIATE);
		},
		sortBy: function (column) {
			var sortProperties = this.get('sortProperties');
			if (Em.isArray(sortProperties) && column === sortProperties[0]) {
				this.toggleProperty('sortAscending');
			}
			else {
				this.set('sortAscending', true);
			}
			this.set('sortProperties', [column]);
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
		},
		cellClick: function () {
			var args = Array.prototype.slice.call(arguments);
			args.unshift('cellClick');
			this.sendAction.apply(this, args);
		},
		rowClick: function () {
			var args = Array.prototype.slice.call(arguments);
			args.unshift('rowClick');
			this.sendAction.apply(this, args);
		}
	}
});

export default LlamaTable;
