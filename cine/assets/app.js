const HTTP=location.protocol.startsWith('http');
const L=k=>ROOT+(k=='home'?'':k+'/')+(HTTP?'':'index.html');
document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute"><defs>
<symbol id="film" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4"/></symbol>
<symbol id="ticket" viewBox="0 0 24 24"><path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14 7v2m0 3v1m0 3v1"/></symbol>
<symbol id="popcorn" viewBox="0 0 24 24"><path d="M6 10l1.5 10h9L18 10"/><path d="M5 10a2.5 2.5 0 0 1 2.5-4 3 3 0 0 1 9 0A2.5 2.5 0 0 1 19 10z"/><path d="M10 12v6M14 12v6"/></symbol>
<symbol id="cup" viewBox="0 0 24 24"><path d="M6 8h12l-1.5 12h-9z"/><path d="M5 8h14M12 8V3h3"/></symbol>
<symbol id="candy" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 9h12M6 15h12M12 3v18"/></symbol>
<symbol id="drop" viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></symbol>
<symbol id="burger" viewBox="0 0 24 24"><path d="M4 11a8 6 0 0 1 16 0z"/><path d="M3 15h18M4 19h16a1 1 0 0 0 1-1v-1H3v1a1 1 0 0 0 1 1z"/></symbol>
<symbol id="icecream" viewBox="0 0 24 24"><path d="M7 11a5 5 0 0 1 10 0z"/><path d="M7 11l5 11 5-11"/></symbol>
<symbol id="gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v8h14v-8M12 8v12M12 8C10 4 7 5 8 8M12 8c2-4 5-3 4 0"/></symbol>
<symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
<symbol id="trash" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></symbol>
<symbol id="card" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></symbol>
<symbol id="cash" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></symbol>
<symbol id="pix" viewBox="0 0 24 24"><path d="M12 3l9 9-9 9-9-9z"/><path d="M8 12l4-4 4 4-4 4z"/></symbol>
<symbol id="check" viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></symbol>
<symbol id="back" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
<symbol id="arrow" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></symbol>
<symbol id="sliders" viewBox="0 0 24 24"><path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h10M18 18h2"/><circle cx="14" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></symbol>
<symbol id="home" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></symbol>
<symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
</defs></svg>`);
const PAL=['#00A83B','#FFD200','#0A4DFF','#EE1C25'],CL=c=>c=='Livre'?'L':c;
const $=s=>document.querySelector(s);
const I=n=>`<svg class="ic"><use href="#${n}"/></svg>`;
const R=v=>(+v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const seed=()=>({filmes:[
{id:1,titulo:'Noite Estrelada',preco:32,meia:16,classif:'12',dur:118,hue:260},
{id:2,titulo:'O Último Trem',preco:34,meia:17,classif:'14',dur:134,hue:10},
{id:3,titulo:'Aventuras no Mar',preco:30,meia:15,classif:'Livre',dur:96,hue:195},
{id:4,titulo:'Sombras da Cidade',preco:36,meia:18,classif:'16',dur:122,hue:330}],
itens:[{id:5,nome:'Pipoca Grande',preco:28,ic:'popcorn'},{id:6,nome:'Refrigerante',preco:12,ic:'cup'},{id:7,nome:'Chocolate',preco:9,ic:'candy'},{id:8,nome:'Combo Casal',preco:48,ic:'gift'},{id:9,nome:'Hambúrguer',preco:24,ic:'burger'},{id:10,nome:'Sorvete',preco:14,ic:'icecream'},{id:11,nome:'Água',preco:6,ic:'drop'}],
vendas:[],seq:20});
let db;try{db=JSON.parse(localStorage.getItem('cine2'))||seed()}catch(e){db=seed()}
const save=()=>{try{localStorage.setItem('cine2',JSON.stringify(db))}catch(e){}};
const PAYS={Dinheiro:'cash',Crédito:'card',Débito:'card',Pix:'pix'},ICS=['popcorn','cup','candy','drop','burger','icecream','gift'];
let V={sel:null,sess:'19:00',i:1,m:0,pay:'Crédito'},B={cart:{},pay:'Crédito'},tab='filmes',tmp={foto:null,ic:'popcorn'};

const MARK=`<svg class="mk" viewBox="0 0 36 36"><path d="M0 0H18A18 18 0 0 1 0 18z" fill="#00A83B"/><circle cx="27" cy="9" r="9" fill="#0A4DFF"/><path d="M0 36L9 18L18 36z" fill="#FFD200"/><path d="M36 18V36H18A18 18 0 0 1 36 18z" fill="#EE1C25"/></svg>`;
const tick=()=>{const d=new Date(),e=$('#ck');if(e)e.innerHTML=`<b>${d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</b><small><i></i>Caixa 01 · aberto</small>`};
function boot(p,fn){document.body.dataset.p=p;
 const lg=$('#lg');lg.href=L('home');lg.innerHTML=MARK+'<span>CINE<em>VENDAS</em></span>';
 $('#nav').innerHTML=[['home','home','Início'],['vendas','ticket','Ingressos'],['bomboniere','popcorn','Bomboniere'],['cadastro','sliders','Cadastro']].map(([k,i,t])=>`<a href="${L(k)}" class="${p==k?'on':''}">${I(i)}<span>${t}</span></a>`).join('');
 $('header').insertAdjacentHTML('beforeend','<div class="ck" id="ck"></div>');tick();setInterval(tick,15000);fn()}
const ph=f=>{if(f.foto)return `<img src="${f.foto}" alt="">`;
 const s=((f.hue|0)+(f.id|0)*7)%1000,bg=PAL[s%4],o=PAL.filter(c=>c!=bg),c1=o[s%3],c2=o[(s+1)%3],c3=o[(s+2)%3];
 const S=[`<circle cx="70" cy="100" r="68" fill="${c1}"/><path d="M200 300V150L92 300z" fill="${c2}"/><rect x="142" y="24" width="38" height="38" fill="${c3}"/>`,
 `<path d="M0 0H175A175 175 0 0 1 0 175z" fill="${c1}"/><rect x="104" y="180" width="96" height="120" fill="${c2}"/><circle cx="52" cy="240" r="42" fill="${c3}"/>`,
 `<path d="M0 300L100 118L200 300z" fill="${c1}"/><circle cx="100" cy="76" r="44" fill="${c2}"/><rect width="46" height="46" fill="${c3}"/>`,
 `<rect x="22" y="22" width="92" height="180" rx="46" fill="${c1}"/><path d="M200 300H90A110 110 0 0 1 200 190z" fill="${c2}"/><circle cx="52" cy="254" r="30" fill="${c3}"/>`][(s>>2)%4];
 return `<div class="ph"><svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice"><rect width="200" height="300" fill="${bg}"/>${S}</svg></div>`};
const sum=t=>{const v=db.vendas.filter(x=>x.tipo==t);return [v.length,v.reduce((a,x)=>a+x.total,0)]};
const kpi=t=>{const[n,s]=sum(t);return `<div class="kpi"><div><small>Vendas</small><b>${n}</b></div><div><small>Faturamento</small><b>${R(s)}</b></div></div>`};
const pays=(c,fn)=>`<div class="chips">${Object.keys(PAYS).map(p=>`<button class="${p==c?'on':''}" onclick="${fn}('${p}')">${I(PAYS[p])}${p}</button>`).join('')}</div>`;
const back=`<a class="back" href="${L('home')}">${I('back')} Início</a>`;

function recibo(tipo,l,total,pay){const n=db.seq++;db.vendas.push({n,tipo,total,pay});save();
 const ln=x=>{const i=x.lastIndexOf(' · ');return i<0?`<div class="rl"><span>${x}</span></div>`:`<div class="rl"><span>${x.slice(0,i)}</span><span>${x.slice(i+3)}</span></div>`};
 $('#md').innerHTML=`<div class="modal" onclick="this.remove()"><div class="rc" onclick="event.stopPropagation()"><div class="rh">CINE<em>VENDAS</em></div><div class="rs">Cupom não fiscal · ${tipo=='ingresso'?'Bilheteria':'Bomboniere'}</div>
 <div class="ok"><span>${I('check')}</span>Venda aprovada</div><div class="dsh"></div>
 <div class="rl mu"><span>Nº ${String(n).padStart(4,'0')}</span><span>${new Date().toLocaleString('pt-BR')}</span></div><div class="dsh"></div>
 ${l.map(ln).join('')}<div class="dsh"></div>
 <div class="rl tt"><span>TOTAL</span><span>${R(total)}</span></div><div class="rl"><span>Pagamento</span><span>${pay}</span></div>
 <div class="bar"></div><div class="rs">Dados fictícios</div>
 <div class="acts noprint"><button class="g" onclick="window.print()">Imprimir</button><button onclick="$('#md').innerHTML=''">Nova venda</button></div></div></div>`}
