!function(t){t.fn.noUiSlider=function(n,e){function a(t,n,e){"function"==typeof t&&t.call(n,e)}function i(t,n,e){var a=n.data("setup"),i=a.handles,o=a.settings,s=a.pos;if(t=0>t?0:t>100?100:t,2==o.handles)if(e.is(":first-child")){var r=parseFloat(i[1][0].style[s])-o.margin;t=t>r?r:t}else{var r=parseFloat(i[0][0].style[s])+o.margin;t=r>t?r:t}if(o.step){var d=l.from(o.range,o.step);t=Math.round(t/d)*d}return t}function o(t){try{return[t.clientX||t.originalEvent.clientX||t.originalEvent.touches[0].clientX,t.clientY||t.originalEvent.clientY||t.originalEvent.touches[0].clientY]}catch(n){return["x","y"]}}function s(t,n){return parseFloat(t[0].style[n])}var r=window.navigator.msPointerEnabled?2:"ontouchend"in document?3:1;window.debug&&console&&console.log(r);var l={to:function(t,n){return n=t[0]<0?n+Math.abs(t[0]):n-t[0],100*n/this._length(t)},from:function(t,n){return 100*n/this._length(t)},is:function(t,n){return n*this._length(t)/100+t[0]},_length:function(t){return t[0]>t[1]?t[0]-t[1]:t[1]-t[0]}},d={handles:2,serialization:{to:["",""],resolution:.01}};methods={create:function(){return this.each(function(){function e(t,n,e){t.css(c,n+"%").data("input").val(l.is(h.range,n).toFixed(b))}var c,u,h=t.extend(d,n),f="<a><div></div></a>",p=t(this).data("_isnS_",!0),v=[],g="",m=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},y=(h.serialization.resolution=h.serialization.resolution||.01).toString().split("."),b=1==y[0]?0:y[1].length;h.start=m(h.start)?[h.start,0]:h.start,t.each(h,function(t,n){m(n)?h[t]=parseFloat(n):"object"==typeof n&&m(n[0])&&(n[0]=parseFloat(n[0]),m(n[1])&&(n[1]=parseFloat(n[1])));var e=!1;switch(n="undefined"==typeof n?"x":n,t){case"range":case"start":e=2!=n.length||!m(n[0])||!m(n[1]);break;case"handles":e=1>n||n>2||!m(n);break;case"connect":e="lower"!=n&&"upper"!=n&&"boolean"!=typeof n;break;case"orientation":e="vertical"!=n&&"horizontal"!=n;break;case"margin":case"step":e="undefined"!=typeof n&&!m(n);break;case"serialization":e="object"!=typeof n||!m(n.resolution)||"object"==typeof n.to&&n.to.length<h.handles;break;case"slide":e="function"!=typeof n}e&&console&&console.error("Bad input for "+t+" on slider:",p)}),h.margin=h.margin?l.from(h.range,h.margin):0,(h.serialization.to instanceof jQuery||"string"==typeof h.serialization.to||h.serialization.to===!1)&&(h.serialization.to=[h.serialization.to]),"vertical"==h.orientation?(g+="vertical",c="top",u=1):(g+="horizontal",c="left",u=0),g+=h.connect?"lower"==h.connect?" connect lower":" connect":"",p.addClass(g);for(var z=0;z<h.handles;z++){v[z]=p.append(f).children(":last");var F=l.to(h.range,h.start[z]);v[z].css(c,F+"%"),100==F&&v[z].is(":first-child")&&v[z].css("z-index",2);var w=".noUiSlider",C=(1===r?"mousedown":2===r?"MSPointerDown":"touchstart")+w+"X",_=(1===r?"mousemove":2===r?"MSPointerMove":"touchmove")+w,x=(1===r?"mouseup":2===r?"MSPointerUp":"touchend")+w;v[z].find("div").on(C,function(n){if(t("body").bind("selectstart"+w,function(){return!1}),!p.hasClass("disabled")){t("body").addClass("TOUCH");var e=t(this).addClass("active").parent(),s=e.add(t(document)).add("body"),r=parseFloat(e[0].style[c]),d=o(n),f=d,g=!1;t(document).on(_,function(t){t.preventDefault();var n=o(t);if("x"!=n[0]){n[0]-=d[0],n[1]-=d[1];var s=[f[0]!=n[0],f[1]!=n[1]],m=r+100*n[u]/(u?p.height():p.width());m=i(m,p,e),s[u]&&m!=g&&(e.css(c,m+"%").data("input").val(l.is(h.range,m).toFixed(b)),a(h.slide,p.data("_n",!0)),g=m,e.css("z-index",2==v.length&&100==m&&e.is(":first-child")?2:1)),f=n}}).on(x,function(){s.off(w),t("body").removeClass("TOUCH"),p.find(".active").removeClass("active").end().data("_n")&&p.data("_n",!1).change()})}}).on("click",function(t){t.stopPropagation()})}1==r&&p.on("click",function(t){if(!p.hasClass("disabled")){var n=o(t),s=100*(n[u]-p.offset()[c])/(u?p.height():p.width()),r=v.length>1?n[u]<(v[0].offset()[c]+v[1].offset()[c])/2?v[0]:v[1]:v[0];e(r,i(s,p,r),p),a(h.slide,p),p.change()}});for(var z=0;z<v.length;z++){var k=l.is(h.range,s(v[z],c)).toFixed(b);"string"==typeof h.serialization.to[z]?v[z].data("input",p.append('<input type="hidden" name="'+h.serialization.to[z]+'">').find("input:last").val(k).change(function(t){t.stopPropagation()})):0==h.serialization.to[z]?v[z].data("input",{val:function(t){return"undefined"==typeof t?this.handle.data("noUiVal"):void this.handle.data("noUiVal",t)},handle:v[z]}):v[z].data("input",h.serialization.to[z].data("handleNR",z).val(k).change(function(){var n=[null,null];n[t(this).data("handleNR")]=t(this).val(),p.val(n)}))}t(this).data("setup",{settings:h,handles:v,pos:c,res:b})})},val:function(){if("undefined"!=typeof arguments[0]){var n="number"==typeof arguments[0]?[arguments[0]]:arguments[0];return this.each(function(){for(var e=t(this).data("setup"),a=0;a<e.handles.length;a++)if(null!=n[a]){var o=i(l.to(e.settings.range,n[a]),t(this),e.handles[a]);e.handles[a].css(e.pos,o+"%").data("input").val(l.is(e.settings.range,o).toFixed(e.res))}})}for(var e=t(this).data("setup").handles,a=[],o=0;o<e.length;o++)a.push(parseFloat(e[o].data("input").val()));return 1==a.length?a[0]:a},disabled:function(){return e?t(this).addClass("disabled"):t(this).removeClass("disabled")}};var c=jQuery.fn.val;return jQuery.fn.val=function(){return this.data("_isnS_")?methods.val.apply(this,arguments):c.apply(this,arguments)},"disabled"==n?methods.disabled.apply(this):methods.create.apply(this)}}(jQuery);