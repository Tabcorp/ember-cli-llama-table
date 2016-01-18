import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-column', 'Integration | Component | llama column', {
	integration: true
});

test('it renders', function(assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{llama-column}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#llama-column}}
			template block text
		{{/llama-column}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
