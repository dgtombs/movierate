(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{125:function(e,t,n){},174:function(e,t,n){},350:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),c=n(23),a=n.n(c),o=(n(174),n(5)),s=n(159),l=(n(175),n(125),n(99)),d=n.n(l),j=n(353),u=n(352),b=n(100),h=n.n(b),x={1:"Very Bad!",2:"Bad",3:"Alright",4:"Good",5:"Very Good!"},O=function(e){return String(e.rating)+"/5: "+(e.ratingText||x[e.rating])},f=function(e,t){return e>t?1:e<t?-1:0},v=i.a.createContext({title:"You should never see this",introduction:"You should never see this"}),m=n(107),g=n(64),p=n(16),y=j.a.Text,w=j.a.Title,C="close-button",D=function(e){var t=e.movie,n=e.onClose;return Object(p.jsxs)("div",{className:"movie-details",children:[Object(p.jsxs)("header",{children:[Object(p.jsxs)(w,{level:2,children:[t.title," (",t.year,")"]}),Object(p.jsx)(g.a,{type:"text",className:"close-button","data-testid":C,onClick:n,children:Object(p.jsx)(m.a,{})})]}),Object(p.jsx)(w,{level:5,children:"Rating"}),Object(p.jsx)(y,{children:O(t)}),Object(p.jsx)(w,{level:5,children:"Director"}),Object(p.jsx)(y,{children:t.director}),Object(p.jsx)(w,{level:5,children:"Review"}),Object(p.jsx)(d.a,{children:t.review}),Object(p.jsxs)(y,{type:"secondary",children:["Reviewed ",h()(t.rateDate).format("LL"),"."]})]})},N=j.a.Title,S="movie-list-table",I=function(){var e=Object(r.useContext)(v);return Object(p.jsxs)("div",{className:"introduction",children:[Object(p.jsx)(N,{level:2,children:"Introduction"}),Object(p.jsx)(d.a,{children:e.introduction})]})},T=function(e){var t=e.moviesData,n=t.config,i=t.movies,c=Object(r.useState)(null),a=Object(o.a)(c,2),s=a[0],l=a[1];Object(r.useEffect)((function(){document.title=n.title}));var d=[{title:"Title",dataIndex:"title",sorter:function(e,t){return f(e.title,t.title)}},{title:"Year",dataIndex:"year",defaultSortOrder:"ascend",sorter:function(e,t){return f(e.year,t.year)}},{title:"Director",dataIndex:"director"},{title:"Rating",className:"rating-column",dataIndex:"rating",render:function(e,t){return O(t)},sorter:function(e,t){return t.rating-e.rating}},{title:"Review Date",className:"review-date-column",dataIndex:"rateDate",render:function(e){return h()(e).format("l")},sorter:function(e,t){return f(e.rateDate,t.rateDate)}}];return s&&d.splice(2,1),Object(p.jsxs)(v.Provider,{value:n,children:[Object(p.jsx)("header",{children:Object(p.jsx)(N,{children:n.title})}),Object(p.jsxs)("div",{className:"main-content",children:[Object(p.jsx)("div",{className:"movie-list",children:Object(p.jsx)(u.a,{"data-testid":S,columns:d,dataSource:i,rowKey:function(e){return e.title+e.year},onRow:function(e){return{onClick:function(){return l(e)}}}})}),s?Object(p.jsx)(D,{movie:s,onClose:function(){l(null)}}):Object(p.jsx)(I,{})]}),Object(p.jsx)("footer",{children:Object(p.jsxs)("a",{href:"https://github.com/dgtombs/movierate",className:"source-repo-link",children:[Object(p.jsx)("img",{src:"GitHub-Mark-16px.png",alt:"GitHub logo"})," Source Code"]})})]})},k=function(){var e=Object(r.useState)(!0),t=Object(o.a)(e,2),n=t[0],i=t[1],c=Object(r.useState)(null),a=Object(o.a)(c,2),l=a[0],d=a[1];return l||fetch("api/movies.json").then((function(e){return e.json()})).then((function(e){d(e)})).finally((function(){i(!1)})),Object(p.jsx)("div",{className:"App",children:n?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(s.a,{})," Loading..."]}):l?Object(p.jsx)(T,{moviesData:l}):Object(p.jsx)(p.Fragment,{children:"Unable to load movie database. Please contact the site owner."})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,354)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),c(e),a(e)}))};a.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(k,{})}),document.getElementById("root")),F()}},[[350,1,2]]]);
//# sourceMappingURL=main.1b297484.chunk.js.map