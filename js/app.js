// منطق الموقع: السلة، البحث، السطل 3D، الحركات
function chips(a,p1,p2){const ps=p1.includes(' · ')?p1.split(' · '):[p1],lb=ps.length==3?['صغير','وسط','كبير']:ps.length==2?['وسط','كبير']:[''];
 const L=ps.map((x,i)=>[x,lb[i]]);if(p2)L.push([p2,'']);
 return L.map(([x,l])=>{const m=x.match(/[\d,]+/),n=m?+m[0].replace(/,/g,''):0,t=x.replace(/[\d,]+/,'').trim(),lab=(l+' '+t).trim();
  return n?'<button class="chip" data-a="'+a+'" data-l="'+lab+'" data-p="'+n+'">'+(l?l+' ':'')+n.toLocaleString('en')+(t?' '+t:'')+' <i>+</i></button>':'<span class="chip off">'+x+'</span>'}).join('')}
const nav=document.getElementById('nav'),main=document.getElementById('menu');
D.forEach(([ic,t,n,items],i)=>{
 const b=document.createElement('button');b.textContent=ic+' '+t;b.onclick=()=>show(i);nav.appendChild(b);
 const s=document.createElement('section');s.className='sec';
 s.innerHTML='<h2>'+t+'</h2><p class="note">'+n+'</p><div class="grid">'+items.map(([a,p1,p2])=>
  '<div class="c rv" data-n="'+a+'"><div class="im'+(IMGS[PH[a]]?'':' np')+'">'+(IMGS[PH[a]]?'<img loading="lazy" alt="'+a+'" src="'+IMGS[PH[a]]+'">':'<span class="ic">'+ic+'</span>')+'</div><b>'+a+'</b><div class="p">'+chips(a,p1,p2)+'</div></div>').join('')+'</div>';
 main.appendChild(s);
});
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function show(i){
 nav.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('on',i==j));
 main.querySelectorAll('.sec').forEach((s,j)=>{s.classList.toggle('on',i==j);
  if(i==j)s.querySelectorAll('.c').forEach((c,k)=>{c.classList.remove('in');void c.offsetWidth;c.style.animationDelay=(k*45)+'ms';c.classList.add('in')})});
 nav.children[i].scrollIntoView({inline:'center',block:'nearest'});
}
show(0);
// 3D tilt on cards (mouse + touch)
main.addEventListener('pointermove',e=>{
 if(reduce)return;const c=e.target.closest('.c');
 main.querySelectorAll('.c').forEach(x=>{if(x!==c)x.style.transform=''});
 if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 c.style.transform='rotateY('+(x*22)+'deg) rotateX('+(-y*22)+'deg) scale(1.04)';
});
main.addEventListener('pointerleave',()=>main.querySelectorAll('.c').forEach(x=>x.style.transform=''));
main.addEventListener('pointerup',e=>{const c=e.target.closest('.c');if(c&&e.pointerType!=='mouse')setTimeout(()=>c.style.transform='',250)});
// 3D chicken bucket
(function(){
 if(!window.THREE)return;
 const cv=document.getElementById('gl'),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),S=new THREE.Scene(),C=new THREE.PerspectiveCamera(40,1,.1,50);
 C.position.set(0,1.2,8.5);
 S.add(new THREE.AmbientLight(0xffffff,.7));const L=new THREE.DirectionalLight(0xffffff,.9);L.position.set(3,5,5);S.add(L);
 const G=new THREE.Group(),M=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.5});
 const cx=document.createElement('canvas');cx.width=1024;cx.height=512;const g=cx.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,1024,512);g.fillStyle='#e31e24';g.fillRect(0,0,1024,60);g.fillRect(0,452,1024,60);
 [256,768].forEach(x=>{g.fillStyle='#111';g.beginPath();g.arc(x,256,170,0,7);g.fill();g.lineWidth=10;g.strokeStyle='#e31e24';g.stroke();g.textAlign='center';g.fillStyle='#e31e24';g.font='italic 800 120px Lalezar,Impact,sans-serif';g.fillText('Baik',x,275);g.fillStyle='#fff';g.font='800 46px Cairo,Arial,sans-serif';g.fillText('CHICKEN',x,340)});
 const tx=new THREE.CanvasTexture(cx);tx.anisotropy=8;
 const lg=new Image();lg.onload=()=>{[256,768].forEach(x=>{g.fillStyle='#fff';g.fillRect(x-200,60,400,392);const hh=380*lg.height/lg.width;g.drawImage(lg,x-190,256-hh/2,380,hh)});tx.needsUpdate=true};lg.src=document.querySelector('.logo').src;
 const body=new THREE.Mesh(new THREE.CylinderGeometry(1.3,.95,1.7,64),new THREE.MeshStandardMaterial({map:tx,roughness:.35}));G.add(body);
 
 const rim=new THREE.Mesh(new THREE.TorusGeometry(1.32,.07,12,48),M(0xffffff));rim.rotation.x=Math.PI/2;rim.position.y=.85;G.add(rim);
 for(let i=0;i<9;i++){const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.5+Math.random()*.2,1),M(0xc8741c));
  const a=i/9*Math.PI*2;p.position.set(Math.cos(a)*(i<6?.75:.2),1.15+(i<6?0:.4),Math.sin(a)*(i<6?.75:.2));p.scale.set(1,.8,1.1);p.rotation.set(i,i*2,0);G.add(p)}
 G.position.y=-1.2;S.add(G);
 const fl=[];for(let i=0;i<14;i++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.18+Math.random()*.15,0),M(i%2?0xf4b942:0xffffff));
  m.position.set((Math.random()-.5)*10,(Math.random()-.5)*5,(Math.random()-.5)*3-1);m.userData.s=Math.random()*2+.5;m.userData.h=m.position.clone();S.add(m);fl.push(m)}
 cv.addEventListener('pointerdown',()=>fl.forEach(m=>m.userData.v=new THREE.Vector3((Math.random()-.5)*.8,(Math.random()-.3)*.8,Math.random()*.5)));
 let mx=0;addEventListener('pointermove',e=>mx=(e.clientX/innerWidth-.5));
 function rs(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);R.setPixelRatio(Math.min(devicePixelRatio,2));C.aspect=w/h;C.updateProjectionMatrix();G.scale.setScalar(w<600?.85:1.1)}
 rs();addEventListener('resize',rs);
 let t=0;(function loop(){requestAnimationFrame(loop);if(reduce){R.render(S,C);return}
  t+=.016;G.rotation.y=t*.7+mx*1.5;G.rotation.z=Math.sin(t)*.08;G.position.y=-1.2+Math.sin(t*1.4)*.2;
  fl.forEach(m=>{const u=m.userData;if(u.v){m.position.add(u.v);u.v.multiplyScalar(.96);u.v.add(u.h.clone().sub(m.position).multiplyScalar(.004))}m.rotation.x+=.01*m.userData.s;m.rotation.y+=.014*m.userData.s;m.position.y+=Math.sin(t*m.userData.s)*.004});R.render(S,C)})();
})();

// ===== طلب + بحث + وضع =====
const WA='9647737772772';
const $=i=>document.getElementById(i);
let cart={},cur=0;try{cart=JSON.parse(localStorage.getItem('bc')||'{}')}catch(e){}
const fm=n=>n.toLocaleString('en')+' IQD';
function render(){let n=0,t=0,lines=[];
 $('ci').innerHTML=Object.keys(cart).map(k=>{const c=cart[k];n+=c.q;t+=c.q*c.p;lines.push('• '+c.q+' × '+c.n+(c.l?' ('+c.l+')':'')+' = '+fm(c.q*c.p));
  return '<div class="ln"><span>'+c.n+(c.l?' <small>('+c.l+')</small>':'')+'</span><span class="qt"><button data-k="'+k+'" data-d="-1">−</button><b>'+c.q+'</b><button data-k="'+k+'" data-d="1">+</button></span><em>'+fm(c.q*c.p)+'</em></div>'}).join('')||'<p class="note">السلة فاضية</p>';
 $('cn').textContent=n;$('ct').textContent=fm(t);$('cs').textContent=fm(t);$('cb').hidden=!n;
 const m='طلب جديد من موقع بيك جكن 🍗\n'+lines.join('\n')+'\nالمجموع: '+fm(t)+'\nالنوع: '+((document.querySelector('input[name=ty]:checked')||{}).value||'')+'\nالاسم: '+$('nm').value+'\nالعنوان/الهاتف: '+$('ad').value;
 $('wa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(m);
 try{localStorage.setItem('bc',JSON.stringify(cart))}catch(e){}}
main.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b||!b.dataset.p)return;
 const k=b.dataset.a+'|'+b.dataset.l;cart[k]=cart[k]||{n:b.dataset.a,l:b.dataset.l,p:+b.dataset.p,q:0};cart[k].q++;render();
 const c=$('cb');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),600)});
$('ci').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const c=cart[b.dataset.k];c.q+=+b.dataset.d;if(c.q<1)delete cart[b.dataset.k];render()});
$('cb').onclick=()=>$('sh').classList.add('open');
$('sh').onclick=e=>{if(e.target.id=='sh')$('sh').classList.remove('open')};
$('cl').onclick=()=>{cart={};render();$('sh').classList.remove('open')};
$('nm').oninput=$('ad').oninput=render;render();
const _show=show;show=function(i){cur=i;main.querySelectorAll('.c').forEach(c=>c.style.display='');_show(i)};
$('q').oninput=()=>{const v=$('q').value.trim();if(!v){show(cur);return}
 nav.querySelectorAll('button').forEach(b=>b.classList.remove('on'));
 main.querySelectorAll('.sec').forEach(s=>{let a=0;s.querySelectorAll('.c').forEach(c=>{const m=c.dataset.n.includes(v);c.style.display=m?'':'none';c.classList.add('in');if(m)a=1});s.classList.toggle('on',!!a)})};
$('th').onclick=()=>{const d=document.documentElement,dk=d.dataset.theme?d.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;d.dataset.theme=dk?'light':'dark'};
if(!reduce)addEventListener('scroll',()=>{const y=scrollY,i=document.querySelector('.hero .in');if(y<900){i.style.transform='translateY('+y*.3+'px) scale('+(1-y/2200)+')';$('gl').style.opacity=Math.max(0,1-y/650)}},{passive:true});

// ===== مستوى ثاني =====
(function(){
 const s0=$('s0'),lg=document.querySelector('.logo');s0.firstChild.src=lg.src;
 setTimeout(()=>s0.classList.add('out'),reduce?0:1500);setTimeout(()=>s0.remove(),reduce?100:2500);
 const all=[];D.forEach(([ic,t,n,it])=>it.forEach(x=>all.push(x)));
 const pick=["وجبة 8 قطع","ريزو سبايسي","برغر لحم دبل","مشكل","زنجر","ستربس 6 قطع","فاهيتا دجاج","ريزو عائلي"];
 const w=document.createElement('div');
 w.innerHTML='<h2 class="fh">اختيارنا لك</h2><div class="bsw" id="bsw">'+pick.map(n=>{const x=all.find(y=>y[0]==n);if(!x)return'';const [a,p1,p2]=x;
  return '<div class="bs"><div class="im"><img alt="'+a+'" src="'+IMGS[PH[a]]+'"></div><b>'+a+'</b><div class="p">'+chips(a,p1,p2)+'</div></div>'}).join('')+'</div>';
 w.id='fea';main.insertBefore(w,main.firstChild);
 const bw=$('bsw');
 function cf(){const r=bw.getBoundingClientRect(),c=r.left+r.width/2;bw.querySelectorAll('.bs').forEach(e=>{const b=e.getBoundingClientRect(),d=(b.left+b.width/2-c)/r.width;e.style.transform='rotateY('+(-d*38)+'deg) scale('+(1-Math.min(Math.abs(d),1)*.18)+')'})}
 bw.addEventListener('scroll',cf,{passive:true});addEventListener('load',cf);setTimeout(cf,300);
 const _q=$('q').oninput;$('q').oninput=()=>{w.style.display=$('q').value.trim()?'none':'';_q()};
 main.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b||!b.dataset.p)return;const cd=b.closest('.c,.bs'),im=cd&&cd.querySelector('img');if(!im)return;
  const r=im.getBoundingClientRect(),t=$('cb').getBoundingClientRect(),f=im.cloneNode();
  f.style.cssText='position:fixed;z-index:99;pointer-events:none;mix-blend-mode:normal;border-radius:50%;object-fit:cover;background:#fff;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';document.body.appendChild(f);
  f.animate([{transform:'none',opacity:1},{transform:'translate('+(t.left+t.width/2-r.left-r.width/2)+'px,'+(t.top-r.top)+'px) scale(.1)',opacity:.5}],{duration:700,easing:'cubic-bezier(.5,-.3,.7,.4)'}).onfinish=()=>f.remove()});
 main.addEventListener('pointermove',e=>{const c=e.target.closest('.c');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
 addEventListener('scroll',()=>{$('pg').style.transform='scaleX('+(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+')'},{passive:true});
 $('sh').addEventListener('change',render);
})();
