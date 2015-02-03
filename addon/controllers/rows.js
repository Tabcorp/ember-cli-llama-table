import Em from 'ember';
var ArrayProxy = Em.ArrayProxy;
var Sortable = Em.SortableMixin;

var Rows = ArrayProxy.extend(Sortable, {

});

export default Rows;
