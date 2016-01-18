import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-body', 'Integration | Component | llama body', {
	integration: true
});

test('it renders', function(assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{llama-body}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#llama-body}}
			template block text
		{{/llama-body}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
