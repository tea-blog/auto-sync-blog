import{R as i}from"./chunks/theme.CxKxdHjm.js";import{j as o,ah as u,ai as l,aj as c,ak as f,al as d,am as m,an as h,ao as A,ap as g,aq as v,d as w,u as y,l as C,x as P,ar as R,as as b,at as j,af as x}from"./chunks/framework.CI7b8t5i.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),D=w({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=y();return C(()=>{P(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&R(),b(),j(),s.setup&&s.setup(),()=>x(s.Layout)}});async function E(){const e=T(),a=S();a.provide(l,e);const t=c(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function S(){return A(D)}function T(){let e=o,a;return g(t=>{let n=v(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&E().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{E as createApp};