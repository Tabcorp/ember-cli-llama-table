import Em from 'ember';
var observer = Em.observer;
var computed = Em.computed;

/**
 * Responsible for observing and maintaining the position of the focused cell.
 * @module mixins
 * @constructor
 * @class FocusPositionMixin
 * @extends Ember.Mixin
 */
var FocusPositionMixin = Em.Mixin.create({
	focusRow: null,
	focusColumn: null,

	getRowIndex: function (row) {
		var sortedRows = this.get('sortedRows');
		var rowIndex = sortedRows.indexOf(row);
		return rowIndex;
	},

	getVisibleRowIndex: function (row) {
		var visibleRows = this.get('sortedRows').rejectBy('isHidden');
		var rowIndex = visibleRows.indexOf(row);
		return rowIndex;
	},

	getVisibleRowAtIndex: function (rowIndex, wrap) {
		var visibleRows = this.get('sortedRows').rejectBy('isHidden');
		var row;
		if (wrap && rowIndex < 0) {
			rowIndex += visibleRows.length;
		}
		row = visibleRows.objectAt(rowIndex);
		return row;
	},

	getVisibleColumnIndex: function (column) {
		var visibleColumns = this.get('sortedColumns').rejectBy('isHidden');
		var columnIndex = visibleColumns.indexOf(column);
		return columnIndex;
	},

	getVisibleColumnAtIndex: function (columnIndex, wrap) {
		var visibleColumns = this.get('sortedColumns').rejectBy('isHidden');
		var column;
		if (wrap && columnIndex < 0) {
			columnIndex += visibleColumns.length;
		}
		column = visibleColumns.objectAt(columnIndex);
		return column;
	},

	getCellFor: function (row, column) {
		var rowIndex = this.getRowIndex(row);
		var columngroupViews = this.get('bodyColumngroupViews');
		var cellView;
		columngroupViews.find(function (columngroupView) {
			var columnViews = columngroupView.get('columnViews');
			var columnView = columnViews.find(function (columnView) {
				return columnView.get('column') === column;
			});
			if (!columnView) return;
			var cellViews = columnView.get('cellViews');
			cellView = cellViews.objectAt(rowIndex);
			return cellView;
		});
		return cellView || null;
	},

	focusView: function (view) {
		var el = view.$();
		var $el = Em.$(el);
		$el.focus();
		this.send('syncScroll');
	},

	focusCell: function (row, column) {
		this.setProperties({
			focusRow: row,
			focusColumn: column
		});
	},

	focusCurrentCell: function () {
		var row = this.get('focusRow');
		var column = this.get('focusColumn');
		var cellView = this.getCellFor(row, column);
		if (!cellView) return;
		this.focusView(cellView);
	},

	actions: {
		focusCell: function (row, column) {
			this.focusCell(row, column);
		},
		focusCurrentCell: function () {
			this.focusCurrentCell();
		},
		focusLeft: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var wrapFocusHorizontal = this.get('wrapFocusHorizontal');
			var newColumn = this.getVisibleColumnAtIndex(columnIndex - 1, false);
			if (newColumn) {
				this.set('focusColumn', newColumn);
				this.focusCurrentCell();
			}
			else if (wrapFocusHorizontal) {
				this.send('focusHardRight');
				this.focusCurrentCell();
			}
			else {
				this.sendAction('outOfBounds', 'left', this);
			}
		},
		focusUp: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var wrapFocusVertical = this.get('wrapFocusVertical');
			var newRow = this.getVisibleRowAtIndex(rowIndex - 1, false);
			if (newRow) {
				this.set('focusRow', newRow);
				this.focusCurrentCell();
			}
			else if (wrapFocusVertical) {
				this.send('focusHardDown');
				this.focusCurrentCell();
			}
			else {
				this.sendAction('outOfBounds', 'up', this);
			}
		},
		focusRight: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var wrapFocusHorizontal = this.get('wrapFocusHorizontal');
			var newColumn = this.getVisibleColumnAtIndex(columnIndex + 1, false);
			if (newColumn) {
				this.set('focusColumn', newColumn);
				this.focusCurrentCell();
			}
			else if (wrapFocusHorizontal) {
				this.send('focusHardLeft');
				this.focusCurrentCell();
			}
			else {
				this.sendAction('outOfBounds', 'right', this);
			}
		},
		focusDown: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var wrapFocusVertical = this.get('wrapFocusVertical');
			var newRow = this.getVisibleRowAtIndex(rowIndex + 1, false);
			if (newRow) {
				this.set('focusRow', newRow);
				this.focusCurrentCell();
			}
			else if (wrapFocusVertical) {
				this.send('focusHardUp');
				this.focusCurrentCell();
			}
			else {
				this.sendAction('outOfBounds', 'down', this);
			}
		},
		focusHardLeft: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var newColumn = this.getVisibleColumnAtIndex(0, true);
			if (newColumn) {
				this.set('focusColumn', newColumn);
				this.focusCurrentCell();
			}
		},
		focusHardUp: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(0, true);
			if (newRow) {
				this.set('focusRow', newRow);
				this.focusCurrentCell();
			}
		},
		focusHardRight: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var newColumn = this.getVisibleColumnAtIndex(-1, true);
			if (newColumn) {
				this.set('focusColumn', newColumn);
				this.focusCurrentCell();
			}
		},
		focusHardDown: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(-1, true);
			if (newRow) {
				this.set('focusRow', newRow);
				this.focusCurrentCell();
			}
		}
	}
});

export default FocusPositionMixin;
