import Em from 'ember';

var EmbeddedView = Em.View.extend({
	templateName: 'embedded',
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
		maxHeight: 91
	},
	setSubcontentHeight: function () {
		var $el = this.$();
		if ($el) {
			var height = $el.outerHeight();
			this.set('content.subcontentHeight', height + 20);
		}
	}.on('didInsertElement')
});

export default EmbeddedView;
