import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('llama-body-columngroup', 'Integration | Component | llama body columngroup', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{llama-body-columngroup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#llama-body-columngroup}}
      template block text
    {{/llama-body-columngroup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
