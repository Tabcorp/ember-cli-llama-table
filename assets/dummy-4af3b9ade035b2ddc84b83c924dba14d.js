/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/controllers/index-footer', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var computed = Em['default'].computed;
  var alias = Em['default'].computed.alias;

  var IndexFooterController = Em['default'].ArrayController.extend({
    episode: alias("content.length"),
    million_viewers: computed("content.@each.million_viewers", function () {
      var vals = this.get("content").mapBy("million_viewers");
      var sum = vals.reduce(function (total, val) {
        return total + val;
      }, 0);
      return sum;
    })
  });

  exports['default'] = IndexFooterController;

});
define('dummy/controllers/index', ['exports', 'ember', 'dummy/views/remove-button-cell', 'dummy/controllers/index-footer'], function (exports, Em, RemoveButton, IndexFooterController) {

  'use strict';

  var set = Em['default'].set;
  var get = Em['default'].get;

  var IndexController = Em['default'].Controller.extend({
    tableColumns: [{
      name: "episode",
      label: "Episode",
      order: 1,
      type: "number",
      width: 50
    }, {
      name: "title",
      label: "Title",
      order: 2
    }, {
      name: "airdate",
      label: "Original airdate",
      order: 5
    }, {
      name: "description",
      label: "Description",
      order: 3,
      width: 400
    }, {
      name: "million_viewers",
      label: "Viewers (in millions)",
      order: 4,
      type: "number",
      format: "0.000"
    }, {
      name: "screenshot",
      label: "Screenshot URL",
      order: 6,
      isHidden: true
    }, {
      name: "remove",
      label: "Remove",
      order: 7,
      type: "remove",
      isSortable: false,
      minWidth: 100,
      maxWidth: 250
    }],
    tableData: [{
      screenshot: "http://i.imgur.com/r3WXxQ8.jpg",
      episode: 1,
      title: "Pilot",
      airdate: "December 2, 2013",
      million_viewers: 1.095,
      description: "Rick moves in with his daughter's family and establishes himself as a bad influence on his grandson, Morty."
    }, {
      screenshot: "http://i.imgur.com/aaBXAXz.jpg",
      episode: 2,
      title: "Lawnmower Dog",
      airdate: "December 9, 2013",
      million_viewers: 1.51,
      description: "Rick helps Jerry out with the dog, Snuffles. Don't even trip about this episode because they also incept the dreams of Mr. Goldenfold."
    }, {
      screenshot: "http://i.imgur.com/AzbEBCT.jpg",
      episode: 3,
      title: "Anatomy Park",
      airdate: "December 16, 2013",
      million_viewers: 1.302,
      description: "On this Christmas-themed episode, Jerry forces the family to bond during the holiday. Rick shrinks Morty in size to enter his creation, Anatomy Park."
    }, {
      screenshot: "http://i.imgur.com/9p2KVpx.jpg",
      episode: 4,
      title: "M. Night Shaym-Aliens!",
      airdate: "January 13, 2014",
      million_viewers: 1.476,
      description: "Rick, Morty, and Jerry find themselves trapped in a life-like simulation by an alien race of intergalactic scammers known as the Zigerions."
    }, {
      screenshot: "http://i.imgur.com/ARS7yUu.jpg",
      episode: 5,
      title: "Meeseeks and Destroy",
      airdate: "January 20, 2014",
      million_viewers: 1.61,
      description: "Morty makes a bet with Rick that he can lead a fun, successful adventure. Jerry, Beth, and Summer summon various helpers named Mr. Meeseeks to help solve their problems."
    }, {
      screenshot: "http://i.imgur.com/6F7a5us.jpg",
      episode: 6,
      title: "Rick Potion No. 9",
      airdate: "January 27, 2014",
      million_viewers: 1.746,
      description: "Morty asks Rick to brew him up a love potion to gain the affections of Jessica, but the potion fuses with an airborne flu virus and infects the worldwide population."
    }, {
      screenshot: "http://i.imgur.com/IsUlCuf.jpg",
      episode: 7,
      title: "Raising Gazorpazorp",
      airdate: "March 10, 2014",
      million_viewers: 1.762,
      description: "When Morty asks Rick to buy him a sex robot from a space pawn shop, it concieves his own half-alien son, leading Rick and Summer to investigate the robot's planet of origin."
    }, {
      screenshot: "http://i.imgur.com/g8tdmZG.jpg",
      episode: 8,
      title: "Rixty Minutes",
      airdate: "March 17, 2014",
      million_viewers: 1.477,
      description: "Rick installs a device within the family's TV set allowing them to watch shows from all possible realities, causing Jerry and Beth to contemplate their past decisions."
    }, {
      screenshot: "http://i.imgur.com/51EVhy3.jpg",
      episode: 9,
      title: "Something Ricked This Way Comes",
      airdate: "March 24, 2014",
      million_viewers: 1.543,
      description: "Summer gets a job at a strange shop selling eccentric, cursed items, Jerry commits himself to helping Morty on a science project."
    }, {
      screenshot: "http://i.imgur.com/p4SXVnQ.jpg",
      episode: 10,
      title: "Close Rick-counters of the Rick Kind",
      airdate: "April 7, 2014",
      million_viewers: 1.75,
      description: "Rick and Morty are imprisoned by a council of Rick's across alternate timelines for a crime they didn't commit, Jerry bonds with an alternate-reality Rick."
    }, {
      screenshot: "http://i.imgur.com/aFELDzg.jpg",
      episode: 11,
      title: "Ricksy Business",
      airdate: "April 14, 2014",
      million_viewers: 1.823,
      description: "Rick hosts a party while Beth and Jerry are away."
    }],
    config: {
      maxHeight: 300,
      sortProperties: ["episode"],
      enableRowClick: true,
      onlyFocusEditable: true,
      showFooter: true,
      footerController: IndexFooterController['default'],
      types: [{ name: "remove", view: "remove-button-cell", header: "remove-button-header" }]
    },
    events: Em['default'].A(),
    actions: {
      addColumn: function () {
        this.get("tableColumns").pushObject({
          name: "screenshot",
          label: "Screenshot URL",
          order: 0
        });
      },
      shuffleColumns: function () {
        var cols = this.get("tableColumns");
        var n = cols.length;
        var j, left, right, tmp;
        for (var i = n - 1; i >= 1; i--) {
          j = Math.floor(Math.random() * i);
          left = cols.objectAt(i);
          right = cols.objectAt(j);
          tmp = get(right, "order");
          set(right, "order", get(left, "order"));
          set(left, "order", tmp);
        }
      },
      updateData: function () {
        var data = this.get("tableData");
        data.forEach(function (record) {
          var value = 1 + Math.random() * 1;
          value = value.toFixed(3);
          value = Number(value);
          set(record, "million_viewers", value);
        });
      },
      removeRow: function (index) {
        this.get("tableData").removeAt(index);
      },
      removeAll: function () {
        this.get("tableData").clear();
      },
      toggleHidden: function () {
        var columnName = "screenshot";
        this.get("tableColumns").forEach(function (column) {
          if (get(column, "name") === columnName) {
            set(column, "isHidden", !get(column, "isHidden"));
          }
        });
      },
      toggleLoading: function () {
        this.toggleProperty("config.isLoading");
      },
      toggleFooter: function () {
        this.toggleProperty("config.showFooter");
      },
      toggleMaxHeight: function () {
        var currentHeight = this.get("config.maxHeight");
        var isInitial = currentHeight === "initial";
        this.set("config.maxHeight", isInitial ? 300 : "initial");
      },
      cellClick: function (row, column) {
        var rows = this.get("tableData");
        var index = rows.indexOf(row);
        if (Em['default'].isEmpty(index) || index < 0) {
          return;
        }
        var events = this.get("events");
        var data = this.get("tableData");
        var newEvent = {
          index: index,
          row: row,
          column: column
        };
        var targetLength = 5;
        var actualLength = events.get("length");
        var removeCount = Math.max(actualLength - targetLength, 0);
        events.replace(actualLength - removeCount, removeCount);
        events.unshiftObject(newEvent);
      }
    }
  });

  exports['default'] = IndexController;

});
define('dummy/controllers/multi', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var copy = Em['default'].copy;

  var cols = [{ name: "foo", label: "Foo" }, { name: "bar", label: "Bar" }, { name: "baz", label: "Baz" }, { name: "qux", label: "Qux" }];

  var data = [{ foo: "a0", bar: "b0", baz: "c0", qux: "d0" }, { foo: "a1", bar: "b1", baz: "c1", qux: "d1" }, { foo: "a2", bar: "b2", baz: "c2", qux: "d3" }, { foo: "a3", bar: "b3", baz: "c3", qux: "d3" }, { foo: "a4", bar: "b4", baz: "c4", qux: "d4" }, { foo: "a5", bar: "b5", baz: "c5", qux: "d5" }, { foo: "a6", bar: "b6", baz: "c6", qux: "d6" }, { foo: "a7", bar: "b7", baz: "c7", qux: "d7" }, { foo: "a8", bar: "b8", baz: "c8", qux: "d8" }, { foo: "a9", bar: "b9", baz: "c9", qux: "d9" }];

  var config = {
    maxHeight: 149
  };

  var MultiController = Em['default'].Controller.extend({
    colsA: copy(cols, true),
    colsB: copy(cols, true),
    colsC: cols,
    colsD: cols,
    rowsA: copy(data, true),
    rowsB: copy(data, true),
    rowsC: data,
    rowsD: data,
    configA: copy(config, true),
    configB: copy(config, true),
    configC: config,
    configD: config,
    tableMove: function (direction, table) {
      var up = direction === "up";
      var $table = table.$();
      var $focused = $(document.activeElement);
      var $column = $focused.parents(".llama-body-column").first();
      var columnIndex = $table.find(".llama-body-column").index($column);
      var $other = up ? $table.prevAll(".llama-table-component").first() : $table.nextAll(".llama-table-component").first();
      var $cells = $other.find(".llama-body-column").eq(columnIndex).find(".llama-body-cell");
      if (up) $cells.last().focus();else $cells.first().focus();
    },
    actions: {
      outOfBounds: function (direction, table) {
        switch (direction) {
          case "up":
          case "down":
            return this.tableMove(direction, table);
        }
      }
    }
  });

  exports['default'] = MultiController;

});
define('dummy/controllers/row-heights', ['exports', 'ember', 'llama-table/views/llama-body-cell'], function (exports, Em, LlamaBodyCell) {

  'use strict';

  var RowHeightsController = Em['default'].Controller.extend({
    tableColumns: [{ name: "height", label: "Row height (px)" }],

    tableData: [],

    numRows: 10,
    maxHeight: 400,

    init: function () {
      this._super();
      this.generateData();
    },

    generateData: function () {
      var rows = this.get("tableData");
      var count = this.get("numRows");
      var maxHeight = this.get("maxHeight");
      var data = [];
      // remove existing data
      rows.clear();
      // generate values
      for (var i = 0; i < count; i++) {
        data.push(Math.random());
      }
      // get sum of values
      var total = data.reduce(function (total, value) {
        return total + value;
      }, 0);
      // generate row data
      data = data.map(function (value) {
        return {
          height: Math.round(maxHeight * (value / total))
        };
      });
      // set row data
      rows.pushObjects(data);
    },

    actions: {
      regenerate: function () {
        this.generateData();
      }
    }
  });

  exports['default'] = RowHeightsController;

});
define('dummy/controllers/stress', ['exports', 'ember', 'dummy/views/remove-button-cell'], function (exports, Em, RemoveButton) {

  'use strict';

  var set = Em['default'].set;
  var get = Em['default'].get;

  var IndexController = Em['default'].Controller.extend({
    tableColumns: [{
      name: "a",
      label: "A",
      order: 1,
      type: "number",
      width: 80
    }, {
      name: "b",
      label: "B",
      order: 2,
      type: "number",
      width: 80
    }, {
      name: "c",
      label: "C",
      order: 3,
      type: "number",
      width: 80
    }, {
      name: "d",
      label: "D",
      order: 4,
      type: "number",
      width: 80
    }, {
      name: "e",
      label: "E",
      order: 5,
      type: "number",
      width: 80
    }],
    tableData: [],
    tableConfig: {
      maxHeight: 200,
      isSortable: false,
      isResizable: false,
      onlyFocusEditable: true
    },
    actions: {
      add: function (num) {
        var label = "Add %@ rows".fmt(num);
        console.profile("Adding rows");
        console.time(label);
        var data = [];
        for (var i = 0; i < num; i++) {
          data.push({
            a: Math.random(),
            b: Math.random(),
            c: Math.random(),
            d: Math.random(),
            e: Math.random()
          });
        }
        this.get("tableData").pushObjects(data);
        console.timeEnd(label);
        label = "Render %@ rows".fmt(num);
        console.time(label);
        Em['default'].run.next(function () {
          console.timeEnd(label);
        });
        console.profileEnd();
      },
      clear: function () {
        console.profile("Clearing rows");
        var len = this.get("tableData.length");
        var label = "Clear %@ rows".fmt(len);
        console.time(label);
        this.get("tableData").clear();
        console.timeEnd(label);
        console.profileEnd();
      }
    }
  });

  exports['default'] = IndexController;

});
define('dummy/controllers/subcontent', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var SubcontentController = Em['default'].Controller.extend({
    columns: [{ order: 0, name: "expando", label: "Expand subcontent", type: "expando", width: 50, isResizable: false, isSortable: false, showLabel: false }, { order: 1, name: "id", label: "Employee ID", isHidden: true }, { order: 2, name: "given_name", label: "Given Name" }, { order: 3, name: "family_name", label: "Family Name" }],
    config: {
      hasSubcontent: true,
      wrapFocusHorizontal: true,
      wrapFocusVertical: true,
      subcontentView: "embedded",
      sortProperties: ["family_name"],
      types: [{ name: "expando", view: "expando-cell" }]
    }
  });

  exports['default'] = SubcontentController;

});
define('dummy/controllers/switch', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var datasets = {
    dataset1: [{ col1: "dataset1 row1 col1", col2: "dataset1 row1 col2" }, { col1: "dataset1 row2 col1", col2: "dataset1 row2 col2" }],
    dataset2: [{ col1: "dataset2 row1 col1", col2: "dataset2 row1 col2" }, { col1: "dataset2 row2 col1", col2: "dataset2 row2 col2" }]
  };

  var columnsets = {
    columnset1: [{ name: "col1" }],
    columnset2: [{ name: "col2" }]
  };

  var SwitchController = Em['default'].Controller.extend({
    rows: Em['default'].ArrayProxy.create(),
    columns: Em['default'].ArrayProxy.create(),

    datasets: datasets,
    columnsets: columnsets,

    init: function () {
      this._super();
      this.send("switchDataset", "datasets.dataset1");
      this.send("switchColumnset", "columnsets.columnset1");
    },

    actions: {
      switchDataset: function (name) {
        this.set("rows.content", this.get(name));
      },
      switchColumnset: function (name) {
        this.set("columns.content", this.get(name));
      }
    }
  });

  exports['default'] = SwitchController;

});
define('dummy/initializers/component', ['exports', 'ember', 'llama-table/components/llama-table'], function (exports, Em, LlamaTable) {

  'use strict';

  var initializer = {
    name: "llama-table-component",
    initialize: function (container, app) {
      container.register("component:llama-table", LlamaTable['default']);
    }
  };

  exports['default'] = initializer;

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('dummy/initializers/row-controller', ['exports', 'ember', 'llama-table/controllers/row'], function (exports, Em, RowController) {

  'use strict';

  var initializer = {
    name: "llama-row",
    initialize: function (container, app) {
      container.register("controller:llama-row", RowController['default']);
    }
  };

  exports['default'] = initializer;

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("stress");
    this.route("multi");
    this.route("subcontent");
    this.route("switch");
    this.route("row-heights");
  });

  exports['default'] = Router;

});
define('dummy/routes/subcontent', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var SubcontentRoute = Em['default'].Route.extend({
    model: function () {
      return [{
        id: 0,
        given_name: "Bob",
        family_name: "Belcher"
      }, {
        id: 1,
        given_name: "Linda",
        family_name: "Belcher"
      }, {
        id: 2,
        given_name: "Tina",
        family_name: "Belcher"
      }, {
        id: 3,
        given_name: "Gene",
        family_name: "Belcher"
      }, {
        id: 4,
        given_name: "Louise",
        family_name: "Belcher"
      }, {
        id: 5,
        given_name: "Jimmy",
        family_name: "Pesto"
      }, {
        id: 6,
        given_name: "Jimmy Jr",
        family_name: "Pesto"
      }, {
        id: 7,
        given_name: "Andy",
        family_name: "Pesto"
      }, {
        id: 8,
        given_name: "Ollie",
        family_name: "Pesto"
      }];
    }
  });

  exports['default'] = SubcontentRoute;

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Stress test");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Multiple tables");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Subcontent");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Switch content");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child5 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Row heights");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Llama Table");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"href","https://github.com/luxbet/ember-cli-llama-table");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"style","position: absolute; top: 0; right: 0; border: 0;");
        dom.setAttribute(el2,"src","https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67");
        dom.setAttribute(el2,"alt","Fork me on GitHub");
        dom.setAttribute(el2,"data-canonical-src","https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","menu");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [4]);
        var morph0 = dom.createMorphAt(element0,1,1);
        var morph1 = dom.createMorphAt(element0,3,3);
        var morph2 = dom.createMorphAt(element0,5,5);
        var morph3 = dom.createMorphAt(element0,7,7);
        var morph4 = dom.createMorphAt(element0,9,9);
        var morph5 = dom.createMorphAt(element0,11,11);
        var morph6 = dom.createMorphAt(fragment,6,6,contextualElement);
        block(env, morph0, context, "link-to", ["index"], {}, child0, null);
        block(env, morph1, context, "link-to", ["stress"], {}, child1, null);
        block(env, morph2, context, "link-to", ["multi"], {}, child2, null);
        block(env, morph3, context, "link-to", ["subcontent"], {}, child3, null);
        block(env, morph4, context, "link-to", ["switch"], {}, child4, null);
        block(env, morph5, context, "link-to", ["row-heights"], {}, child5, null);
        content(env, morph6, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/button-cell', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element0,0,0);
          element(env, element0, context, "action", ["click"], {"target": "view"});
          content(env, morph0, context, "view.formatted");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "view.showButton")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/embedded', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "llama-table", [], {"rows": get(env, context, "view.tableData"), "columns": get(env, context, "view.tableColumns"), "config": get(env, context, "view.tableConfig")});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/expando-cell', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		▼\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		►\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, subexpr = hooks.subexpr, concat = hooks.concat, attribute = hooks.attribute, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element0,1,1);
        var attrMorph0 = dom.createAttrMorph(element0, 'class');
        attribute(env, attrMorph0, element0, "class", concat(env, ["expando-toggle ", subexpr(env, context, "if", [get(env, context, "view.isExpanded"), "is-expanded"], {})]));
        element(env, element0, context, "action", ["toggle"], {"target": "view"});
        block(env, morph0, context, "if", [get(env, context, "view.isExpanded")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Clicked row ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(": ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("Clicked on \"");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\"");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element0,1,1);
          var morph1 = dom.createMorphAt(element0,3,3);
          var morph2 = dom.createMorphAt(element0,6,6);
          content(env, morph0, context, "event.index");
          content(env, morph1, context, "event.row.title");
          content(env, morph2, context, "event.column.label");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Demo table");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This table demonstrates some of the basic functionality of Llama Table.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Actions");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add new column");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Shuffle columns");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Update data");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Toggle hidden column");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Toggle loading state");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Toggle footer");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Toggle max height");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Info");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://rickandmorty.wikia.com/wiki/Rick_and_Morty");
        dom.setAttribute(el2,"title","Rick and Morty Wiki");
        var el3 = dom.createTextNode("Table data source");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Events");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [8]);
        var element2 = dom.childAt(fragment, [10]);
        var element3 = dom.childAt(fragment, [12]);
        var element4 = dom.childAt(fragment, [14]);
        var element5 = dom.childAt(fragment, [16]);
        var element6 = dom.childAt(fragment, [18]);
        var element7 = dom.childAt(fragment, [20]);
        var morph0 = dom.createMorphAt(fragment,4,4,contextualElement);
        var morph1 = dom.createMorphAt(fragment,28,28,contextualElement);
        dom.insertBoundary(fragment, null);
        inline(env, morph0, context, "llama-table", [], {"rows": get(env, context, "tableData"), "columns": get(env, context, "tableColumns"), "config": get(env, context, "config"), "removeRow": "removeRow", "removeAll": "removeAll", "cellClick": "cellClick"});
        element(env, element1, context, "action", ["addColumn"], {});
        element(env, element2, context, "action", ["shuffleColumns"], {});
        element(env, element3, context, "action", ["updateData"], {});
        element(env, element4, context, "action", ["toggleHidden"], {});
        element(env, element5, context, "action", ["toggleLoading"], {});
        element(env, element6, context, "action", ["toggleFooter"], {});
        element(env, element7, context, "action", ["toggleMaxHeight"], {});
        block(env, morph1, context, "each", [get(env, context, "events")], {"keyword": "event"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/llama-body-cell', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "view.formatted");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/llama-empty', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "view.content");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/llama-header-cell', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","column-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          content(env, morph0, context, "view.title");
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","sort-indicator");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.3",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","resize-handle");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        var morph2 = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "if", [get(env, context, "view.showLabel")], {}, child0, null);
        block(env, morph1, context, "if", [get(env, context, "view.sortByThis")], {}, child1, null);
        block(env, morph2, context, "if", [get(env, context, "view.isResizable")], {}, child2, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/multi', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Unlinked");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("These tables are not linked in any way. They behave independently of eachother.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Table A");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Table B");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Linked");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("These tables share row, column and table configuration. They will mimic eachother's state.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Table C");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Table D");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,6,6,contextualElement);
        var morph1 = dom.createMorphAt(fragment,10,10,contextualElement);
        var morph2 = dom.createMorphAt(fragment,18,18,contextualElement);
        var morph3 = dom.createMorphAt(fragment,22,22,contextualElement);
        dom.insertBoundary(fragment, null);
        inline(env, morph0, context, "llama-table", [], {"rows": get(env, context, "rowsA"), "columns": get(env, context, "colsA"), "config": get(env, context, "configA"), "outOfBounds": "outOfBounds"});
        inline(env, morph1, context, "llama-table", [], {"rows": get(env, context, "rowsB"), "columns": get(env, context, "colsB"), "config": get(env, context, "configB"), "outOfBounds": "outOfBounds"});
        inline(env, morph2, context, "llama-table", [], {"rows": get(env, context, "rowsC"), "columns": get(env, context, "colsC"), "config": get(env, context, "configC"), "outOfBounds": "outOfBounds"});
        inline(env, morph3, context, "llama-table", [], {"rows": get(env, context, "rowsD"), "columns": get(env, context, "colsD"), "config": get(env, context, "configD"), "outOfBounds": "outOfBounds"});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/row-heights', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Row Heights");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"style","height: 450px");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Randomize row heights");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [6]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        inline(env, morph0, context, "llama-table", [], {"columns": get(env, context, "tableColumns"), "rows": get(env, context, "tableData")});
        element(env, element0, context, "action", ["regenerate"], {});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/stress', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Stress test");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This table tests the limits of Llama Table's rendering capabilities.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Actions");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Clear rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 10 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 50 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 100 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 250 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 500 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 1,000 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 5,000 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add 10,000 rows");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [8]);
        var element1 = dom.childAt(fragment, [10]);
        var element2 = dom.childAt(fragment, [12]);
        var element3 = dom.childAt(fragment, [14]);
        var element4 = dom.childAt(fragment, [16]);
        var element5 = dom.childAt(fragment, [18]);
        var element6 = dom.childAt(fragment, [20]);
        var element7 = dom.childAt(fragment, [22]);
        var element8 = dom.childAt(fragment, [24]);
        var morph0 = dom.createMorphAt(fragment,4,4,contextualElement);
        inline(env, morph0, context, "llama-table", [], {"rows": get(env, context, "tableData"), "columns": get(env, context, "tableColumns"), "config": get(env, context, "tableConfig")});
        element(env, element0, context, "action", ["clear"], {});
        element(env, element1, context, "action", ["add", 10], {});
        element(env, element2, context, "action", ["add", 50], {});
        element(env, element3, context, "action", ["add", 100], {});
        element(env, element4, context, "action", ["add", 250], {});
        element(env, element5, context, "action", ["add", 500], {});
        element(env, element6, context, "action", ["add", 1000], {});
        element(env, element7, context, "action", ["add", 5000], {});
        element(env, element8, context, "action", ["add", 10000], {});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/subcontent', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Subcontent");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        inline(env, morph0, context, "llama-table", [], {"columns": get(env, context, "columns"), "rows": get(env, context, "model"), "config": get(env, context, "config")});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/switch', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.3",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Switch content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Actions");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Use data set 1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Use data set 2");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Use column set 1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Use column set 2");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [6]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element0, [5]);
        var element4 = dom.childAt(element0, [7]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        inline(env, morph0, context, "llama-table", [], {"columns": get(env, context, "columns"), "rows": get(env, context, "rows")});
        element(env, element1, context, "action", ["switchDataset", "datasets.dataset1"], {});
        element(env, element2, context, "action", ["switchDataset", "datasets.dataset2"], {});
        element(env, element3, context, "action", ["switchColumnset", "columnsets.columnset1"], {});
        element(env, element4, context, "action", ["switchColumnset", "columnsets.columnset2"], {});
        return fragment;
      }
    };
  }()));

});
define('dummy/views/button-cell', ['exports', 'ember', 'llama-table/views/llama-body-cell'], function (exports, Em, LlamaBodyCell) {

  'use strict';

  var computed = Em['default'].computed;
  var gt = computed.gt;
  var not = computed.not;

  var ButtonCell = LlamaBodyCell['default'].extend({
    showButton: not("isFooter"),
    layoutName: "button-cell",
    actions: {
      click: function () {
        var controller = this.get("controller");
        var rows = controller.get("rows");
        var row = this.get("content");
        var index = rows.indexOf(row);
        controller.sendAction(this.get("actionName"), index);
      }
    }
  });

  exports['default'] = ButtonCell;

});
define('dummy/views/embedded', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  var EmbeddedView = Em['default'].View.extend({
    templateName: "embedded",
    tableColumns: [{
      name: "foo",
      label: "Foo",
      order: 1
    }, {
      name: "bar",
      label: "Bar",
      order: 2
    }],
    tableData: [{
      foo: "abc",
      bar: "def"
    }, {
      foo: "ghi",
      bar: "jkl"
    }],
    tableConfig: {
      maxHeight: 90
    },
    didInsertElement: function () {
      this._super();
      this.setSubcontentHeight();
    },
    setSubcontentHeight: function () {
      var $el = this.$();
      if ($el) {
        var height = $el.outerHeight();
        this.set("content.subcontentHeight", height + 20);
      }
    }
  });

  exports['default'] = EmbeddedView;

});
define('dummy/views/expando-cell', ['exports', 'ember', 'llama-table/views/llama-body-cell'], function (exports, Em, LlamaBodyCell) {

  'use strict';

  var ExpandoCell = LlamaBodyCell['default'].extend({
    templateName: "expando-cell",
    classNames: "no-padding",
    isExpanded: Em['default'].computed.alias("content.isExpanded"),
    actions: {
      primaryAction: function (e) {
        e.preventDefault();
        this.send("toggle");
      },
      toggle: function () {
        this.toggleProperty("isExpanded");
      }
    }
  });

  exports['default'] = ExpandoCell;

});
define('dummy/views/remove-button-cell', ['exports', 'dummy/views/button-cell'], function (exports, ButtonCell) {

  'use strict';

  var RemoveButtonCell = ButtonCell['default'].extend({
    formatted: "Remove",
    actionName: "removeRow"
  });

  exports['default'] = RemoveButtonCell;

});
define('dummy/views/remove-button-header', ['exports', 'llama-table/views/llama-header-cell'], function (exports, LlamaHeaderCell) {

  'use strict';

  var RemoveButtonHeader = LlamaHeaderCell['default'].extend({
    showButton: true,
    layoutName: "button-cell",
    formatted: "Remove all",
    actions: {
      click: function () {
        this.get("controller").sendAction("removeAll");
      }
    }
  });

  exports['default'] = RemoveButtonHeader;

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({});
}

/* jshint ignore:end */
