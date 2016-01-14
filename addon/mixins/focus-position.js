import Em from 'ember';
var observer = Em.observer;
var computed = Em.computed;
var deprecate = Em.deprecateFunc;

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
		var visibleRows = Em.A(this.get('sortedRows').rejectBy('isHidden'));
		var rowIndex = visibleRows.indexOf(row);
		return rowIndex;
	},

	getVisibleRowAtIndex: function (rowIndex, wrap) {
		var visibleRows = Em.A(this.get('sortedRows').rejectBy('isHidden'));
		var row;
		if (wrap && rowIndex < 0) {
			rowIndex += visibleRows.length;
		}
		row = visibleRows.objectAt(rowIndex);
		return row;
	},

	getVisibleColumnIndex: function (column) {
		var visibleColumns = Em.A(this.get('sortedColumns').rejectBy('isHidden'));
		var columnIndex = visibleColumns.indexOf(column);
		return columnIndex;
	},

	getVisibleColumnAtIndex: function (columnIndex, wrap) {
		var visibleColumns = Em.A(this.get('sortedColumns').rejectBy('isHidden'));
		var column;
		if (wrap && columnIndex < 0) {
			columnIndex += visibleColumns.length;
		}
		column = visibleColumns.objectAt(columnIndex);
		return column;
	},

	getCellFor: deprecate('No longer able to search for cells', function () {}),

	focusView: deprecate('Assign `focusRow` and `focusColumn` instead', function () {}),

	focusCell: function (row, column) {
		this.setProperties({
			focusRow: row,
			focusColumn: column
		});
	},

	focusCurrentCell: deprecate('Cells are now focused automatically', function () {}),

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
			}
			else if (wrapFocusHorizontal) {
				this.send('focusHardRight');
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
			}
			else if (wrapFocusVertical) {
				this.send('focusHardDown');
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
			}
			else if (wrapFocusHorizontal) {
				this.send('focusHardLeft');
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
			}
			else if (wrapFocusVertical) {
				this.send('focusHardUp');
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
			}
		},
		focusHardUp: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(0, true);
			if (newRow) {
				this.set('focusRow', newRow);
			}
		},
		focusHardRight: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var newColumn = this.getVisibleColumnAtIndex(-1, true);
			if (newColumn) {
				this.set('focusColumn', newColumn);
			}
		},
		focusHardDown: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(-1, true);
			if (newRow) {
				this.set('focusRow', newRow);
			}
		}
	}
});

export default FocusPositionMixin;
