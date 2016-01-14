import Em from 'ember';

var EmbeddedView = Em.Component.extend({
	layoutName: 'components/embedded-content',
	tableColumns: [
		{
			name: 'foo',
			label: 'Foo',
			order: 1
		},
		{
			name: 'bar',
			label: 'Bar',
			order: 2
		}
	],
	tableData: [
		{
			foo: 'abc',
			bar: 'def'
		},
		{
			foo: 'ghi',
			bar: 'jkl'
		}
	],
	tableConfig: {
		maxHeight: 90
	},
	didInsertElement: function () {
		this._super();
		this.setSubcontentHeight();
	},
	setSubcontentHeight: function () {
		var $el = this.$();
		if ($el) {
			var height = $el.outerHeight();
			this.set('content.subcontentHeight', height + 20);
		}
	}
});

export default EmbeddedView;
