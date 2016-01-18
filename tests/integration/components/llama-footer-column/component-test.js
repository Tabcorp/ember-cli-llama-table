import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-footer-column', 'Integration | Component | llama footer column', {
	integration: true
});

test('it renders', function(assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{llama-footer-column}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#llama-footer-column}}
			template block text
		{{/llama-footer-column}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
