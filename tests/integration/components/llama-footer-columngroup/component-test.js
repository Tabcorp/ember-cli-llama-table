import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-footer-columngroup', 'Integration | Component | llama footer columngroup', {
	integration: true
});

test('it renders', function(assert) {

	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{llama-footer-columngroup}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#llama-footer-columngroup}}
			template block text
		{{/llama-footer-columngroup}}
	`);

	assert.equal(this.$().text().trim(), 'template block text');
});
