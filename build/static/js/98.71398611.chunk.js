(this["webpackJsonpyoda-admin-react"]=this["webpackJsonpyoda-admin-react"]||[]).push([[98],{441:function(e,t,r){"use strict";var a=r(4),n=r(1),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},l=r(18),s=function(e,t){return n.createElement(l.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:c}))};s.displayName="DownOutlined";t.a=n.forwardRef(s)},583:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return B}));var a=r(1),n=r(395),c=r(397),l=r(27),s=r(3),o=r(5),i=r(10),p=r(6),b=r.n(p),h=r(55),m=r(52),u=r(378),d=r(19),j=r(441),f=r(207),O=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r},x=function(e){var t,r,n=e.prefixCls,c=e.separator,l=void 0===c?"/":c,o=e.children,i=e.overlay,p=e.dropdownProps,b=O(e,["prefixCls","separator","children","overlay","dropdownProps"]),h=(0,a.useContext(m.b).getPrefixCls)("breadcrumb",n);return t="href"in b?a.createElement("a",Object(s.a)({className:"".concat(h,"-link")},b),o):a.createElement("span",Object(s.a)({className:"".concat(h,"-link")},b),o),r=t,t=i?a.createElement(f.a,Object(s.a)({overlay:i,placement:"bottom"},p),a.createElement("span",{className:"".concat(h,"-overlay-link")},r,a.createElement(j.a,null))):r,o?a.createElement("li",null,t,l&&a.createElement("span",{className:"".concat(h,"-separator")},l)):null};x.__ANT_BREADCRUMB_ITEM=!0;var y=x,v=function(e){var t=e.children,r=(0,a.useContext(m.b).getPrefixCls)("breadcrumb");return a.createElement("span",{className:"".concat(r,"-separator")},t||"/")};v.__ANT_BREADCRUMB_SEPARATOR=!0;var g=v,k=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r};function E(e,t,r,n){var c=r.indexOf(e)===r.length-1,l=function(e,t){if(!e.breadcrumbName)return null;var r=Object.keys(t).join("|");return e.breadcrumbName.replace(new RegExp(":(".concat(r,")"),"g"),(function(e,r){return t[r]||e}))}(e,t);return c?a.createElement("span",null,l):a.createElement("a",{href:"#/".concat(n.join("/"))},l)}var w=function(e,t){return e=(e||"").replace(/^\//,""),Object.keys(t).forEach((function(r){e=e.replace(":".concat(r),t[r])})),e},N=function(e,t,r){var a=Object(i.a)(e),n=w(t||"",r);return n&&a.push(n),a},P=function(e){var t,r=e.prefixCls,n=e.separator,c=void 0===n?"/":n,l=e.style,i=e.className,p=e.routes,j=e.children,f=e.itemRender,O=void 0===f?E:f,x=e.params,v=void 0===x?{}:x,g=k(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),P=a.useContext(m.b),C=P.getPrefixCls,R=P.direction,_=C("breadcrumb",r);if(p&&p.length>0){var B=[];t=p.map((function(e){var t,r=w(e.path,v);return r&&B.push(r),e.children&&e.children.length&&(t=a.createElement(u.a,{items:e.children.map((function(e){return{key:e.path||e.breadcrumbName,label:O(e,v,p,N(B,e.path,v))}}))})),a.createElement(y,{overlay:t,separator:c,key:r||e.breadcrumbName},O(e,v,p,B))}))}else j&&(t=Object(h.a)(j).map((function(e,t){return e?Object(d.a)(e,{separator:c,key:t}):e})));var S=b()(_,Object(o.a)({},"".concat(_,"-rtl"),"rtl"===R),i);return a.createElement("nav",Object(s.a)({className:S,style:l},g),a.createElement("ol",null,t))};P.Item=y,P.Separator=g;var C=P,R=r(2);function _(e){var t=e.title,r=e.breadcrumb,a=e.desc;return Object(R.jsxs)(c.a,{span:24,className:"hp-bg-black-bg hp-py-sm-32 hp-py-64 hp-px-sm-24 hp-px-md-48 hp-px-80 hp-overflow-hidden",style:{borderRadius:32},children:[Object(R.jsxs)("svg",{width:358,height:336,fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"hp-position-absolute-bottom-right hp-rtl-scale-x-n1",children:[Object(R.jsx)("path",{d:"M730.404 135.471 369.675-6.641l88.802 164.001-243.179-98.8 246.364 263.281-329.128-126.619 114.698 166.726-241.68-62.446",stroke:"url(#a)",strokeWidth:40,strokeLinejoin:"bevel"}),Object(R.jsx)("defs",{children:Object(R.jsxs)("linearGradient",{id:"a",x1:315.467,y1:6.875,x2:397.957,y2:337.724,gradientUnits:"userSpaceOnUse",children:[Object(R.jsx)("stop",{stopColor:"#fff"}),Object(R.jsx)("stop",{offset:1,stopColor:"#fff",stopOpacity:0})]})})]}),Object(R.jsx)(n.a,{children:Object(R.jsx)(c.a,{sm:12,span:24,children:Object(R.jsxs)(n.a,{children:[t&&Object(R.jsx)(c.a,{span:24,children:Object(R.jsx)("h1",{className:"hp-mb-0 hp-text-color-black-0",children:t})}),r&&Object(R.jsx)(c.a,{span:24,children:Object(R.jsxs)(C,{className:"hp-d-flex hp-flex-wrap hp-mt-24",children:[Object(R.jsx)(C.Item,{children:Object(R.jsx)(l.b,{to:"/",className:"hp-text-color-black-0 hp-hover-text-color-primary-2",children:"Home"})}),r.map((function(e,t){return Object(R.jsx)(C.Item,{children:Object(R.jsx)(l.b,{to:e.link?e.link:"#",className:"hp-text-color-black-0".concat(e.link?" hp-hover-text-color-primary-2":""),children:e.title})},t)}))]})}),a&&Object(R.jsx)(c.a,{span:24,children:Object(R.jsx)("p",{className:"h5 hp-mb-0 hp-mt-24 hp-text-color-black-0",children:a})})]})})})]})}function B(){return Object(R.jsx)(n.a,{gutter:[32,32],children:Object(R.jsx)(c.a,{span:24,children:Object(R.jsx)(_,{title:"Blank Page",breadcrumb:[{title:"Pages"},{title:"Blank Page"}]})})})}}}]);
//# sourceMappingURL=98.71398611.chunk.js.map