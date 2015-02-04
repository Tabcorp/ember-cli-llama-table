define("dummy/app",["ember","ember/resolver","ember/load-initializers","dummy/config/environment","exports"],function(e,t,s,n,a){"use strict";var o=e["default"],l=t["default"],r=s["default"],i=n["default"];o.MODEL_FACTORY_INJECTIONS=!0;var u=o.Application.extend({modulePrefix:i.modulePrefix,podModulePrefix:i.podModulePrefix,Resolver:l});r(u,i.modulePrefix),a["default"]=u}),define("dummy/components/llama-table",["ember","dummy/views/llama-body-cell","dummy/views/llama-number-cell","llama-table/mixins/resize-columns","llama-table/controllers/columns","llama-table/controllers/rows","exports"],function(e,t,s,n,a,o,l){"use strict";var r=e["default"],i=t["default"],u=s["default"],c=n["default"],h=a["default"],m=o["default"],d=r.get,f=r.Component.extend(c,{classNames:"llama-table-component",columns:null,sortedColumns:function(){return h.create({sortProperties:["order"],sortAscending:!0,content:this.get("columns")})}.property(),rows:null,sortedRows:function(){return m.create({sortProperties:this.get("sortProperties"),sortAscending:this.get("sortAscending"),content:this.get("rows")})}.property(),sortProperties:function(){var e=this.get("config.sortProperties");return r.isArray(e)?e:[]}.property("config.sortProperties"),sortAscending:r.computed.alias("config.sortAscending"),columngroups:function(){var e=this.get("sortedColumns");return[e]}.property("sortedColumns"),findCellAtPosition:function(e,t){var s=this.$(".llama-body-column"),n=s.eq(t),a=n.find(".llama-body-cell"),o=a.eq(e);return o},config:null,getCellType:function(e){return this.getConfigCellType(e)||this.getDefaultCellType(e)},getConfigCellType:function(e){var t=this.get("config.types");if(r.isBlank(t))return null;var s=t.findBy("name",e);return r.isBlank(s)?null:d(s,"view")},getDefaultCellType:function(e){switch(e){case"number":return u;default:return i}},actions:{scrollX:function(e){this.$(".llama-header").css("marginLeft",-e)},focusLeft:function(e,t){var s=this.findCellAtPosition(e,t-1);s.focus()},focusUp:function(e,t){var s=this.findCellAtPosition(e-1,t);s.focus()},focusRight:function(e,t){var s=this.findCellAtPosition(e,t+1);s.focus()},focusDown:function(e,t){var s=this.findCellAtPosition(e+1,t);s.focus()},sortBy:function(e){var t=this.get("sortedRows"),s=t.get("sortProperties");t.setProperties(e===s[0]?{sortAscending:!t.get("sortAscending")}:{sortProperties:[e],sortAscending:!0})}}});l["default"]=f}),define("dummy/controllers/index",["ember","dummy/views/remove-button-cell","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.set,l=n.get,r=n.Controller.extend({tableColumns:[{name:"episode",label:"Episode",order:1,type:"number",width:50},{name:"title",label:"Title",order:2},{name:"airdate",label:"Original airdate",order:5},{name:"description",label:"Description",order:3,width:400},{name:"million_viewers",label:"Viewers (in millions)",order:4,type:"number",isClickable:!0},{name:"screenshot",label:"Screenshot URL",order:7,isHidden:!0},{name:"remove",label:"Remove",order:8,type:"remove",isSortable:!1,minWidth:100,maxWidth:250}],tableData:[{screenshot:"http://i.imgur.com/r3WXxQ8.jpg",episode:1,title:"Pilot",airdate:"December 2, 2013",million_viewers:1.095,description:"Rick moves in with his daughter's family and establishes himself as a bad influence on his grandson, Morty."},{screenshot:"http://i.imgur.com/aaBXAXz.jpg",episode:2,title:"Lawnmower Dog",airdate:"December 9, 2013",million_viewers:1.51,description:"Rick helps Jerry out with the dog, Snuffles. Don't even trip about this episode because they also incept the dreams of Mr. Goldenfold."},{screenshot:"http://i.imgur.com/AzbEBCT.jpg",episode:3,title:"Anatomy Park",airdate:"December 16, 2013",million_viewers:1.302,description:"On this Christmas-themed episode, Jerry forces the family to bond during the holiday. Rick shrinks Morty in size to enter his creation, Anatomy Park."},{screenshot:"http://i.imgur.com/9p2KVpx.jpg",episode:4,title:"M. Night Shaym-Aliens!",airdate:"January 13, 2014",million_viewers:1.476,description:"Rick, Morty, and Jerry find themselves trapped in a life-like simulation by an alien race of intergalactic scammers known as the Zigerions."},{screenshot:"http://i.imgur.com/ARS7yUu.jpg",episode:5,title:"Meeseeks and Destroy",airdate:"January 20, 2014",million_viewers:1.61,description:"Morty makes a bet with Rick that he can lead a fun, successful adventure. Jerry, Beth, and Summer summon various helpers named Mr. Meeseeks to help solve their problems."},{screenshot:"http://i.imgur.com/6F7a5us.jpg",episode:6,title:"Rick Potion No. 9",airdate:"January 27, 2014",million_viewers:1.746,description:"Morty asks Rick to brew him up a love potion to gain the affections of Jessica, but the potion fuses with an airborne flu virus and infects the worldwide population."},{screenshot:"http://i.imgur.com/IsUlCuf.jpg",episode:7,title:"Raising Gazorpazorp",airdate:"March 10, 2014",million_viewers:1.762,description:"When Morty asks Rick to buy him a sex robot from a space pawn shop, it concieves his own half-alien son, leading Rick and Summer to investigate the robot's planet of origin."},{screenshot:"http://i.imgur.com/g8tdmZG.jpg",episode:8,title:"Rixty Minutes",airdate:"March 17, 2014",million_viewers:1.477,description:"Rick installs a device within the family's TV set allowing them to watch shows from all possible realities, causing Jerry and Beth to contemplate their past decisions."},{screenshot:"http://i.imgur.com/51EVhy3.jpg",episode:9,title:"Something Ricked This Way Comes",airdate:"March 24, 2014",million_viewers:1.543,description:"Summer gets a job at a strange shop selling eccentric, cursed items, Jerry commits himself to helping Morty on a science project."},{screenshot:"http://i.imgur.com/p4SXVnQ.jpg",episode:10,title:"Close Rick-counters of the Rick Kind",airdate:"April 7, 2014",million_viewers:1.75,description:"Rick and Morty are imprisoned by a council of Rick's across alternate timelines for a crime they didn't commit, Jerry bonds with an alternate-reality Rick."},{screenshot:"http://i.imgur.com/aFELDzg.jpg",episode:11,title:"Ricksy Business",airdate:"April 14, 2014",million_viewers:1.823,description:"Rick hosts a party while Beth and Jerry are away."}],config:{sortProperties:["episode"],sortAscending:!0,types:[{name:"remove",view:a}]},clickEvents:n.A(),actions:{addColumn:function(){this.get("tableColumns").pushObject({name:"screenshot",label:"Screenshot URL",order:0})},shuffleColumns:function(){for(var e,t,s,n,a=this.get("tableColumns"),r=a.length,i=r-1;i>=1;i--)e=Math.floor(Math.random()*i),t=a.objectAt(i),s=a.objectAt(e),n=l(s,"order"),o(s,"order",l(t,"order")),o(t,"order",n)},updateData:function(){var e=this.get("tableData");e.forEach(function(e){var t=1+1*Math.random();t=t.toFixed(3),t=Number(t),o(e,"million_viewers",t)})},removeRow:function(e){this.get("tableData").removeAt(e)},toggleHidden:function(){var e="screenshot";this.get("tableColumns").forEach(function(t){l(t,"name")===e&&o(t,"isHidden",!l(t,"isHidden"))})},cellClick:function(e,t){this.get("clickEvents").pushObject({row:l(e,"million_viewers"),clicked:l(t,"name")})}}});s["default"]=r}),define("dummy/controllers/stress",["ember","dummy/views/remove-button-cell","exports"],function(e,t,s){"use strict";var n=e["default"],a=(t["default"],n.set,n.get,n.Controller.extend({tableColumns:[{name:"a",label:"A",order:1,type:"number",width:80},{name:"b",label:"B",order:2,type:"number",width:80},{name:"c",label:"C",order:3,type:"number",width:80},{name:"d",label:"D",order:4,type:"number",width:80},{name:"e",label:"E",order:5,type:"number",width:80}],tableData:[],actions:{add:function(e){var t="Add %@ rows".fmt(e);console.time(t);for(var s=0;e>s;s++)this.get("tableData").pushObject({a:Math.random(),b:Math.random(),c:Math.random(),d:Math.random(),e:Math.random()});console.timeEnd(t),t="Render %@ rows".fmt(e),console.time(t),n.run.next(function(){console.timeEnd(t)})},clear:function(){var e=this.get("tableData.length"),t="Clear %@ rows".fmt(e);console.time(t),this.get("tableData").clear(),console.timeEnd(t)}}}));s["default"]=a}),define("dummy/initializers/export-application-global",["ember","dummy/config/environment","exports"],function(e,t,s){"use strict";function n(e,t){var s=a.String.classify(o.modulePrefix);o.exportApplicationGlobal&&(window[s]=t)}var a=e["default"],o=t["default"];s.initialize=n,s["default"]={name:"export-application-global",initialize:n}}),define("dummy/router",["ember","dummy/config/environment","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.Router.extend({location:a.locationType});o.map(function(){this.route("stress")}),s["default"]=o}),define("dummy/templates/application",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){t.buffer.push("Home")}function r(e,t){t.buffer.push("Stress test")}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,u,c,h="",m=this,d=n.helperMissing;return o.buffer.push('<h2 id="title">Llama Table</h2>\n\n<a href="https://github.com/luxbet/ember-cli-llama-table">\n	<img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">\n</a>\n\n<nav class="menu">\n	'),u=n["link-to"]||t&&t["link-to"],c={hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,l,o),contexts:[t],types:["STRING"],data:o},i=u?u.call(t,"index",c):d.call(t,"link-to","index",c),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n	"),u=n["link-to"]||t&&t["link-to"],c={hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(3,r,o),contexts:[t],types:["STRING"],data:o},i=u?u.call(t,"stress",c):d.call(t,"link-to","stress",c),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n</nav>\n\n"),i=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n"),h})}),define("dummy/templates/button-cell",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l,r="",i=this.escapeExpression;return o.buffer.push("<button "),o.buffer.push(i(n.action.call(t,"click",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">"),l=n._triageMustache.call(t,"view.buttonText",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("</button>\n"),r})}),define("dummy/templates/components/llama-table",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l="",r=this.escapeExpression;return o.buffer.push('<div class="llama-table">\n	'),o.buffer.push(r(n.view.call(t,"llama-header",{hash:{columns:"view.columns"},hashTypes:{columns:"ID"},hashContexts:{columns:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push("\n	"),o.buffer.push(r(n.view.call(t,"llama-body",{hash:{columns:"view.columns",rows:"view.rows"},hashTypes:{columns:"ID",rows:"ID"},hashContexts:{columns:t,rows:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push("\n</div>\n"),l})}),define("dummy/templates/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){var s,a="";return t.buffer.push("\n\n	<p>\n		Clicked : "),s=n._triageMustache.call(e,"clickEvent.row",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push(" "),s=n._triageMustache.call(e,"clickEvent.clicked",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n	</p>\n\n"),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i,u,c="",h=n.helperMissing,m=this.escapeExpression,d=this;return o.buffer.push("<h3>Demo table</h3>\n\n<p>This table demonstrates some of the basic functionality of Llama Table.</p>\n\n"),o.buffer.push(m((i=n["llama-table"]||t&&t["llama-table"],u={hash:{rows:"tableData",columns:"tableColumns",config:"config",removeRow:"removeRow",cellClick:"cellClick"},hashTypes:{rows:"ID",columns:"ID",config:"ID",removeRow:"STRING",cellClick:"STRING"},hashContexts:{rows:t,columns:t,config:t,removeRow:t,cellClick:t},contexts:[],types:[],data:o},i?i.call(t,u):h.call(t,"llama-table",u)))),o.buffer.push("\n\n<h4>Actions</h4>\n\n<button "),o.buffer.push(m(n.action.call(t,"addColumn",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Add new column</button>\n<button "),o.buffer.push(m(n.action.call(t,"shuffleColumns",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Shuffle columns</button>\n<button "),o.buffer.push(m(n.action.call(t,"updateData",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Update data</button>\n<button "),o.buffer.push(m(n.action.call(t,"toggleHidden",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push('>Toggle hidden column</button>\n\n<h4>Info</h4>\n\n<p>\n	<a href="http://rickandmorty.wikia.com/wiki/Rick_and_Morty" title="Rick and Morty Wiki">Table data source</a>\n</p>\n\n\n<h4>Events</h4>\n\n'),r=n.each.call(t,"clickEvent","in","clickEvents",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(1,l,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push("\n"),c})}),define("dummy/templates/llama-body-cell",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l,r="";return l=n._triageMustache.call(t,"view.value",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n"),r})}),define("dummy/templates/llama-body-columngroup",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){var s;s=n.unless.call(e,"column.isHidden",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(2,r,t),contexts:[e],types:["ID"],data:t}),t.buffer.push(s||0===s?s:"")}function r(e,t){t.buffer.push(c(n.view.call(e,"llama-body-column",{hash:{column:"column"},hashTypes:{column:"ID"},hashContexts:{column:e},contexts:[e],types:["STRING"],data:t})))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,u="",c=this.escapeExpression,h=this;return i=n.each.call(t,"column","in","view.columns",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(1,l,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n"),u})}),define("dummy/templates/llama-body",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){t.buffer.push(u(n.view.call(e,"llama-body-columngroup",{hash:{columns:"columns"},hashTypes:{columns:"ID"},hashContexts:{columns:e},contexts:[e],types:["STRING"],data:t})))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i="",u=this.escapeExpression,c=this;return r=n.each.call(t,"columns","in","columngroups",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,l,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push("\n"),i})}),define("dummy/templates/llama-header-cell",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){t.buffer.push('<span class="sort-indicator"></span>')}function r(e,t){t.buffer.push('<span class="resize-handle"></span>')}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,u="",c=this;return o.buffer.push('<span class="column-label">'),i=n._triageMustache.call(t,"column.label",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("</span>\n"),i=n["if"].call(t,"view.sortByThis",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,l,o),contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n"),i=n["if"].call(t,"view.isResizable",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(3,r,o),contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n"),u})}),define("dummy/templates/llama-header-columngroup",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){var s;s=n.unless.call(e,"column.isHidden",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(2,r,t),contexts:[e],types:["ID"],data:t}),t.buffer.push(s||0===s?s:"")}function r(e,t){t.buffer.push(c(n.view.call(e,"llama-header-column",{hash:{column:"column"},hashTypes:{column:"ID"},hashContexts:{column:e},contexts:[e],types:["STRING"],data:t})))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var i,u="",c=this.escapeExpression,h=this;return i=n.each.call(t,"column","in","view.columns",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(1,l,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("\n"),u})}),define("dummy/templates/llama-header",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){function l(e,t){t.buffer.push(u(n.view.call(e,"llama-header-columngroup",{hash:{columns:"columns"},hashTypes:{columns:"ID"},hashContexts:{columns:e},contexts:[e],types:["STRING"],data:t})))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var r,i="",u=this.escapeExpression,c=this;return r=n.each.call(t,"columns","in","columngroups",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,l,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(r||0===r)&&o.buffer.push(r),o.buffer.push("\n"),i})}),define("dummy/templates/stress",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),o=o||{};var l,r,i="",u=n.helperMissing,c=this.escapeExpression;return o.buffer.push("<h3>Stress test</h3>\n\n<p>This table tests the limits of Llama Table's rendering capabilities.</p>\n\n"),o.buffer.push(c((l=n["llama-table"]||t&&t["llama-table"],r={hash:{rows:"tableData",columns:"tableColumns",config:"config"},hashTypes:{rows:"ID",columns:"ID",config:"ID"},hashContexts:{rows:t,columns:t,config:t},contexts:[],types:[],data:o},l?l.call(t,r):u.call(t,"llama-table",r)))),o.buffer.push("\n\n<h4>Actions</h4>\n\n<button "),o.buffer.push(c(n.action.call(t,"clear",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Clear rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",10,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 10 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",50,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 50 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",100,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 100 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",250,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 250 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",500,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 500 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",1e3,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 1,000 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",5e3,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 5,000 rows</button>\n<button "),o.buffer.push(c(n.action.call(t,"add",1e4,{hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","INTEGER"],data:o}))),o.buffer.push(">Add 10,000 rows</button>\n"),i})}),define("dummy/views/button-cell",["dummy/views/llama-body-cell","exports"],function(e,t){"use strict";var s=e["default"],n=s.extend({layoutName:"button-cell",actions:{click:function(){var e=this.get("controller"),t=e.get("rows"),s=this.get("content"),n=t.indexOf(s);e.sendAction(this.get("actionName"),n)}}});t["default"]=n}),define("dummy/views/llama-body-cell",["ember","dummy/views/llama-cell","llama-table/mixins/arrow-keys","exports"],function(e,t,s,n){"use strict";var a=e["default"],o=t["default"],l=s["default"],r=a.get,i=a.addObserver,u=a.removeObserver,c=o.extend(l,{templateName:"llama-body-cell",classNames:"llama-body-cell",attributeBindings:["tabindex"],tabindex:0,column:null,row:null,observedFields:function(){var e=this.get("column.observes");if(!a.isEmpty(e))return e;var t=this.get("column.name");return t}.property(),didInsertElement:function(){var e=this.get("row"),t=this.get("observedFields");i(e,t,this,"updateValue")},willDestroyElement:function(){var e=this.get("row"),t=this.get("observedFields");u(e,t,this,"updateValue")},getValue:function(){var e=this.get("column.name"),t=this.get("row"),s=r(t,e);return s},updateValue:function(){var e=this.getValue();this.set("value",e)}.on("init").observes("column"),getColumnIndex:function(){var e=this.get("column"),t=this.get("controller.sortedColumns");return t.indexOf(e)},getRowIndex:function(){var e=this.get("row"),t=this.get("controller.sortedRows");return t.indexOf(e)},mouseEnter:function(){var e=this.$(),t=e.closest(".llama-body"),s=t.find(".llama-column"),n=e.index();s.each(function(){var e=a.$(this),t=e.find(".llama-cell"),s=t.eq(n);s.addClass("hover")})},mouseLeave:function(){var e=this.$(),t=e.closest(".llama-body"),s=t.find(".llama-column"),n=e.index();s.each(function(){var e=a.$(this),t=e.find(".llama-cell"),s=t.eq(n);s.removeClass("hover")})},click:function(){if(this.get("column.isClickable")){var e=this.get("controller"),t=this.get("row"),s=this.get("column");e.sendAction("cellClick",t,s)}},actions:{keyLeft:function(){var e=this.getRowIndex(),t=this.getColumnIndex();this.get("controller").send("focusLeft",e,t)},keyUp:function(){var e=this.getRowIndex(),t=this.getColumnIndex();this.get("controller").send("focusUp",e,t)},keyRight:function(){var e=this.getRowIndex(),t=this.getColumnIndex();this.get("controller").send("focusRight",e,t)},keyDown:function(){var e=this.getRowIndex(),t=this.getColumnIndex();this.get("controller").send("focusDown",e,t)}}});n["default"]=c}),define("dummy/views/llama-body-column",["ember","dummy/views/llama-column","dummy/views/llama-body-cell","exports"],function(e,t,s,n){"use strict";var a=e["default"],o=t["default"],l=(s["default"],a.get),r=a.set,i=o.extend({classNames:"llama-body-column",content:a.computed.alias("controller.sortedRows"),itemViewClass:function(){var e=this.get("controller"),t=this.get("column"),s=l(t,"type");return e.getCellType(s)}.property(),createChildView:function(e,t){var s=this.get("column"),n=l(t,"content");return r(t,"column",s),r(t,"row",n),this._super(e,t)},column:null});n["default"]=i}),define("dummy/views/llama-body-columngroup",["dummy/views/llama-columngroup","exports"],function(e,t){"use strict";var s=e["default"],n=s.extend({templateName:"llama-body-columngroup",classNames:"llama-body-columngroup"});t["default"]=n}),define("dummy/views/llama-body",["ember","llama-table/mixins/scroll-xy","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.View.extend(a,{templateName:"llama-body",classNames:"llama-body",actions:{scrollX:function(e){this.get("controller").send("scrollX",e)},scrollY:function(e){this.get("controller").send("scrollY",e)}}});s["default"]=o}),define("dummy/views/llama-cell",["ember","exports"],function(e,t){"use strict";var s=e["default"],n=s.View.extend({classNames:"llama-cell"});t["default"]=n}),define("dummy/views/llama-column",["ember","dummy/views/llama-cell","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.CollectionView.extend({classNames:"llama-column",itemViewClass:a,width:n.computed.alias("column.width"),setWidth:function(){var e=this.get("width");this.$().width(e)}.observes("width").on("didInsertElement")});s["default"]=o}),define("dummy/views/llama-columngroup",["ember","exports"],function(e,t){"use strict";var s=e["default"],n=s.get,a=s.View.extend({classNames:"llama-columngroup",columns:null,width:function(){var e=0;return this.get("columns").forEach(function(t){n(t,"isHidden")||(e+=n(t,"width"))}),e}.property("columns.@each.width","columns.@each.isHidden"),setWidth:function(){var e=this.get("width");this.$().width(e)}.observes("width").on("didInsertElement")});t["default"]=a}),define("dummy/views/llama-header-cell",["ember","dummy/views/llama-cell","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=a.extend({templateName:"llama-header-cell",classNames:"llama-header-cell",classNameBindings:["sortByThis","sortByThisAscending","sortByThisDescending","isSortable"],attributeBindings:["title"],title:n.computed.alias("column.label"),isSortable:function(){return!(this.get("column.isSortable")===!1)}.property("column.isSortable"),isResizable:function(){return!(this.get("column.isResizable")===!1)}.property("column.isResizable"),column:null,sortProperties:n.computed.alias("controller.sortedRows.sortProperties"),sortAscending:n.computed.alias("controller.sortedRows.sortAscending"),sortDescending:n.computed.not("sortAscending"),sortByThis:function(){var e=this.get("sortProperties"),t=this.get("column.name"),s=n.isArray(e)&&e.contains(t);return s}.property("sortProperties.firstObject","column.name"),sortByThisAscending:n.computed.and("sortByThis","sortAscending"),sortByThisDescending:n.computed.and("sortByThis","sortDescending"),mouseDown:function(e){var t=n.$(e.target).is(".resize-handle"),s=this.get("controller");1===e.which&&(e.preventDefault(),t&&this.get("isResizable")?s.send("startResize",e,this.get("column")):this.get("isSortable")&&s.send("sortBy",this.get("column.name")))}});s["default"]=o}),define("dummy/views/llama-header-column",["ember","dummy/views/llama-column","dummy/views/llama-header-cell","exports"],function(e,t,s,n){"use strict";var a=e["default"],o=t["default"],l=s["default"],r=a.set,i=o.extend({classNames:"llama-header-column",content:function(){return[this.get("column")]}.property(),itemViewClass:l,createChildView:function(e,t){var s=this.get("column");return r(t,"column",s),this._super(e,t)},column:null});n["default"]=i}),define("dummy/views/llama-header-columngroup",["dummy/views/llama-columngroup","exports"],function(e,t){"use strict";var s=e["default"],n=s.extend({templateName:"llama-header-columngroup",classNames:"llama-header-columngroup"});t["default"]=n}),define("dummy/views/llama-header",["ember","exports"],function(e,t){"use strict";var s=e["default"],n=s.View.extend({templateName:"llama-header",classNames:"llama-header"});t["default"]=n}),define("dummy/views/llama-number-cell",["ember","dummy/views/llama-body-cell","exports"],function(e,t,s){"use strict";var n=e["default"],a=t["default"],o=n.get,l=a.extend({classNames:"number",getValue:function(){var e=this.get("column.name"),t=this.get("row"),s=o(t,e);return Number(s)}});s["default"]=l}),define("dummy/views/remove-button-cell",["dummy/views/button-cell","exports"],function(e,t){"use strict";var s=e["default"],n=s.extend({buttonText:"Remove",actionName:"removeRow"});t["default"]=n}),define("dummy/config/environment",["ember"],function(e){var t="dummy";try{var s=t+"/config/environment",n=e["default"].$('meta[name="'+s+'"]').attr("content"),a=JSON.parse(unescape(n));return{"default":a}}catch(o){throw new Error('Could not read config from meta tag with name "'+s+'".')}}),runningTests?require("dummy/tests/test-helper"):require("dummy/app")["default"].create({});