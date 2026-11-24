/* Harry’s Chamber service worker: the app shell is saved on first visit and served instantly afterwards,
   while a fresh copy is fetched quietly in the background (the page shows "A new version is ready"). */
const C="mt-v10",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
const clean=async r=>r.redirected?new Response(await r.blob(),{status:200,headers:{"content-type":r.headers.get("content-type")||"text/html"}}):r;
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:"reload"})).then(async r=>{if(r.ok)await c.put(u,await clean(r))}).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("mt-v")&&x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET"||new URL(q.url).origin!==location.origin)return;
 e.respondWith((async()=>{const c=await caches.open(C),hit=await c.match(q,{ignoreSearch:true})||(q.mode=="navigate"?await c.match("./")||await c.match("index.html"):null);
  const net=fetch(q).then(r=>{if(r.ok&&r.type=="basic")c.put(q,r.clone());return r}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}
  return(await net)||Response.error()})())});
/* reminders: the page copies them into the "mt-data" cache; Chrome can wake this worker about once a day to check them */
const P=n=>String(n).padStart(2,"0"),T=()=>{const d=new Date();return d.getFullYear()+"-"+P(d.getMonth()+1)+"-"+P(d.getDate())};
const AD=(s,n)=>{const[y,m,d]=s.split("-").map(Number),x=new Date(y,m-1,d+n);return x.getFullYear()+"-"+P(x.getMonth()+1)+"-"+P(x.getDate())};
async function daily(){const c=await caches.open("mt-data"),r=await c.match("/__rem");if(!r)return;const st=await r.json(),t=T();let ch=0;st.sent=st.sent||{};
 for(const id in st.rem){const q=st.rem[id];if(!q.d||q.d.length!=10)continue;for(const o of q.off){const k=id+":"+o+":"+q.d;
  if(t>=AD(q.d,-o)&&t<=AD(q.d,2)&&!st.sent[k]){st.sent[k]=1;ch=1;await self.registration.showNotification(q.n,{body:o==0?"Out today! 🎬":o==1?"Comes out tomorrow":"Out in "+o+" days ("+q.d+")",tag:k,icon:"icon-192.png",badge:"icon-192.png"})}}}
 if(ch)await c.put("/__rem",new Response(JSON.stringify(st),{headers:{"content-type":"application/json"}}))}
self.addEventListener("periodicsync",e=>{if(e.tag=="mt-daily")e.waitUntil(daily())});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window"}).then(c=>c.length?c[0].focus():self.clients.openWindow("./")))});
