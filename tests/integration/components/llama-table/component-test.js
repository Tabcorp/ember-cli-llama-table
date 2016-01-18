import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-table', 'Integration | Component | llama table', {
	integration: true
});

test('it renders', function(assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{llama-table}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#llama-table}}
			template block text
		{{/llama-table}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
