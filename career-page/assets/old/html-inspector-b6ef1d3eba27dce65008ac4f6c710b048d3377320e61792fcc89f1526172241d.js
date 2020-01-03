/*!
 * HTML Inspector - v0.3.0
 *
 * Copyright (c) 2013 Philip Walton <http://philipwalton.com>
 * Released under the MIT license
 *
 * Date: 2013-06-23
 */
!function(e,t){"use strict";function a(e){return e&&e.length?f.call(e):[]}function n(e){var t,a=e.attributes,n=a.length,i=0,r=[];if(0===n)return[];for(;t=a[i++];)r.push({name:t.name,value:t.value});return r.sort(function(e,t){return e.name===t.name?0:e.name<t.name?-1:1})}function i(e){return"[object RegExp]"==Object.prototype.toString.call(e)}function r(e){var t=[];return e=e.sort(),e.forEach(function(a,n){a!==e[n-1]&&t.push(a)}),t}function s(e){return f.call(arguments,1).forEach(function(t){if(t)for(var a in t)e[a]=t[a]}),e}function l(e,t){return i(t)?t.test(e):"string"==typeof t?e==t:t.some(function(t){return i(t)?t.test(e):e===t})}function o(e){var t=/^(?:(https?:)\/\/)?((?:[0-9a-z\.\-]+)(?::(?:\d+))?)/,a=t.exec(e),n=a[1],i=a[2];return n!=location.protocol||i!=location.host}function u(e,t){for(var a,n=0,i=["matches","matchesSelector","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];a=i[n++];)if("function"==typeof e[a])return e[a](t);throw new Error("You are using a browser that doesn't not support element.matches() or element.matchesSelector()")}function c(e,t){return null==t?!1:("string"==typeof t||t.nodeType?t=[t]:"length"in t&&(t=a(t)),t.some(function(t){return"string"==typeof t?u(e,t):e===t}))}function b(e){for(var t=[];e.parentNode&&1==e.parentNode.nodeType;)t.push(e=e.parentNode);return t}function d(){this.handlers=[]}function m(){this._events={}}function h(){this._errors=[]}function p(){}function g(){}var f=Array.prototype.slice;d.prototype.add=function(e){this.handlers.push(e)},d.prototype.remove=function(e){this.handlers=this.handlers.filter(function(t){return t!=e})},d.prototype.fire=function(e,t){this.handlers.forEach(function(a){a.apply(e,t)})},m.prototype.on=function(e,t){this._events[e]||(this._events[e]=new d),this._events[e].add(t)},m.prototype.off=function(e,t){this._events[e]&&this._events[e].remove(t)},m.prototype.trigger=function(e,t,a){this._events[e]&&this._events[e].fire(t,a)},h.prototype.warn=function(e,t,a){this._errors.push({rule:e,message:t,context:a})},h.prototype.getWarnings=function(){return this._errors},p.prototype.add=function(e,t,a){"function"==typeof t&&(a=t,t={}),this[e]={name:e,config:t,fn:a}},p.prototype.extend=function(e,t){"function"==typeof t&&(t=t.call(this[e].config,this[e].config)),s(this[e].config,t)},g.prototype.add=function(e,t){this[e]=t},g.prototype.extend=function(e,t){"function"==typeof t&&(t=t.call(this[e],this[e])),s(this[e],t)};var y=function(){function e(e,t,a){e=null==e?Object.keys(w.rules):e,e.forEach(function(e){w.rules[e]&&w.rules[e].fn.call(w,t,a,w.rules[e].config)})}function f(e,t,i){1==e.nodeType&&(c(e,i.exclude)||(t.trigger("element",e,[e.nodeName.toLowerCase(),e]),e.id&&t.trigger("id",e,[e.id,e]),a(e.classList).forEach(function(a){t.trigger("class",e,[a,e])}),n(e).forEach(function(a){t.trigger("attribute",e,[a.name,a.value,e])})),c(e,i.excludeSubTree)||a(e.childNodes).forEach(function(e){f(e,t,i)}))}function y(e){return e&&("string"==typeof e||1==e.nodeType?e={domRoot:e}:Array.isArray(e)?e={useRules:e}:"function"==typeof e&&(e={onComplete:e})),s({},w.config,e)}function v(e){return Array.isArray(e)||(e=[e]),e=e.map(function(e){return"iframe"==e.nodeName.toLowerCase()&&o(e.src)?"(can't display iframe with cross-origin source)":e}),1===e.length?e[0]:e}var w={config:{useRules:null,domRoot:"html",exclude:"svg",excludeSubTree:["svg","iframe"],onComplete:function(e){e.forEach(function(e){console.warn(e.message,v(e.context))})}},rules:new p,modules:new g,inspect:function(a){var n,i=new m,r=new h;a=y(a),n="string"==typeof a.domRoot?t.querySelector(a.domRoot):a.domRoot,e(a.useRules,i,r),i.trigger("beforeInspect",n),f(n,i,a),i.trigger("afterInspect",n),a.onComplete(r.getWarnings())},utils:{toArray:a,getAttributes:n,isRegExp:i,unique:r,extend:s,foundIn:l,isCrossOrigin:o,matchesSelector:u,matches:c,parents:b},_constructors:{Listener:m,Reporter:h,Callbacks:d}};return w}();y.modules.add("css",function(){function e(t){return t.reduce(function(t,n){var i;return n.cssRules?t.concat(e(a(n.cssRules))):n.selectorText?(i=n.selectorText.match(s)||[],t.concat(i.map(function(e){return e.slice(1)}))):t},[])}function n(t){return t.reduce(function(t,n){return t.concat(e(a(n.cssRules)))},[])}function i(){return a(t.styleSheets).filter(function(e){return c(e.ownerNode,l.styleSheets)})}var s=/\.[a-z0-9_\-]+/gi,l={getClassSelectors:function(){return r(n(i()))},styleSheets:'link[rel="stylesheet"], style'};return l}()),y.modules.add("validation",function(){function e(e){return r[e]?r[e].attributes.replace(/\*/g,"").split(/\s*;\s*/):[]}function t(e){return l(e,o)}function a(e){return l(e,m.elementWhitelist)}function n(e){return l(e,m.attributeWhitelist)}function i(e){var t,a=[];return t=r[e].children,t=t.indexOf("*")>-1?[]:t.split(/\s*\;\s*/),t.forEach(function(e){s[e]?(a=a.concat(s[e].elements),a=a.concat(s[e].exceptions||[])):a.push(e)}),a.length?a:[/[\s\S]+/]}var r={a:{children:"transparent*",attributes:"globals; href; target; download; rel; hreflang; type"},abbr:{children:"phrasing",attributes:"globals"},address:{children:"flow*",attributes:"globals"},area:{children:"empty",attributes:"globals; alt; coords; shape; href; target; download; rel; hreflang; type"},article:{children:"flow",attributes:"globals"},aside:{children:"flow",attributes:"globals"},audio:{children:"source*; transparent*",attributes:"globals; src; crossorigin; preload; autoplay; mediagroup; loop; muted; controls"},b:{children:"phrasing",attributes:"globals"},base:{children:"empty",attributes:"globals; href; target"},bdi:{children:"phrasing",attributes:"globals"},bdo:{children:"phrasing",attributes:"globals"},blockquote:{children:"flow",attributes:"globals; cite"},body:{children:"flow",attributes:"globals; onafterprint; onbeforeprint; onbeforeunload; onfullscreenchange; onfullscreenerror; onhashchange; onmessage; onoffline; ononline; onpagehide; onpageshow; onpopstate; onresize; onstorage; onunload"},br:{children:"empty",attributes:"globals"},button:{children:"phrasing*",attributes:"globals; autofocus; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; name; type; value"},canvas:{children:"transparent",attributes:"globals; width; height"},caption:{children:"flow*",attributes:"globals"},cite:{children:"phrasing",attributes:"globals"},code:{children:"phrasing",attributes:"globals"},col:{children:"empty",attributes:"globals; span"},colgroup:{children:"col",attributes:"globals; span"},menuitem:{children:"empty",attributes:"globals; type; label; icon; disabled; checked; radiogroup; command"},data:{children:"phrasing",attributes:"globals; value"},datalist:{children:"phrasing; option",attributes:"globals"},dd:{children:"flow",attributes:"globals"},del:{children:"transparent",attributes:"globals; cite; datetime"},details:{children:"summary*; flow",attributes:"globals; open"},dfn:{children:"phrasing*",attributes:"globals"},dialog:{children:"flow",attributes:"globals; open"},div:{children:"flow",attributes:"globals"},dl:{children:"dt*; dd*",attributes:"globals"},dt:{children:"flow*",attributes:"globals"},em:{children:"phrasing",attributes:"globals"},embed:{children:"empty",attributes:"globals; src; type; width; height; any*"},fieldset:{children:"legend*; flow",attributes:"globals; disabled; form; name"},figcaption:{children:"flow",attributes:"globals"},figure:{children:"figcaption*; flow",attributes:"globals"},footer:{children:"flow*",attributes:"globals"},form:{children:"flow*",attributes:"globals; accept-charset; action; autocomplete; enctype; method; name; novalidate; target"},h1:{children:"phrasing",attributes:"globals"},h2:{children:"phrasing",attributes:"globals"},h3:{children:"phrasing",attributes:"globals"},h4:{children:"phrasing",attributes:"globals"},h5:{children:"phrasing",attributes:"globals"},h6:{children:"phrasing",attributes:"globals"},head:{children:"metadata content*",attributes:"globals"},header:{children:"flow*",attributes:"globals"},hr:{children:"empty",attributes:"globals"},html:{children:"head*; body*",attributes:"globals; manifest"},i:{children:"phrasing",attributes:"globals"},iframe:{children:"text*",attributes:"globals; src; srcdoc; name; sandbox; seamless; allowfullscreen; width; height"},img:{children:"empty",attributes:"globals; alt; src; crossorigin; usemap; ismap; width; height"},input:{children:"empty",attributes:"globals; accept; alt; autocomplete; autofocus; checked; dirname; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; height; list; max; maxlength; min; multiple; name; pattern; placeholder; readonly; required; size; src; step; type; value; width"},ins:{children:"transparent",attributes:"globals; cite; datetime"},kbd:{children:"phrasing",attributes:"globals"},keygen:{children:"empty",attributes:"globals; autofocus; challenge; disabled; form; keytype; name"},label:{children:"phrasing*",attributes:"globals; form; for"},legend:{children:"phrasing",attributes:"globals"},li:{children:"flow",attributes:"globals; value*"},link:{children:"empty",attributes:"globals; href; crossorigin; rel; media; hreflang; type; sizes"},main:{children:"flow*",attributes:"globals"},map:{children:"transparent; area*",attributes:"globals; name"},mark:{children:"phrasing",attributes:"globals"},menu:{children:"li*; flow*; menuitem*; hr*; menu*",attributes:"globals; type; label"},meta:{children:"empty",attributes:"globals; name; http-equiv; content; charset"},meter:{children:"phrasing*",attributes:"globals; value; min; max; low; high; optimum"},nav:{children:"flow",attributes:"globals"},noscript:{children:"varies*",attributes:"globals"},object:{children:"param*; transparent",attributes:"globals; data; type; typemustmatch; name; usemap; form; width; height"},ol:{children:"li",attributes:"globals; reversed; start type"},optgroup:{children:"option",attributes:"globals; disabled; label"},option:{children:"text*",attributes:"globals; disabled; label; selected; value"},output:{children:"phrasing",attributes:"globals; for; form; name"},p:{children:"phrasing",attributes:"globals"},param:{children:"empty",attributes:"globals; name; value"},pre:{children:"phrasing",attributes:"globals"},progress:{children:"phrasing*",attributes:"globals; value; max"},q:{children:"phrasing",attributes:"globals; cite"},rp:{children:"phrasing",attributes:"globals"},rt:{children:"phrasing",attributes:"globals"},ruby:{children:"phrasing; rt; rp*",attributes:"globals"},s:{children:"phrasing",attributes:"globals"},samp:{children:"phrasing",attributes:"globals"},script:{children:"script, data, or script documentation*",attributes:"globals; src; type; charset; async; defer; crossorigin"},section:{children:"flow",attributes:"globals"},select:{children:"option; optgroup",attributes:"globals; autofocus; disabled; form; multiple; name; required; size"},small:{children:"phrasing",attributes:"globals"},source:{children:"empty",attributes:"globals; src; type; media"},span:{children:"phrasing",attributes:"globals"},strong:{children:"phrasing",attributes:"globals"},style:{children:"varies*",attributes:"globals; media; type; scoped"},sub:{children:"phrasing",attributes:"globals"},summary:{children:"phrasing",attributes:"globals"},sup:{children:"phrasing",attributes:"globals"},table:{children:"caption*; colgroup*; thead*; tbody*; tfoot*; tr*",attributes:"globals; border"},tbody:{children:"tr",attributes:"globals"},td:{children:"flow",attributes:"globals; colspan; rowspan; headers"},template:{children:"flow; metadata",attributes:"globals"},textarea:{children:"text",attributes:"globals; autofocus; cols; dirname; disabled; form; maxlength; name; placeholder; readonly; required; rows; wrap"},tfoot:{children:"tr",attributes:"globals"},th:{children:"flow*",attributes:"globals; colspan; rowspan; headers; scope; abbr"},thead:{children:"tr",attributes:"globals"},time:{children:"phrasing",attributes:"globals; datetime"},title:{children:"text*",attributes:"globals"},tr:{children:"th*; td",attributes:"globals"},track:{children:"empty",attributes:"globals; default; kind; label; src; srclang"},u:{children:"phrasing",attributes:"globals"},ul:{children:"li",attributes:"globals"},"var":{children:"phrasing",attributes:"globals"},video:{children:"source*; transparent*",attributes:"globals; src; crossorigin; poster; preload; autoplay; mediagroup; loop; muted; controls; width; height"},wbr:{children:"empty",attributes:"globals"}},s={metadata:{elements:["base","link","meta","noscript","script","style","title"]},flow:{elements:["a","abbr","address","article","aside","audio","b","bdi","bdo","blockquote","br","button","canvas","cite","code","data","datalist","del","details","dfn","dialog","div","dl","em","embed","fieldset","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","iframe","img","input","ins","kbd","keygen","label","main","map","mark","math","menu","meter","nav","noscript","object","ol","output","p","pre","progress","q","ruby","s","samp","script","section","select","small","span","strong","sub","sup","svg","table","textarea","time","u","ul","var","video","wbr"],exceptions:["area","link","meta","style"],exceptionsSelectors:["map area","link[itemprop]","meta[itemprop]","style[scoped]"]},sectioning:{elements:["article","aside","nav","section"]},heading:{elements:["h1","h2","h3","h4","h5","h6"]},phrasing:{elements:["a","abbr","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","script","select","small","span","strong","sub","sup","svg","textarea","time","u","var","video","wbr"],exceptions:["area","link","meta"],exceptionsSelectors:["map area","link[itemprop]","meta[itemprop]"]},embedded:{elements:["audio","canvas","embed","iframe","img","math","object","svg","video"]},interactive:{elements:["a","button","details","embed","iframe","keygen","label","select","textarea"],exceptions:["audio","img","input","object","video"],exceptionsSelectors:["audio[controls]","img[usemap]","input:not([type=hidden])","object[usemap]","video[controls]"]},"sectioning roots":{elements:["blockquote","body","details","dialog","fieldset","figure","td"]},"form-associated":{elements:["button","fieldset","input","keygen","label","object","output","select","textarea"]},listed:{elements:["button","fieldset","input","keygen","object","output","select","textarea"]},submittable:{elements:["button","input","keygen","object","select","textarea"]},resettable:{elements:["input","keygen","output","select","textarea"]},labelable:{elements:["button","input","keygen","meter","output","progress","select","textarea"]},palpable:{elements:["a","abbr","address","article","aside","b","bdi","bdo","blockquote","button","canvas","cite","code","data","details","dfn","div","em","embed","fieldset","figure","footer","form","h1","h2","h3","h4","h5","h6","header","i","iframe","img","ins","kbd","keygen","label","map","mark","math","meter","nav","object","output","p","pre","progress","q","ruby","s","samp","section","select","small","span","strong","sub","sup","svg","table","textarea","time","u","var","video"],exceptions:["audio","dl","input","menu","ol","ul"],exceptionsSelectors:["audio[controls]","dl","input:not([type=hidden])","menu[type=toolbar]","ol","ul"]}},o=["accesskey","class","contenteditable","contextmenu","dir","draggable","dropzone","hidden","id","inert","itemid","itemprop","itemref","itemscope","itemtype","lang","spellcheck","style","tabindex","title","translate","role",/aria-[a-z\-]+/,/data-[a-z\-]+/,/on[a-z\-]+/],u=["applet","acronym","bgsound","dir","frame","frameset","noframes","hgroup","isindex","listing","nextid","noembed","plaintext","rb","strike","xmp","basefont","big","blink","center","font","marquee","multicol","nobr","spacer","tt"],c=[{attribute:"charset",elements:"a"},{attribute:"charset",elements:"link"},{attribute:"coords",elements:"a"},{attribute:"shape",elements:"a"},{attribute:"methods",elements:"a"},{attribute:"methods",elements:"link"},{attribute:"name",elements:"a"},{attribute:"name",elements:"embed"},{attribute:"name",elements:"img"},{attribute:"name",elements:"option"},{attribute:"rev",elements:"a"},{attribute:"rev",elements:"link"},{attribute:"urn",elements:"a"},{attribute:"urn",elements:"link"},{attribute:"accept",elements:"form"},{attribute:"nohref",elements:"area"},{attribute:"profile",elements:"head"},{attribute:"version",elements:"html"},{attribute:"ismap",elements:"input"},{attribute:"usemap",elements:"input"},{attribute:"longdesc",elements:"iframe"},{attribute:"longdesc",elements:"img"},{attribute:"lowsrc",elements:"img"},{attribute:"target",elements:"link"},{attribute:"scheme",elements:"meta"},{attribute:"archive",elements:"object"},{attribute:"classid",elements:"object"},{attribute:"code",elements:"object"},{attribute:"codebase",elements:"object"},{attribute:"codetype",elements:"object"},{attribute:"declare",elements:"object"},{attribute:"standby",elements:"object"},{attribute:"type",elements:"param"},{attribute:"valuetype",elements:"param"},{attribute:"language",elements:"script"},{attribute:"event",elements:"script"},{attribute:"for",elements:"script"},{attribute:"datapagesize",elements:"table"},{attribute:"summary",elements:"table"},{attribute:"axis",elements:"td; th"},{attribute:"scope",elements:"td"},{attribute:"datasrc",elements:"a; applet; button; div; frame; iframe; img; input; label; legend; marquee; object; option; select; span; table; textarea"},{attribute:"datafld",elements:"a; applet; button; div; fieldset; frame; iframe; img; input; label; legend; marquee; object; param; select; span; textarea"},{attribute:"dataformatas",elements:"button; div; input; label; legend; marquee; object; option; select; span; table"},{attribute:"alink",elements:"body"},{attribute:"bgcolor",elements:"body"},{attribute:"link",elements:"body"},{attribute:"marginbottom",elements:"body"},{attribute:"marginheight",elements:"body"},{attribute:"marginleft",elements:"body"},{attribute:"marginright",elements:"body"},{attribute:"margintop",elements:"body"},{attribute:"marginwidth",elements:"body"},{attribute:"text",elements:"body"},{attribute:"vlink",elements:"body"},{attribute:"clear",elements:"br"},{attribute:"align",elements:"caption"},{attribute:"align",elements:"col"},{attribute:"char",elements:"col"},{attribute:"charoff",elements:"col"},{attribute:"valign",elements:"col"},{attribute:"width",elements:"col"},{attribute:"align",elements:"div"},{attribute:"compact",elements:"dl"},{attribute:"align",elements:"embed"},{attribute:"hspace",elements:"embed"},{attribute:"vspace",elements:"embed"},{attribute:"align",elements:"hr"},{attribute:"color",elements:"hr"},{attribute:"noshade",elements:"hr"},{attribute:"size",elements:"hr"},{attribute:"width",elements:"hr"},{attribute:"align",elements:"h1; h2; h3; h4; h5; h6"},{attribute:"align",elements:"iframe"},{attribute:"allowtransparency",elements:"iframe"},{attribute:"frameborder",elements:"iframe"},{attribute:"hspace",elements:"iframe"},{attribute:"marginheight",elements:"iframe"},{attribute:"marginwidth",elements:"iframe"},{attribute:"scrolling",elements:"iframe"},{attribute:"vspace",elements:"iframe"},{attribute:"align",elements:"input"},{attribute:"hspace",elements:"input"},{attribute:"vspace",elements:"input"},{attribute:"align",elements:"img"},{attribute:"border",elements:"img"},{attribute:"hspace",elements:"img"},{attribute:"vspace",elements:"img"},{attribute:"align",elements:"legend"},{attribute:"type",elements:"li"},{attribute:"compact",elements:"menu"},{attribute:"align",elements:"object"},{attribute:"border",elements:"object"},{attribute:"hspace",elements:"object"},{attribute:"vspace",elements:"object"},{attribute:"compact",elements:"ol"},{attribute:"align",elements:"p"},{attribute:"width",elements:"pre"},{attribute:"align",elements:"table"},{attribute:"bgcolor",elements:"table"},{attribute:"cellpadding",elements:"table"},{attribute:"cellspacing",elements:"table"},{attribute:"frame",elements:"table"},{attribute:"rules",elements:"table"},{attribute:"width",elements:"table"},{attribute:"align",elements:"tbody; thead; tfoot"},{attribute:"char",elements:"tbody; thead; tfoot"},{attribute:"charoff",elements:"tbody; thead; tfoot"},{attribute:"valign",elements:"tbody; thead; tfoot"},{attribute:"align",elements:"td; th"},{attribute:"bgcolor",elements:"td; th"},{attribute:"char",elements:"td; th"},{attribute:"charoff",elements:"td; th"},{attribute:"height",elements:"td; th"},{attribute:"nowrap",elements:"td; th"},{attribute:"valign",elements:"td; th"},{attribute:"width",elements:"td; th"},{attribute:"align",elements:"tr"},{attribute:"bgcolor",elements:"tr"},{attribute:"char",elements:"tr"},{attribute:"charoff",elements:"tr"},{attribute:"valign",elements:"tr"},{attribute:"compact",elements:"ul"},{attribute:"type",elements:"ul"},{attribute:"background",elements:"body; table; thead; tbody; tfoot; tr; td; th"}],b=[{attributes:["alt"],element:"area"},{attributes:["height","width"],element:"applet"},{attributes:["dir"],element:"bdo"},{attributes:["action"],element:"form"},{attributes:["alt","src"],element:"img"},{attributes:["name"],element:"map"},{attributes:["label"],element:"optgroup"},{attributes:["name"],element:"param"},{attributes:["cols","rows"],element:"textarea"}],d=Object.keys(r).sort(),m={attributeWhitelist:[/ng\-[a-z\-]+/],elementWhitelist:[],isElementValid:function(e){return a(e)?!0:d.indexOf(e)>=0},isElementObsolete:function(e){return a(e)?!1:u.indexOf(e)>=0},isAttributeValidForElement:function(a,i){return t(a)||n(a)?!0:e(i).indexOf("any")>=0?!0:e(i).indexOf(a)>=0},isAttributeObsoleteForElement:function(e,t){return n(e)?!1:c.some(function(a){return a.attribute!==e?!1:a.elements.split(/\s*;\s*/).some(function(e){return e===t})})},isAttributeRequiredForElement:function(e,t){return n(e)?!1:b.some(function(a){return t==a.element&&a.attributes.indexOf(e)>=0})},getRequiredAttributesForElement:function(e){var t=b.filter(function(t){return t.element==e});return t[0]&&t[0].attributes||[]},isChildAllowedInParent:function(e,t){return r[e]&&r[t]?l(e,i(t)):!0}};return m}()),y.rules.add("inline-event-handlers",function(e,t){e.on("attribute",function(e,a){0===e.indexOf("on")&&t.warn("inline-event-handlers","An '"+e+"' attribute was found in the HTML. Use external scripts for event binding instead.",this)})}),y.rules.add("script-placement",{whitelist:[]},function(e,t,a){function n(e){return r?"string"==typeof r?s(e,r):Array.isArray(r)?r.length&&r.some(function(t){return s(e,t)}):!1:!1}var i=[],r=a.whitelist,s=this.utils.matches;e.on("element",function(e){i.push(this)}),e.on("afterInspect",function(){for(var e;(e=i.pop())&&"script"==e.nodeName.toLowerCase(););i.forEach(function(e){if("script"==e.nodeName.toLowerCase()){if(e.async===!0||e.defer===!0)return;n(e)||t.warn("script-placement","<script> elements should appear right before the closing </body> tag for optimal performance.",e)}})})}),y.rules.add("unnecessary-elements",{isUnnecessary:function(e){var t=e.nodeName.toLowerCase(),a="div"==t||"span"==t,n=0===e.attributes.length;return a&&n}},function(e,t,a){e.on("element",function(e){a.isUnnecessary(this)&&t.warn("unnecessary-elements","Do not use <div> or <span> elements without any attributes.",this)})}),y.rules.add("unused-classes",{whitelist:[/^js\-/,/^supports\-/,/^language\-/,/^lang\-/]},function(e,t,a){var n=y.modules.css,i=n.getClassSelectors(),r=this.utils.foundIn;e.on("class",function(e){!r(e,a.whitelist)&&i.indexOf(e)<0&&t.warn("unused-classes","The class '"+e+"' is used in the HTML but not found in any stylesheet.",this)})}),function(){function e(){return"string"==typeof a.methodology?t[a.methodology]:a.methodology}var t={suit:{modifier:/^([A-Z][a-zA-Z]*(?:\-[a-zA-Z]+)?)\-\-[a-zA-Z]+$/,element:/^([A-Z][a-zA-Z]*)\-[a-zA-Z]+$/},inuit:{modifier:/^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)\-\-(?:[a-z]+\-)*[a-z]+$/,element:/^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/},yandex:{modifier:/^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)_(?:[a-z]+_)*[a-z]+$/,element:/^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/}},a={methodology:"suit",getBlockName:function(t){var a,n=e();return n.modifier.test(t)?a=RegExp.$1:n.element.test(t)?a=RegExp.$1:a||!1},isElement:function(t){return e().element.test(t)},isModifier:function(t){return e().modifier.test(t)}};y.rules.add("bem-conventions",a,function(e,t,a){var n=this.utils.parents,i=this.utils.matches;e.on("class",function(e){if(a.isElement(e)){var r=n(this).some(function(t){return i(t,"."+a.getBlockName(e))});r||t.warn("bem-conventions","The BEM element '"+e+"' must be a descendent of '"+a.getBlockName(e)+"'.",this)}a.isModifier(e)&&(i(this,"."+a.getBlockName(e))||t.warn("bem-conventions","The BEM modifier class '"+e+"' was found without the unmodified class '"+a.getBlockName(e)+"'.",this))})})}(),y.rules.add("duplicate-ids",function(e,t){var a=[];e.on("id",function(e){a.push({id:e,context:this})}),e.on("afterInspect",function(){for(var e,n,i=[];e=a.shift();)i=a.filter(function(t){return e.id===t.id}),a=a.filter(function(t){return e.id!==t.id}),i.length&&(n=[e.context].concat(i.map(function(e){return e.context})),t.warn("duplicate-ids","The id '"+e.id+"' appears more than once in the document.",n))})}),y.rules.add("unique-elements",{elements:["title","main"]},function(e,t,a){var n={},i=a.elements;i.forEach(function(e){n[e]=[]}),e.on("element",function(e){i.indexOf(e)>=0&&n[e].push(this)}),e.on("afterInspect",function(){i.forEach(function(e){n[e].length>1&&t.warn("unique-elements","The <"+e+"> element may only appear once in the document.",n[e])})})}),y.rules.add("validate-attributes",function(e,t){var a=y.modules.validation;e.on("element",function(e){var n=a.getRequiredAttributesForElement(e);n.forEach(function(a){this.hasAttribute(a)||t.warn("validate-attributes","The '"+a+"' attribute is required for <"+e+"> elements.",this)},this)}),e.on("attribute",function(e){var n=this.nodeName.toLowerCase();a.isElementValid(n)&&(a.isAttributeObsoleteForElement(e,n)?t.warn("validate-attributes","The '"+e+"' attribute is no longer valid on the <"+n+"> element and should not be used.",this):a.isAttributeValidForElement(e,n)||t.warn("validate-attributes","'"+e+"' is not a valid attribute of the <"+n+"> element.",this))})}),y.rules.add("validate-element-location",function(e,t){var a=this.modules.validation,n=this.utils.matches,i=(this.utils.parents,[]);e.on("element",function(e){if(this.parentNode&&1==this.parentNode.nodeType){var n=e,r=this.parentNode.nodeName.toLowerCase();a.isChildAllowedInParent(n,r)||(i.push(this),t.warn("validate-element-location","The <"+n+"> element cannot be a child of the <"+r+"> element.",this))}}),e.on("element",function(e){i.indexOf(this)>-1||n(this,"body style:not([scoped])")&&t.warn("validate-element-location","<style> elements inside <body> must contain the 'scoped' attribute.",this)}),e.on("element",function(e){i.indexOf(this)>-1||n(this,"body meta:not([itemprop]), body link:not([itemprop])")&&t.warn("validate-element-location","<"+e+"> elements inside <body> must contain the 'itemprop' attribute.",this)})}),y.rules.add("validate-elements",function(e,t){var a=y.modules.validation;e.on("element",function(e){a.isElementObsolete(e)?t.warn("validate-elements","The <"+e+"> element is obsolete and should not be used.",this):a.isElementValid(e)||t.warn("validate-elements","The <"+e+"> element is not a valid HTML element.",this)})}),window.HTMLInspector=y}(this,document);