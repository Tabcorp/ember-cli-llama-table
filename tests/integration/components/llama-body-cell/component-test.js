import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-body-cell', 'Integration | Component | llama body cell', {
	integration: true,
});

test('it renders a cell', function (assert) {
	assert.expect(1);
	this.set('column', {
		name: 'foo',
	});
	this.set('row', {
		foo: 'bar',
	});
	this.render(hbs`{{llama-body-cell column=column row=row}}`);
	assert.equal(this.$().text().trim(), 'bar');
});
