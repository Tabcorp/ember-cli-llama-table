# ember-cli-llama-table

Easy Ember.js table component.

[![master branch build status](https://travis-ci.org/luxbet/ember-cli-llama-table.svg?branch=master)](https://travis-ci.org/luxbet/ember-cli-llama-table)

`ember-cli-llama-table` is an [Ember][ember] [component][component] for easily
rendering tables with advanced features and functionality.

## Example

**controllers/index.js**:

```js
import Ember from 'ember';
export default Ember.Controller.extend({
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
        sortProperties: ['foo', 'bar']
    }
});
```

**templates/index.hbs**:

```hbs
{{llama-table rows=tableData columns=tableColumns config=tableConfig}}
```

For an example implementation, see [the project page][example].

## Properties

**`columns`**:

Column configuration. Defines the appearance and behaviour of table columns.
Will be monitored for changes, causing the component to update accordingly.

[Wiki page on column definitions][columns].

**`rows`**:

Table data as an array of objects. Each object has properties which map with
column identifiers. Row additions, removals or edits will be reflected by the
table.

**`config`**

Table configuration. Specifies additional properties as a single object.

[Wiki page on table configuration][config].

## Installing

With [npm][npm]:

```sh
$ npm install --save ember-cli-llama-table
```

Or with [Ember CLI][cli]:

```sh
$ ember install:npm ember-cli-llama-table
```

## License

[MIT license](LICENSE.md).

[ember]: http://emberjs.com/
[component]: http://emberjs.com/api/classes/Ember.Component.html
[columns]: https://github.com/luxbet/ember-cli-llama-table/wiki/Column-definition
[config]: https://github.com/luxbet/ember-cli-llama-table/wiki/Table-configuration
[example]: http://luxbet.github.io/ember-cli-llama-table
[npm]: https://www.npmjs.com/
[cli]: http://www.ember-cli.com/
