import Em from 'ember';

var FocusPositionMixin = Em.Mixin.create({
	focusRow: Em.computed.oneWay('sortedRows.firstObject'),
	focusColumn: Em.computed.oneWay('sortedColumns.firstObject'),

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

	getVisibleRowAtIndex: function (rowIndex) {
		var visibleRows = this.get('sortedRows').rejectBy('isHidden');
		var row = visibleRows.objectAt(rowIndex);
		return row;
	},

	getVisibleColumnIndex: function (column) {
		var visibleColumns = this.get('sortedColumns').rejectBy('isHidden');
		var columnIndex = visibleColumns.indexOf(column);
		return columnIndex;
	},

	getVisibleColumnAtIndex: function (columnIndex) {
		var visibleColumns = this.get('sortedColumns').rejectBy('isHidden');
		var column = visibleColumns.objectAt(columnIndex);
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

	focusCell: function () {
		var row = this.get('focusRow');
		var column = this.get('focusColumn');
		var cellView = this.getCellFor(row, column);
		if (!cellView) return;
		var $cell = cellView.$();
		if (!$cell || $cell.length < 0) return;
		$cell.focus();
	}.observes('focusRow', 'focusColumn'),

	actions: {
		focusCell: function (row, column) {
			this.set('focusRow', row);
			this.set('focusColumn', column);
		},
		focusCurrentCell: function () {
			this.focusCell();
		},
		focusLeft: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var newColumn = this.getVisibleColumnAtIndex(columnIndex - 1);
			if (newColumn) {
				this.set('focusColumn', newColumn);
			}
			else {
				this.focusCell();
			}
		},
		focusUp: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(rowIndex - 1);
			if (newRow) {
				this.set('focusRow', newRow);
			}
			else {
				this.focusCell();
			}
		},
		focusRight: function () {
			var column = this.get('focusColumn');
			var columnIndex = this.getVisibleColumnIndex(column);
			var newColumn = this.getVisibleColumnAtIndex(columnIndex + 1);
			if (newColumn) {
				this.set('focusColumn', newColumn);
			}
			else {
				this.focusCell();
			}
		},
		focusDown: function () {
			var row = this.get('focusRow');
			var rowIndex = this.getVisibleRowIndex(row);
			var newRow = this.getVisibleRowAtIndex(rowIndex + 1);
			if (newRow) {
				this.set('focusRow', newRow);
			}
			else {
				this.focusCell();
			}
		}
	}
});

export default FocusPositionMixin;
