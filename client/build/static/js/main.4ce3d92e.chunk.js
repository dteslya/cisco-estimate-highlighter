(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{45:function(e,t,n){e.exports=n(58)},58:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),l=n(8),r=n.n(l),i=n(42),c=n(85),u=n(83),d=n(77),m=n(86),s=n(84),f=n(87),h=n(82),g=n(79),p=n(80),E=n(26),w=n.n(E),b=(n(50),function(){return o.a.createElement(w.a,{getUploadParams:function(){return{url:"/upload"}},onChangeStatus:function(e,t){var n=e.meta;console.log(t,n),"done"==t&&fetch("/download").then((function(e){return e.blob()})).then((function(e){var t=window.URL.createObjectURL(e),a=document.createElement("a");a.style.display="none",a.href=t,a.download=n.name,document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(t)})).catch((function(){return console.log("oh no!")}))},maxFiles:1,multiple:!1,canCancel:!1,accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",inputContent:function(e,t){return t.reject?"XLSX files only":"Drop XLSX File"},styles:{dropzone:{border:"4px dashed #f2f2f2",width:400,height:200,overflow:"auto"},dropzoneActive:{borderColor:"#01A460"},inputLabel:function(e,t){return t.reject?{fontFamily:"Roboto",color:"red"}:{fontFamily:"Roboto",color:"#01A460"}}}})}),v=n(81),y=function(){return o.a.createElement(c.a,{pad:"small"},o.a.createElement(v.a,null,"## How to use\n\nUpload CCW estimate in XLSx format. Resulting file will be downloaded automatically.\n        \n## Matching criteria\n* Part Numbers starting with **R-**, **L-**, **S-**, **LIC-** or ending with **Y** and **Price > $0**\n* Description contains **eDelivery** and **Price > $0**\n* **Lead time <= 10 days** and **Price > $0**"))},k={global:{colors:{brand:"#01A460"},font:{family:"Roboto",size:"18px",height:"20px"}}},j=function(e){return o.a.createElement(c.a,Object.assign({tag:"header",direction:"row",align:"center",justify:"between",background:"brand",pad:{left:"medium",right:"small",vertical:"small"},elevation:"medium",style:{zIndex:"1"}},e))};var C=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],l=t[1];return o.a.createElement(u.a,{theme:k,themeMode:"dark",full:!0},o.a.createElement(d.a.Consumer,null,(function(e){return o.a.createElement(c.a,{fill:!0},o.a.createElement(j,null,o.a.createElement(m.a,{level:"3",margin:"none"},"Cisco Estimate Highlighter"),o.a.createElement(s.a,{icon:o.a.createElement(g.a,null),onClick:function(){return l(!n)}})),o.a.createElement(c.a,{direction:"row",flex:!0,overflow:{horizontal:"hidden"}},o.a.createElement(c.a,{flex:!0,align:"center",justify:"center"},o.a.createElement(b,null)),n&&"small"===e?o.a.createElement(h.a,null,o.a.createElement(c.a,{background:"light-2",tag:"header",justify:"end",align:"center",direction:"row"},o.a.createElement(s.a,{icon:o.a.createElement(p.a,null),onClick:function(){return l(!1)}})),o.a.createElement(c.a,{fill:!0,background:"light-2",align:"start",justify:"center"},o.a.createElement(y,null))):o.a.createElement(f.a,{direction:"horizontal",open:n},o.a.createElement(c.a,{flex:!0,width:"medium",background:"light-2",elevation:"small",align:"start",justify:"center"},o.a.createElement(y,null)))))})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.4ce3d92e.chunk.js.map