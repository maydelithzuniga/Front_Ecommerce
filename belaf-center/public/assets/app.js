'use strict';
/* Imágenes recortadas de las capturas de Belaf Center (embebidas) */
const TC=3.75; /* tipo de cambio de ejemplo para la tienda en dólares [CONFIRMAR] */
const KEY='belaf_proto_v1';
const WIN_ID=Math.random().toString(36).slice(2);
const AGENTE='Carla';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const soles=n=>(VISTA==='cliente'&&ui&&ui.moneda==='USD')?'US$ '+(Number(n)/TC).toFixed(2):'S/ '+Number(n).toFixed(2);
const pad=(n,l=4)=>String(n).padStart(l,'0');
const fechaHora=ts=>new Date(ts).toLocaleString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
const hora=ts=>new Date(ts).toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'});
const fechaLarga=ts=>new Date(ts).toLocaleDateString('es-PE',{day:'numeric',month:'long',year:'numeric'});
const hace=ts=>{const m=Math.round((Date.now()-ts)/60000);if(m<1)return'hace un momento';if(m<60)return`hace ${m} min`;const h=Math.round(m/60);return h<24?`hace ${h} h`:`hace ${Math.round(h/24)} d`};

/* ---------- Ilustraciones provisionales ---------- */
/* ---------- Logo (redibujado del logo real) y Bela (imagen real) ---------- */
const MARCA_SVG=`<polygon points="46.2,33.8 33.8,46.2 16.2,46.2 3.8,33.8 3.8,16.2 16.2,3.8 33.8,3.8 46.2,16.2" fill="#19478E"/><polygon points="37.0,30.0 30.0,37.0 20.0,37.0 13.0,30.0 13.0,20.0 20.0,13.0 30.0,13.0 37.0,20.0" fill="#fff"/><circle cx="25" cy="25" r="7.5" fill="#E40808"/>`;
function logoImg(cls='logo'){return`<span class="${cls} svgwrap" role="img" aria-label="Belaf Center"><svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">${MARCA_SVG}</svg></span>`}
function logoH(cls='logo-h'){return`<span class="${cls} svgwrap" role="img" aria-label="Belaf Center"><svg viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">${MARCA_SVG}<text x="54" y="23.5" font-family="Montserrat,Arial,sans-serif" font-weight="900" font-size="19" fill="#19478E">BELAF</text><text x="54" y="43" font-family="Montserrat,Arial,sans-serif" font-weight="900" font-size="16.6" fill="#E40808">CENTER</text></svg></span>`}
function belaImg(cls){return`<img class="${cls}" src="${IMG.bela}" alt="Bela, asistente de Belaf Center">`}
const ICO={
  buscar:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  atras:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"/></svg>',
  x:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  correo:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  candado:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  alerta:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.5"/></svg>',
  llave:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/></svg>',
  carrito:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h2l2.5 11h11L21 7H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>'
};
function estrellas(r,n){return`<span class="estrellas" aria-label="5 de 5 estrellas">★★★★★${n?`<span>(${n} ${n===1?'valoración':'valoraciones'} de cliente${n===1?'':'s'})</span>`:''}</span>`}
function qrSVG(){let s=11,cells='';const r=rnd(42);const n=25;for(let y=0;y<n;y++)for(let x=0;x<n;x++){const f=(x<7&&y<7)||(x>17&&y<7)||(x<7&&y>17);if(f)continue;if(r()>.52)cells+=`<rect x="${x*8}" y="${y*8}" width="8" height="8"/>`}
  const fin=(x,y)=>`<rect x="${x}" y="${y}" width="56" height="56" fill="#3B0A57"/><rect x="${x+8}" y="${y+8}" width="40" height="40" fill="#fff"/><rect x="${x+16}" y="${y+16}" width="24" height="24" fill="#3B0A57"/>`;
  return `<svg viewBox="0 0 200 200" width="180" height="180" role="img" aria-label="Código QR de ejemplo"><rect width="200" height="200" fill="#fff"/><g fill="#3B0A57">${cells}</g>${fin(0,0)}${fin(144,0)}${fin(0,144)}</svg>`}

/* ---------- Catálogo (precios de ejemplo) ---------- */
const P={
  w11:{n:'Windows 11 Pro OEM',corto:'Windows 11 Pro',cat:'Windows',tipo:'windows',img:'w11',v:[{id:'a',n:'Licencia digital',p:60}],res:214,pop:1},
  w10:{n:'Windows 10 Pro OEM Licencia Original',corto:'Windows 10 Pro',cat:'Windows',tipo:'windows',img:'w10',v:[{id:'a',n:'Licencia digital',p:50}],res:187,pop:2},
  o21:{n:'Office 2021 Profesional Plus',corto:'Office 2021',cat:'Office y 365',tipo:'office',img:'o21',v:[{id:'a',n:'Licencia para 1 PC',p:110}],antes:200,oferta:true,res:165,pop:3},
  proj:{n:'Project profesional 2024',corto:'Project 2024',cat:'Licencias',tipo:'office',img:'proj',v:[{id:'a',n:'Licencia para 1 PC',p:240}],antes:300,oferta:true,res:1,pop:4},
  m365:{n:'Microsoft 365 Familia (ESD)',corto:'Microsoft 365',cat:'Office y 365',tipo:'office',thumb:'m365',v:[{id:'a',n:'Suscripción por 1 año',p:199}],res:41,pop:5,anual:true},
  av:{n:'Antivirus Total Security (1 año)',corto:'Antivirus',cat:'Antivirus',tipo:'antivirus',v:[{id:'a',n:'1 PC por 1 año',p:45}],res:58,pop:6,anual:true}
};
const PREF={w11:'W11P',w10:'W10P',o21:'O21P',proj:'PRJ24',m365:'M365F',av:'AVTS'};
/* Reglas de sugerencia [CONFIRMAR CON EL DUEÑO] — reglas fijas, no es IA */
const REGLA_COMPRA={o21:'av',w11:'o21',w10:'av',proj:'av',m365:'av',av:'o21'};
const REGLA_POST={o21:['av','w11'],w11:['o21','av'],w10:['av','o21'],proj:['o21','av'],m365:['av','w11'],av:['o21','w11']};
function razon(base,sug){const b=P[base].tipo,t=P[sug].tipo;
  if(t==='antivirus')return b==='office'?'Porque tu equipo con Office también necesita protección.':'Porque conviene proteger tu equipo desde que activas Windows.';
  if(t==='office'&&b==='windows')return'Porque con Windows listo, Office te permite trabajar desde el primer día.';
  if(t==='windows')return'Porque necesitas un Windows original para instalar y activar tu software.';
  if(base==='proj'&&sug==='o21')return'Porque Project trabaja junto con Word, Excel y el resto de Office.';
  return`Porque suele comprarse junto con ${P[base].corto}.`}
const PASOS={
  windows:['Abre Configuración › Sistema › Activación.','Toca “Cambiar clave de producto”.','Pega la clave de este correo y confirma.','Con internet activo, Windows confirma la activación.'],
  office:['[[Descarga el instalador desde el enlace oficial que te indicamos::CONFIRMAR enlace o método de descarga]].','Instala y abre Word.','Cuando lo pida, ingresa la clave de este correo (Archivo › Cuenta › Cambiar licencia).','Listo: Office queda activado en este equipo.'],
  antivirus:['[[Descarga el instalador desde el enlace oficial que te indicamos::CONFIRMAR enlace de descarga]].','Instálalo y elige “Activar con clave”.','Pega la clave de este correo.','La protección se activa por 1 año desde la activación.']
};
const CATS=['activación','licencia no recibida','garantía','pago','otro'];
const MOMS=['antes','durante','después'];

/* ---------- Estado ---------- */
function rnd(seed){let s=seed%2147483647||1;return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}}
const CH='BCDFGHJKMNPQRTVWXY2346789';
function genClave(r){return Array.from({length:4},()=>Array.from({length:5},()=>CH[Math.floor(r()*CH.length)]).join('')).join('-')}
function genInventario(){const r=rnd(20261029);const inv={};const cant={w11:5,w10:5,o21:5,proj:4,m365:2,av:5};
  for(const pid in P){inv[pid]=[];for(let i=1;i<=cant[pid];i++)inv[pid].push({codigo:`LIC-${PREF[pid]}-${pad(i)}`,clave:genClave(r),estado:'Disponible',correo:'',fecha:null})}return inv}
function ticketsDemo(){const ahora=Date.now();const m=min=>ahora-min*60000;
  return[
  {id:'BC-9001',demo:true,cat:'activación',mom:'después',estado:'Abierto',creado:m(42),act:m(38),derivado:true,derivadoEn:m(38),conResumen:true,asesorUnido:false,resueltoPor:null,resueltoEn:null,primeraResp:null,
   cliente:{nombre:'Luis R. (demo)',email:'luis.demo@correo-demo.pe'},pid:'o21',
   resumen:{producto:'Office 2021 Profesional Plus',problema:'Al activar aparece: “La clave no es válida”',intentado:['Pasos de activación de Office'],detalle:''},
   mensajes:[{de:'cliente',texto:'¿Cómo activo mi licencia?',t:m(42)},{de:'bela',texto:'Registré tu caso **#BC-9001**.',t:m(42)},{de:'bela',texto:'Te paso los pasos para activar Office…',t:m(41)},{de:'cliente',texto:'La clave no es válida',t:m(39)},{de:'bela',texto:'Te paso con un asesor. Tu caso es **#BC-9001**.',t:m(38)}]},
  {id:'BC-9002',demo:true,cat:'pago',mom:'durante',estado:'En curso',creado:m(95),act:m(70),derivado:true,derivadoEn:m(90),conResumen:true,asesorUnido:true,resueltoPor:null,resueltoEn:null,primeraResp:m(80),
   cliente:{nombre:'María T. (demo)',email:'maria.demo@correo-demo.pe'},pid:'w11',
   resumen:{producto:'Windows 11 Pro OEM',problema:'Pagó con Yape y no ve la confirmación',intentado:['Información de medios de pago'],detalle:''},
   mensajes:[{de:'cliente',texto:'Medios de pago',t:m(95)},{de:'bela',texto:'Registré tu caso **#BC-9002**.',t:m(95)},{de:'cliente',texto:'Hablar con un asesor',t:m(90)},{de:'sistema',tipo:'aviso',texto:'Ahora te atiende una persona',t:m(80)},{de:'asesor',texto:'Hola María, ya revisé tu pago, lo estoy validando.',t:m(80)}]},
  {id:'BC-9003',demo:true,cat:'licencia no recibida',mom:'después',estado:'Resuelto',creado:m(180),act:m(177),derivado:false,conResumen:null,asesorUnido:false,resueltoPor:'bela',resueltoEn:m(177),primeraResp:null,
   cliente:{nombre:'Jorge P. (demo)',email:'jorge.demo@correo-demo.pe'},pid:'w10',
   resumen:{producto:'Windows 10 Pro OEM Licencia Original',problema:'No le llegó la licencia al correo',intentado:['Revisar spam y Promociones','Reenvío de licencia al correo'],detalle:''},
   mensajes:[{de:'cliente',texto:'No me llegó mi licencia',t:m(180)},{de:'bela',texto:'Registré tu caso **#BC-9003**.',t:m(180)},{de:'bela',texto:'Listo, la reenvié a tu correo.',t:m(178)},{de:'cliente',texto:'Sí, ya me llegó',t:m(177)}]}
  ]}
function semillaIncidentes(){/* agregados ficticios de demostración */
  const r=rnd(777);const out=[];const pesoCat=[.34,.22,.12,.2,.12];const pesoMom=[.22,.28,.5];
  const pick=w=>{let x=r(),a=0;for(let i=0;i<w.length;i++){a+=w[i];if(x<a)return i}return w.length-1};
  for(let i=0;i<36;i++){const cat=CATS[pick(pesoCat)];const mom=MOMS[pick(pesoMom)];const deriv=cat==='garantía'||(cat==='activación'&&r()<.35)||r()<.12;
    const abierto=r()<.14;out.push({cat,mom,por:abierto?null:(deriv?'asesor':'bela'),derivado:deriv,min:abierto?null:(deriv?Math.round(18+r()*80):Math.round(1+r()*4)),abierto,sinResp:abierto&&deriv&&r()<.7})}
  return out}
function estadoInicial(){return{v:1,
  config:{flujo:'propuesto',resumen:true,recordatorio:'generico',sugerencias:true,marcas:true,esperaMin:30,asesorModo:'auto',canalT4:'whatsapp',vistaPublica:'cliente'},
  inventario:genInventario(),tickets:ticketsDemo(),seqTicket:1,pedidos:[],seqPedido:1001,correos:[],cliente:null,
  sugStats:{mostradas:0,agregadas:0,descartadas:0,cerradas:0,silenciadas:0,ignoradas:0},
  inv:{activa:null,tareas:{T1:nt(),T2:nt(),T3:nt(),T4:nt(),T5:nt()},eventos:[]}}}
function nt(){return{estado:'pendiente',ini:null,fin:null,toques:0}}
const SEMILLA=semillaIncidentes();

let chan=null;try{if('BroadcastChannel' in window)chan=new BroadcastChannel('belaf_proto_v1')}catch(e){chan=null}
let lsOK=true;
function cargar(){try{const raw=localStorage.getItem(KEY);if(raw){const o=JSON.parse(raw);if(o&&o.v===1)return o}}catch(e){lsOK=false}return estadoInicial()}
let S=cargar();
/* ---------- Sesión y roles ---------- */
const ADMIN_EMAIL='anahimaelymanosalvacerna@gmail.com';
const SES_KEY='belaf_sesion_v1';
let SESION=null;try{const r=localStorage.getItem(SES_KEY);if(r){const o=JSON.parse(r);if(o&&o.email&&(o.rol==='admin'||o.rol==='participante'))SESION=o}}catch(e){}
function esAdmin(){return !!SESION&&SESION.rol==='admin'}
let CFG=null,cfgDirty=false,cfgPush=null;
function normCfg(){if(S&&S.config&&!S.config.vistaPublica)S.config.vistaPublica='cliente'}
function fijarCFG(){if(CFG)S.config=JSON.parse(JSON.stringify(CFG));normCfg()}
normCfg();
function persistir(){normCfg();if(esAdmin()&&cfgDirty)CFG=JSON.parse(JSON.stringify(S.config));dbPush();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){lsOK=false}try{chan&&chan.postMessage({tipo:'estado',de:WIN_ID,estado:S})}catch(e){}}
function commit(){persistir();renderVivo()}
function syncDisponible(){return !!chan||lsOK}

/* UI local (no se sincroniza) */
function nuevaUI(){return{screen:'inicio',moneda:'PEN',menu:false,submenu:false,fichaIdx:0,agregando:false,pid:null,q:'',orden:'pop',cart:null,adicional:false,form:{},cupon:null,cuponMsg:'',metodo:'tarjeta',banco:'BCP',errores:{},pedidoId:null,mailId:null,waModo:'recordatorio',
  chat:{open:false,tickets:[],ctx:{mom:'antes',pid:null},n:-1,escribiendo:false},resumenOculto:{},
  sug:{oferta:{},decididas:{},mostradas:{},visibles:[],porque:{},nota:{}},globoTienda:true,renov:null,
  asesorSel:null,asesorFiltro:'Todos',negTab:'inv',demo:true,invAbierto:false}}
let ui=nuevaUI();
let VISTA='cliente';
let ultimoPingAsesor=0;

function silenciadas(){try{return sessionStorage.getItem('belaf_sug_off')==='1'}catch(e){return !!ui._silencio}}
function silenciar(){ui._silencio=true;try{sessionStorage.setItem('belaf_sug_off','1')}catch(e){}}

/* ---------- Registro de eventos (investigador) ---------- */
function condStr(){const c=S.config;return`${c.flujo}|${c.resumen?'con-resumen':'sin-resumen'}|${c.recordatorio}|sug-${c.sugerencias?'on':'off'}`}
function log(tipo,detalle='',extra={}){if(esAdmin()&&['condicion','tarea_inicio','tarea_fin'].includes(tipo))cfgDirty=true;const a=S.inv.activa;const t=a?S.inv.tareas[a]:null;
  S.inv.eventos.push({hora:new Date().toISOString(),tarea:a||'',seg:t&&t.ini?+((Date.now()-t.ini)/1000).toFixed(1):'',vista:VISTA,pantalla:VISTA==='cliente'?ui.screen:'',tipo,detalle,condicion:condStr(),...extra});
  if(S.inv.eventos.length>3000)S.inv.eventos.shift()}

function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('ver');clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove('ver'),2400)}
/* Texto con marcas: **negrita** y [[texto provisional::nota para el dueño]] */
function fmt(t){let h=esc(t);h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h=h.replace(/\[\[(.+?)::(.+?)\]\]/g,(m,a,b)=>`<mark class="conf" title="${b}">${a}<small>CONFIRMAR</small></mark>`);return h.replace(/\n/g,'<br>')}

/* ==========================================================
   VISTA CLIENTE
   ========================================================== */
function precioTexto(p){if(p.v.length>1)return`${soles(p.v[0].p)} – ${soles(p.v[p.v.length-1].p)}`;return soles(p.v[0].p)}
function ph(pid,cls=''){const p=P[pid];return`<div class="ph ph-${p.tipo} ${cls}" aria-hidden="true">${ICO.llave}<span>${esc(p.corto)}</span><small>Foto del producto</small></div>`}
function fotoHTML(pid,cls='foto'){const p=P[pid];return p.img?`<img class="${cls}" src="${IMG[p.img]}" alt="${esc(p.n)}">`:ph(pid,cls)}
function mini(pid){const p=P[pid];const src=p.img?IMG[p.img]:p.thumb?IMG[p.thumb]:null;return src?`<img class="mini" src="${src}" alt="">`:ph(pid,'mini')}
function cardHTML(k){const p=P[k];return`<button class="card" data-act="ver-prod" data-pid="${k}">${p.oferta?'<span class="oferta">¡Oferta!</span>':''}${fotoHTML(k)}<h3>${esc(p.n)}</h3><span class="cat">${p.cat}</span><span class="precio">${p.antes?`<s>${soles(p.antes)}</s>${soles(p.v[0].p)}`:precioTexto(p)}</span>${estrellas()}</button>`}
function variante(it){return P[it.pid].v.find(v=>v.id===it.vid)||P[it.pid].v[0]}
function totales(){const items=ui.cart?ui.cart.items:[];const sub=items.reduce((a,it)=>a+variante(it).p,0);const desc=ui.cupon?Math.round(sub*ui.cupon.pct)/100:0;return{sub,desc,total:Math.max(0,sub-desc)}}

function go(screen,extra={}){setTimeout(renderTabs,60);
  marcarIgnoradas();
  Object.assign(ui,{menu:false,submenu:false},extra);ui.screen=screen;log('navega',screen);persistir();
  renderPantalla();window.scrollTo(0,0);
}
const NAV_HOME=['NOVEDADES','NOSOTROS','CONTÁCTANOS','ACCEDER'];
const NAV_TIENDA=['LICENCIAS','COMPUTADORAS','JUGUETES','CUIDADO PERSONAL','ACCEDER'];
function renderTop(){
  const pv=['pago','gracias','espera'].includes(ui.screen);const top=$('.top');top.classList.toggle('top-pv',pv);
  if(pv){$('#top-in').innerHTML=`<button class="marca centro" data-act="home" aria-label="Ir al inicio">${logoH()}</button>`;return}
  const items=ui.screen==='inicio'?NAV_HOME:NAV_TIENDA;const total=ui.cart?totales().total:0;
  $('#top-in').innerHTML=`<button class="marca" data-act="home" aria-label="Ir al inicio">${logoH()}</button>
   <nav class="nav-d" aria-label="Menú principal"><div class="dd"><button class="nav-i" data-act="submenu" aria-expanded="${ui.submenu}">TIENDA ONLINE <span aria-hidden="true">▾</span></button>${ui.submenu?`<div class="dd-menu"><button data-act="moneda" data-m="PEN">EN SOLES</button><button data-act="moneda" data-m="USD">EN DÓLARES</button></div>`:''}</div>${items.map(i=>`<button class="nav-i" data-act="nav-na" data-n="${i}">${i}</button>`).join('')}</nav>
   <span class="top-sp"></span>
   <button class="ico" data-act="abrir-correo" aria-label="Mi correo (simulado)">${ICO.correo}</button>
   <button class="carro" data-act="ir-carrito" aria-label="Carrito: ${soles(total)}">${soles(total)} ${ICO.carrito}</button>
   <button class="ico hamb" data-act="menu" aria-label="Menú" aria-expanded="${ui.menu}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
   ${ui.menu?`<div class="menu-m"><span class="menu-l">TIENDA ONLINE</span><button class="sub" data-act="moneda" data-m="PEN">En soles</button><button class="sub" data-act="moneda" data-m="USD">En dólares</button>${items.map(i=>`<button data-act="nav-na" data-n="${i}">${i}</button>`).join('')}</div>`:''}`;
}
function renderPantalla(){
  renderTop();const m=$('#pantalla');ui.sug.visibles=[];
  const f={inicio:pInicio,tienda:pTienda,producto:pProducto,pago:pPago,gracias:pGracias,espera:pEspera,gmail:pGmail,correo:pCorreo,wa:pWA,renovar:pRenovar,renovado:pRenovado}[ui.screen]||pTienda;
  m.innerHTML=f();renderDock();
  if(ui.screen==='tienda'){const q=$('#q');q&&q.addEventListener('input',e=>{ui.q=e.target.value;$('#grid').innerHTML=gridHTML();$('#conteo').textContent=conteoTxt()})}
  if(ui.screen==='espera')tickEspera();
}
function conteoTxt(){if(!ui.q.trim())return'Mostrando 1–12 de 42 resultados';const n=listaProductos().length;return`${n} resultado${n===1?'':'s'} para “${ui.q.trim()}”`}
function listaProductos(){let l=Object.keys(P);const q=ui.q.trim().toLowerCase();if(q)l=l.filter(k=>P[k].n.toLowerCase().includes(q));
  const pmin=k=>P[k].v[0].p;if(ui.orden==='asc')l.sort((a,b)=>pmin(a)-pmin(b));else if(ui.orden==='desc')l.sort((a,b)=>pmin(b)-pmin(a));else l.sort((a,b)=>P[a].pop-P[b].pop);return l}
function gridHTML(){const l=listaProductos();if(!l.length)return`<p class="vacio" style="grid-column:1/-1">No encontramos productos con ese nombre. Prueba con “Windows” u “Office”.</p>`;return l.map(cardHTML).join('')}
const MAS=[{n:'Pulsera latido suave de 19cm',thumb:'pulsera'},{pid:'w10'},{pid:'m365'},{pid:'o21'}];
function pInicio(){return`<section class="hero"><img class="hero-img" src="${IMG.hero}" alt=""><div class="hero-tx"><h1>¡Más de lo que te imaginas, por menos de lo que piensas!</h1>
  <div class="hero-btns"><button class="btn btn-azul btn-chico" data-act="moneda" data-m="USD">TIENDA US$</button><button class="btn btn-azul btn-chico" data-act="moneda" data-m="PEN">TIENDA S/</button></div></div></section>
  <h2 class="sec-t">Más comprados</h2><div class="grid">${['w11','w10','o21','proj'].map(cardHTML).join('')}</div>`}
function pTienda(){const usd=ui.moneda==='USD';
  return`<div class="tienda-cab"><button class="btn btn-azul btn-chico" data-act="moneda" data-m="${usd?'PEN':'USD'}">${usd?'Tienda en Soles':'Tienda en Dólares'}</button><span class="miga">Inicio / Tienda online${usd?' (precios en US$)':''}</span></div>
  <div class="tienda-l"><aside class="mc" aria-label="Más comprados"><h2 class="mc-t">Más Comprados</h2><div class="mc-l">
   ${MAS.map(m=>{const p=m.pid?P[m.pid]:null;const src=p?(IMG[p.img||p.thumb]):IMG[m.thumb];return`<button class="mc-i" data-act="${p?'ver-prod':'nav-na'}" data-pid="${m.pid||''}" data-n="${esc(m.n||'')}"><img src="${src}" alt=""><span><span>${esc(p?p.n:m.n)}</span>${estrellas()}</span></button>`}).join('')}</div></aside>
  <div><div class="buscador-f">${ICO.buscar}<label class="sr" for="q">Buscar productos</label><input id="q" type="search" placeholder="Buscar productos..." value="${esc(ui.q)}"><button class="btn btn-azul" data-act="buscar">Buscar</button></div>
  <div class="barra"><span id="conteo">${conteoTxt()}</span><label class="sr" for="orden">Ordenar</label>
   <select id="orden" data-change="orden"><option value="pop"${ui.orden==='pop'?' selected':''}>Ordenar por popularidad</option><option value="asc"${ui.orden==='asc'?' selected':''}>Precio: menor a mayor</option><option value="desc"${ui.orden==='desc'?' selected':''}>Precio: mayor a menor</option></select></div>
  <div class="grid" id="grid">${gridHTML()}</div></div></div>`}
function pProducto(){
  const pid=ui.pid,p=P[pid];const it=ui.cart.items[ui.fichaIdx||0];const v=variante(it);const prop=S.config.flujo==='propuesto';
  const entrega=prop?'Entrega inmediata y automática por email':'La entrega es por email';
  const vin=p.tipo==='antivirus'?['Protección por 1 año','Para 1 PC',entrega,'Compatible con Windows 11 / Windows 10 (64 bits)']
   :pid==='m365'?['Suscripción por 1 año','Hasta 6 personas',entrega,'Compatible con Windows 11 / Windows 10 (64 bits)','Multilenguaje','Activación directa en Microsoft']
   :['Compra de pago único','Para 1 PC','Licencia reinstalable',entrega,'Compatible con Windows 11 / Windows 10 (64 bits)','Multilenguaje','Activación permanente, directo en Microsoft'];
  return`<button class="volver" data-act="inicio">${ICO.atras} Volver a la tienda</button>
  <div class="ficha"><div style="position:relative">${p.oferta?'<span class="oferta grande">¡Oferta!</span>':''}${fotoHTML(pid,'foto-g')}</div>
  <div><p class="miga-p">Inicio / ${p.tipo==='windows'?'Licencias':p.cat} / ${esc(p.n)}</p><h1>${esc(p.n)}</h1>${estrellas(5,p.res)}
   <div class="precio-g">${p.antes?`<s>${soles(p.antes)}</s>`:''}${soles(v.p)}</div>
   ${p.v.length>1?`<div class="seg-l">Elige tu opción</div><div class="opciones">${p.v.map(x=>`<button class="opcion" aria-pressed="${x.id===it.vid}" data-act="variante" data-vid="${x.id}">${esc(x.n)}<br><small>${soles(x.p)}</small></button>`).join('')}</div>`:''}
   <ul class="vinetas-p">${vin.map(x=>`<li>${x}</li>`).join('')}</ul>
   ${ui.cart.items.length>1?`<div class="alerta alerta-azul">${ICO.check}<span>En tu pedido: ${ui.cart.items.map(i=>esc(P[i.pid].corto)).join(', ')}</span></div>`:''}
   <button class="btn btn-azul btn-bloque mayus" data-act="comprar">Comprar</button>
   ${sugCompraHTML('ficha')}
  </div></div>`;
}
function campo(id,label,tipo='text',extra=''){const e=ui.errores[id];return`<div class="campo-p${e?' mal':''}"><label class="sr" for="f-${id}">${label}</label><input id="f-${id}" data-f="${id}" type="${tipo}" placeholder="${label}" value="${esc(ui.form[id]||'')}" ${extra}>${e?`<span class="err">${e}</span>`:''}</div>`}
function pPago(){
  const t=totales();const items=ui.cart.items;const igv=t.total-t.total/1.18;const m=ui.metodo;
  const radio=(id,cont)=>`<label class="metodo"><input type="radio" name="met" value="${id}" data-change="metodo"${m===id?' checked':''}>${cont}</label>`;
  return`<div class="pv">
  <div class="alerta alerta-amb" role="alert">${ICO.alerta}<span>No ingreses datos reales. Este es un prototipo y el pago es simulado.</span></div>
  <div class="pv-acc"><button class="btn btn-azul" data-act="adicionar">Adicionar Producto</button></div>
  <div class="pago-grid"><div>
   <h2 class="pv-t">Información del Cliente</h2>${campo('email','Email Address *','email','autocomplete="off"')}
   <h2 class="pv-t">Detalles de Facturación</h2>
   <div class="dos">${campo('nombres','Nombres *')}${campo('apellidos','Apellidos *')}</div>
   <div class="dos">${campo('doc','DNI / RUC *','text','inputmode="numeric" maxlength="11"')}${campo('cel','Celular *','tel','inputmode="tel" maxlength="9"')}</div>
  </div><div>
   <h2 class="pv-t">Tu Pedido</h2>
   <div class="pedido-t"><div class="pt-h"><span>Producto</span><span>Subtotal</span></div>
    ${items.map((it,i)=>`<div class="pt-r">${mini(it.pid)}<span class="pt-n">${esc(P[it.pid].n)}${P[it.pid].v.length>1?` <small>(${esc(variante(it).n)})</small>`:''} <b>× 1</b>${i>0&&!ui.adicional?` <button class="btn-texto" style="min-height:36px;padding:2px 4px" data-act="quitar-item" data-i="${i}" aria-label="Quitar ${esc(P[it.pid].n)}">Quitar</button>`:''}</span><span>${soles(variante(it).p)}</span></div>`).join('')}
    <div class="pt-r"><span>Subtotal</span><span>${soles(t.sub)}</span></div>
    ${t.desc?`<div class="pt-r"><span>Cupón ${esc(ui.cupon.code)}</span><span>− ${soles(t.desc)}</span></div>`:''}
    <div class="pt-r pt-total"><span>Total</span><span><b>${soles(t.total)}</b><small>(incluye ${soles(igv)} IGV)</small></span></div></div>
   ${sugCompraHTML('pago')}
   <div class="pagos" role="radiogroup" aria-label="Medio de pago">
    ${radio('tarjeta',`<span class="marcas-t" aria-label="Tarjeta de crédito o débito"><i class="v">VISA</i><i class="mc">Mastercard</i><i class="ax">AMEX</i><i class="dn">Diners</i></span>`)}
    ${m==='tarjeta'?`<div class="card-f">${campo('tarjeta','Número de tarjeta *','text','inputmode="numeric" autocomplete="off"')}${campo('titular','Nombre del titular *','text','autocomplete="off"')}<p class="hint">Complétalo como aparece en la tarjeta.</p><div class="dos">${campo('venc','Vence * (MM/AA)','text','autocomplete="off"')}${campo('cvv','Código de seguridad *','text','inputmode="numeric" autocomplete="off"')}</div></div>`:''}
    ${radio('yape',`<span>Yape</span><i class="lg lg-yape">yape</i>`)}
    ${radio('plin',`<span>Plin</span><i class="lg lg-plin">plin</i>`)}
    ${radio('banca',`<span>Banca Virtual y Agentes</span><span class="bks"><i class="lg sco">Scotiabank</i><i class="lg ibk">Interbank</i><i class="lg bcp">BCP</i></span>`)}
    ${m==='banca'?`<div class="seg" role="group" aria-label="Banco">${['BCP','Interbank','Scotiabank'].map(b=>`<button aria-pressed="${ui.banco===b}" data-act="banco" data-b="${b}">${b}</button>`).join('')}</div>`:''}
    ${m==='yape'||m==='plin'?`<p class="hint" style="margin:0">En este prototipo el pago con ${m==='yape'?'Yape':'Plin'} se simula al tocar “Pagar”.</p>`:''}
   </div>
   <div class="cupon"><label class="sr" for="f-cupon">Código de cupón</label><input id="f-cupon" data-f="cuponTxt" placeholder="Código de cupón" value="${esc(ui.form.cuponTxt||'')}"><button class="btn btn-azul" data-act="cupon">Aplicar</button></div>
   ${ui.cuponMsg?`<p style="font-size:13px;margin:6px 0 0;color:${ui.cupon?'var(--ok)':'var(--rojo-osc)'};font-weight:600">${ui.cuponMsg}</p>`:''}
   <p class="priv">Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra <a href="#" onclick="return false">política de privacidad</a>.</p>
   <p class="priv">Si estás fuera del Perú, debes comunicarte con la aduana de tu país y consultar los requisitos para el ingreso de nuestros productos.</p>
   <label class="check"><input type="checkbox" data-fc="valoracion"${ui.form.valoracion?' checked':''}><span>Marca aquí para recibir un email con un formulario de valoración de tu pedido.</span></label>
   <label class="check"><input type="checkbox" data-fc="historial"${ui.form.historial?' checked':''}><span>Acepto que Belaf Center use mi historial de compras para sugerirme productos (opcional).</span></label>
   <label class="check${ui.errores.terminos?' mal':''}"><input type="checkbox" data-fc="terminos"${ui.form.terminos?' checked':''}><span>He leído y estoy de acuerdo con los <a href="#" onclick="return false">términos y condiciones</a> de la web *</span></label>
   ${ui.errores.terminos?`<p class="err-p">${ui.errores.terminos}</p>`:''}
   <button class="btn btn-azul btn-bloque pagar" data-act="pagar">PAGAR ${soles(t.total)}</button>
  </div></div></div>`;
}
function pedido(){return S.pedidos.find(o=>o.id===ui.pedidoId)}
function tablaPedido(o){return`<div class="tabla-ped"><div><small>Número de pedido:</small><b>${o.id.replace('BC-P-','')}</b></div><div><small>Fecha:</small><b>${new Date(o.fecha).toLocaleDateString('es-PE')}</b></div><div><small>Total:</small><b>${soles(o.total)}</b></div><div><small>Método de pago:</small><b>${esc(o.metodo)}</b></div></div>`}
function pGracias(){const o=pedido();if(!o)return pTienda();
  return`<div class="ancho-chico"><div class="conf-hero"><div class="ok-ico">${ICO.check.replace('width="18" height="18"','width="34" height="34"')}</div><h1 class="pv-h1">¡Gracias! Pago confirmado</h1><p class="pv-sub">Tu pedido ha sido procesado</p></div>
  ${tablaPedido(o)}
  <div class="mensaje-correo">${ICO.correo}<span>Te enviamos tu licencia a tu correo<br><small style="font-weight:500">${esc(o.email)}</small></span></div>
  <button class="btn btn-azul btn-bloque" data-act="abrir-correo">Abrir mi correo</button>
  ${sugPostHTML(o)}
  <p style="text-align:center"><button class="btn-texto" data-act="inicio">Seguir comprando</button></p></div>`}
function pEspera(){const o=pedido();if(!o)return pTienda();const listo=o.estado==='Pagado';
  return`<div class="ancho-chico">
  ${listo?`<div class="conf-hero"><div class="ok-ico">${ICO.check}</div><h1 class="pv-h1">Pago verificado</h1><p class="pv-sub">Te enviamos tu licencia al correo ${esc(o.email)}.</p></div><button class="btn btn-azul btn-bloque" data-act="abrir-correo">Abrir mi correo</button>`:
  `<h1 class="pv-h1">Gracias</h1><p class="pv-sub">Su pedido ha sido recibido</p>${tablaPedido(o)}
   <p class="yape-tx">${fmt('Luego de hacer su pago por escaneo de código QR con su aplicación Yape, envíenos la captura de su pago al WhatsApp [[+51 9XX XXX XXX::CONFIRMAR número de WhatsApp de ventas]] para proceder con la entrega de su pedido.')}</p>
   <div class="qr-box">${qrSVG()}<div><b>Yape</b> · Belaf Center</div><div style="font-weight:800;font-size:18px">${soles(o.total)}</div></div>
   <button class="btn btn-wa btn-bloque" data-act="wa-captura">Enviar captura por WhatsApp</button>
   <div class="form-sec" style="margin-top:14px;text-align:center"><div style="font-size:13px;color:var(--gris);font-weight:600">Tiempo estimado hasta la entrega</div><div class="reloj" id="reloj">--:--</div><div style="font-size:13px;color:var(--gris)">Estado: en espera hasta confirmar el pago</div></div>
   <button class="btn btn-investigador btn-bloque" data-act="avanzar-tiempo">Avanzar tiempo (solo investigador)</button>
   <button class="btn btn-linea btn-bloque" style="margin-top:8px" data-act="abrir-correo">Abrir mi correo</button>`}
  </div>`}
function tickEspera(){const o=pedido();const el=$('#reloj');if(!o||!el||o.estado==='Pagado')return;
  const rest=Math.max(0,o.esperaHasta-Date.now());const mm=Math.floor(rest/60000),ss=Math.floor(rest%60000/1000);el.textContent=`${pad(mm,2)}:${pad(ss,2)}`;
  if(rest<=0){confirmarEspera(o,'tiempo cumplido');return}}
setInterval(()=>{if(VISTA==='cliente'&&ui.screen==='espera')tickEspera()},1000);

/* ----- Correo (Gmail simulado) ----- */
function asuntoMail(m){if(m.tipo==='recordatorio'){const d=datosRenov();return S.config.recordatorio==='personalizado'?`${d.nombre}, tu licencia de ${P[d.pid].corto} vence en 15 días`:'Aprovecha tu 15% de descuento en software y licencias'}return m.asunto}
function previewMail(m){if(m.tipo==='recordatorio'){const d=datosRenov();return S.config.recordatorio==='personalizado'?`Vence el ${d.venceCorta}. Renuévala hoy con ${d.pct}% de descuento por ser cliente`:'Solo por pocos días. ¡Haz clic aquí!'}return m.preview||''}
function pGmail(){const l=S.correos;
  return`<div class="app-sim-bar"><span>Simulación de tu bandeja de correo</span><button class="btn-texto" data-act="inicio">Volver a la tienda</button></div>
  <div class="gm"><div class="gm-top"><span class="gm-buscar">Buscar en el correo</span><span class="gm-av" aria-hidden="true">${esc((S.cliente?.nombres||'T')[0].toUpperCase())}</span></div>
  <div class="gm-cat">Principal</div>
  ${l.length?l.map(m=>`<button class="gm-item${m.leido?'':' nuevo'}" data-act="leer-mail" data-id="${m.id}"><span class="gm-av2">${logoImg()}</span><span class="gm-tx"><span class="gm-l1"><span>Belaf Center</span><span style="font-size:12px">${hora(m.fecha)}</span></span><span class="gm-l2">${esc(asuntoMail(m))}</span><span class="gm-l3">${esc(previewMail(m))}</span></span></button>`).join(''):`<div class="gm-vacio">Tu bandeja está vacía. Cuando compres, aquí llegará tu licencia.</div>`}
  </div>`}
function itemsMail(o){return`<div class="pedido-t" style="margin:12px 0">${o.items.map(i=>`<div class="pt-r">${mini(i.pid)}<span class="pt-n">${esc(i.n)} <b>× 1</b></span><span>${soles(i.p)}</span></div>`).join('')}<div class="pt-r pt-total"><span>Total</span><span><b>${soles(o.total)}</b><small>${esc(o.metodo)}</small></span></div></div>`}
function pCorreo(){const m=S.correos.find(x=>x.id===ui.mailId);if(!m)return pGmail();
  let cuerpo='';const o=S.pedidos.find(x=>x.id===m.pedidoId);
  if(m.tipo==='licencia'){const lics=m.licencias||[];
    cuerpo=`<h2>${m.nota==='reemplazo'?'Tu clave de reemplazo':m.nota==='reenvio'?'Reenvío de tu licencia':m.nota==='renovacion'?'¡Renovación lista!':'Gracias por tu pedido'}</h2>
    <p>Hola ${esc(m.nombre||'')},</p><p>${m.nota==='renovacion'?'Gracias por renovar con Belaf Center.':'Tu pago fue confirmado.'} Aquí ${lics.length>1?'están tus licencias':'está tu licencia'}, ${m.nota==='reenvio'?'nuevamente':'lista para activar'}:</p>
    ${lics.map(l=>l.clave?`<div class="lic"><dl><div><dt>Producto</dt><dd><b>${esc(l.n)}</b></dd></div><div><dt>Código de licencia</dt><dd style="font-family:var(--mono);font-weight:700">${l.codigo}</dd></div><div><dt>Clave de activación</dt><dd><div class="clave"><span>${l.clave}</span><button data-act="copiar-clave" data-clave="${l.clave}">Copiar</button></div></dd></div></dl></div>
      <b>Pasos de activación</b><ol class="pasos">${PASOS[P[l.pid].tipo].map(x=>`<li>${fmt(x)}</li>`).join('')}</ol>`:
      `<div class="alerta alerta-amb">${ICO.alerta}<span>${esc(l.n)}: estamos preparando tu clave. Un asesor te la enviará por este medio.</span></div>`).join('')}
    <button class="btn btn-azul btn-bloque" data-act="chat-desde-correo" data-pedido="${m.pedidoId||''}">¿Problemas para activar? Chatea con Bela</button>
    ${o?`<div class="mail-pie">Pedido ${o.id.replace('BC-P-','')} · Total ${soles(o.total)} · ${esc(o.metodo)}<br>Guarda este correo: es tu comprobante de licencia.</div>`:''}`}
  else if(m.tipo==='espera'){
    cuerpo=`<h2>Gracias por tu pedido</h2><p>Hola ${esc(o?o.nombre:'')},</p><p>Hemos recibido tu pedido y está actualmente en estado de espera hasta que podamos confirmar que se ha procesado el pago. Aquí tienes un recordatorio de lo que has pedido:</p>
    ${o?itemsMail(o):''}<p>${fmt('Luego de hacer su pago por escaneo de código QR con su aplicación Yape, envíenos la captura de su pago al WhatsApp [[+51 9XX XXX XXX::CONFIRMAR número de WhatsApp de ventas]] para proceder con la entrega de su pedido.')}</p>`}
  else if(m.tipo==='recordatorio'){cuerpo=bannerHTML('gmail')+`<div class="mail-pie">Recibes este correo porque compraste en Belaf Center. <a href="#" onclick="return false">Dejar de recibir recordatorios</a></div>`}
  return`<div class="app-sim-bar"><button class="btn-texto" data-act="abrir-correo">${ICO.atras} Bandeja</button><button class="btn-texto" data-act="inicio">Volver a la tienda</button></div>
  <div class="gm"><div class="mail"><div class="mail-asunto">${esc(asuntoMail(m))}</div>
   <div class="mail-de"><span class="gm-av2" style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:1px solid var(--linea);display:flex;align-items:center;justify-content:center">${logoImg()}</span><span><b>Belaf Center</b> &lt;ventas@belafcenter-demo.pe&gt;<br>para mí · ${fechaHora(m.fecha)}</span></div>
   <div class="mail-cuerpo">${m.tipo==='recordatorio'?'':`<div class="mail-cab">${logoH()}</div>`}<div class="mail-in">${cuerpo}</div></div></div></div>`}
/* ----- Recordatorio / WhatsApp ----- */
function datosRenov(){const o=S.pedidos.find(x=>!x.renovacion);const nombre=(o&&o.nombre)||'Ana';const pid=o?o.items[0].pid:'o21';
  const pers=S.config.recordatorio==='personalizado';const base=o?o.items[0].p:P[pid].v[0].p;const pct=pers?20:15;const vence=Date.now()+15*864e5;
  return{nombre,pid,producto:P[pid].n,base,pct,precio:Math.round(base*(100-pct))/100,vence:fechaLarga(vence),venceCorta:new Date(vence).toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit'})}}
function conf(texto,nota){return`<mark class="conf" title="${nota}">${texto}<small>CONFIRMAR</small></mark>`}
function podioHTML(items){return`<div class="podio">${items.map(x=>{const p=P[x.pid];return`<div class="pz"><div class="caja ${p.tipo==='windows'?'win':p.tipo==='office'?'off':'av'}">${x.oferta?'<span class="oferta chica">¡Oferta!</span>':''}<span>${esc(p.corto)}</span></div>
  <div class="cil c-${x.c}" style="min-height:${x.h||64}px"><b>${esc(p.corto)}</b><small>${p.cat}</small><span>${x.antes?`<s>${soles(x.antes)}</s> `:''}${soles(x.precio)}</span></div></div>`}).join('')}</div>`}
function rangoPromo(){const a=new Date(),b=new Date(Date.now()+2*864e5);const mes=d=>d.toLocaleDateString('es-PE',{month:'long'});
  return a.getMonth()===b.getMonth()?`Del <b>${a.getDate()}</b> al <b>${b.getDate()} de ${mes(b)}</b>`:`Del <b>${a.getDate()} de ${mes(a)}</b> al <b>${b.getDate()} de ${mes(b)}</b>`}
function bannerHTML(ctx){
  if(S.config.recordatorio!=='personalizado')return`<div class="bn"><div class="bn-logo">${logoH()}</div>
   <p class="bn-ap">Aprovecha tu</p><p class="bn-15">15%</p><p class="bn-dd">DE DESCUENTO</p><p class="bn-fecha">${rangoPromo()}</p>
   ${podioHTML([{pid:'w11',precio:60,c:'azul',h:58},{pid:'w10',precio:50,c:'gris',h:74},{pid:'o21',precio:110,antes:200,oferta:true,c:'rojo',h:58}])}
   <div class="bn-pie"><span>En software</span><span>En software y licencias</span></div>
   <button class="btn btn-rojo bn-cta" data-act="renovar" data-ctx="${ctx}">¡Haz Clic Aquí!</button></div>`;
  const d=datosRenov();
  return`<div class="bn"><div class="bn-logo">${logoH()}</div>
   <div class="bn-fila"><div class="bn-copy"><p class="bn-at">¡Atención, ${esc(d.nombre)}!</p><p class="bn-h">Tu licencia de ${esc(P[d.pid].corto)} está por vencer en 15 días</p>
    <p class="bn-tx">Vence el <b>${d.vence}</b>. Aprovecha para <b>renovarla</b> hoy con ${conf(d.pct+'% de descuento especial','CONFIRMAR porcentaje de descuento personalizado')} por ser cliente.</p></div>
    <div class="bn-bela">${belaImg('')}<div class="tablet">Tu licencia está por vencer en 15 días</div></div></div>
   ${podioHTML([{pid:d.pid,precio:d.precio,antes:d.base,oferta:true,c:P[d.pid].tipo==='office'?'rojo':'azul',h:66}])}
   <div class="bn-pie" style="justify-content:center"><span>Precio de renovación para ${esc(P[d.pid].n)}</span></div>
   <button class="btn btn-rojo bn-cta" data-act="renovar" data-ctx="${ctx}">Renovar Mi Licencia</button></div>`}
function pWA(){
  const top=`<div class="wa-top"><button class="volver-wa" data-act="${ui.waModo==='captura'?'volver-espera':'inicio'}" aria-label="Volver">${ICO.atras}</button><span class="wa-logo">${logoImg()}</span><span><b>Belaf Center ✓</b><small>Cuenta de empresa</small></span></div>`;
  if(ui.waModo==='captura'){const o=pedido();
    return`<div class="app-sim-bar"><span>Simulación de WhatsApp</span></div><div class="wa">${top}<div class="wa-chat"><div class="wa-dia">Hoy</div>
    <div class="wa-msg yo"><div class="ph ph-windows" style="width:180px;aspect-ratio:3/4;font-size:11px">📷<span>Captura de pago</span></div><p>Hola, envío la captura de mi pago del pedido ${o?o.id.replace('BC-P-',''):''}.</p><div class="wa-hora">${hora(Date.now())} ✓✓</div></div>
    <div class="wa-msg"><p>Gracias, recibimos tu captura. Verificaremos tu pago y te enviaremos tu pedido.</p><div class="wa-hora">${hora(Date.now())}</div></div>
    </div><div class="wa-input"><span>Mensaje</span></div></div><p style="text-align:center"><button class="btn btn-linea" data-act="volver-espera">Volver a mi pedido</button></p>`}
  const pers=S.config.recordatorio==='personalizado';const d=datosRenov();
  const txt=pers?`Hola ${esc(d.nombre)} 👋 Tu licencia de <b>${esc(d.producto)}</b> vence el ${d.vence}. Renuévala hoy con ${d.pct}% de descuento por ser cliente.`:`¡Aprovecha tu 15% de descuento en software y licencias! ${rangoPromo().replace(/<\/?b>/g,'')}.`;
  return`<div class="app-sim-bar"><span>Simulación de WhatsApp</span><button class="btn-texto" data-act="inicio">Ir a la tienda</button></div>
  <div class="wa">${top}<div class="wa-chat"><div class="wa-dia">Hoy</div><div class="wa-msg">${bannerHTML('whatsapp')}<p>${txt}</p><div class="wa-hora">${hora(Date.now())}</div></div></div><div class="wa-input"><span>Mensaje</span></div></div>`}
function infoRenov(){const d=datosRenov();const pers=S.config.recordatorio==='personalizado';const pid=pers?d.pid:(ui.renov?.pid||d.pid);
  const base=pers?d.base:P[pid].v[0].p;const pct=d.pct;return{pers,pid,base,pct,precio:Math.round(base*(100-pct))/100,nombre:d.nombre}}
function pRenovar(){const r=ui.renov||{metodo:'yape'};const x=infoRenov();
  return`<div class="ancho-chico"><button class="volver" data-act="volver-recordatorio">${ICO.atras} Volver</button>
  <h1 style="font-size:22px;font-weight:800;margin:6px 0 10px">Renueva tu licencia</h1>
  <div class="alerta alerta-amb">${ICO.alerta}<span>No ingreses datos reales. El pago es simulado.</span></div>
  ${x.pers?'':`<section class="form-sec"><h2>¿Qué licencia quieres renovar?</h2><div class="metodos">${Object.keys(P).map(k=>`<label class="metodo"><input type="radio" name="rprod" value="${k}" data-change="rprod"${x.pid===k?' checked':''}>${mini(k)}<span><b>${esc(P[k].n)}</b><small>${soles(Math.round(P[k].v[0].p*85)/100)} con 15% de descuento</small></span></label>`).join('')}</div></section>`}
  <div class="renov-card"><div class="pt-r" style="border:0">${mini(x.pid)}<span class="pt-n"><b>${esc(P[x.pid].n)}</b><br><small>Renovación${x.pers?` a nombre de ${esc(x.nombre)}`:''}</small></span></div>
   <div class="linea-res"><span>Precio regular</span><span>${soles(x.base)}</span></div><div class="linea-res"><span>Descuento (${x.pct}%)</span><span>− ${soles(x.base-x.precio)}</span></div><div class="linea-res total"><span>Total</span><span>${soles(x.precio)}</span></div></div>
  <section class="form-sec"><h2>Paga con</h2><div class="metodos">${[['yape','Yape'],['plin','Plin'],['tarjeta','Tarjeta'],['banca','Banca Virtual y Agentes']].map(([id,n])=>`<label class="metodo"><input type="radio" name="rmet" value="${id}" data-change="rmetodo"${r.metodo===id?' checked':''}><b>${n}</b></label>`).join('')}</div></section>
  <button class="btn btn-azul btn-bloque pagar" data-act="pagar-renov">${ICO.candado} Pagar renovación ${soles(x.precio)}</button></div>`}
function pRenovado(){const o=pedido();return`<div class="ancho-chico"><div class="conf-hero"><div class="ok-ico">${ICO.check}</div><h1 class="pv-h1">Renovación confirmada</h1><p class="pv-sub">Te enviamos tu nueva licencia de ${esc(o?o.items[0].n:'')} a tu correo.</p></div><button class="btn btn-azul btn-bloque" data-act="abrir-correo">Abrir mi correo</button><p style="text-align:center"><button class="btn-texto" data-act="inicio">Ir a la tienda</button></p></div>`}
/* ----- Dock / botón flotante de Bela ----- */
function renderDock(){const d=$('#dock');const grande=['inicio','tienda'].includes(ui.screen);
  d.classList.toggle('derecha',!grande);
  if(ui.chat.open||['gmail','correo','wa'].includes(ui.screen)){d.innerHTML='';return}
  if(grande){d.innerHTML=`<div class="dock-w">${belaImg('dock-bela')}${ui.globoTienda?`<div class="dock-globo">¡Hola! Soy Bela. ¿En qué puedo ayudarte hoy?<button class="x" data-act="cerrar-globo" aria-label="Cerrar saludo">${ICO.x}</button></div>`:''}</div>
    <button class="btn-pill" data-act="abrir-chat">CHATEA CON BELA</button>`;return}
  d.innerHTML=`<button class="fab" data-act="abrir-chat" aria-label="Chatea con Bela">${belaImg('bela-fab')}</button>`}
/* ----- Sugerencias de Bela (H5) ----- */
function sugActivas(){return S.config.sugerencias&&!silenciadas()}
function registrarMostrada(ctx,pid){const k=ctx+':'+pid;ui.sug.visibles.push({ctx,pid});if(!ui.sug.mostradas[k]){ui.sug.mostradas[k]=Date.now();S.sugStats.mostradas++;log('sugerencia_mostrada',`${ctx}: ${P[pid].n}`);setTimeout(persistir,0)}}
function globoSug(ctx,base,pids){
  const why=ui.sug.porque[ctx];const hist=ui.form.historial;
  return`<div class="globo-bela" data-sug="${ctx}">${belaImg('bela-mini')}<div class="globo" role="complementary" aria-label="Sugerencia de Bela">
   <div class="globo-tit"><span>Bela te sugiere</span><button class="x" data-act="sug" data-a="cierra" data-ctx="${ctx}" data-pids="${pids.join(',')}" aria-label="Cerrar sugerencia">${ICO.x}</button></div>
   ${pids.map((pid,i)=>{registrarMostrada(ctx,pid);const nota=ui.sug.nota[ctx+':'+pid];return`${i?'<hr class="sug-sep">':''}<div class="sug-prod">${mini(pid)}<div><b>${esc(P[pid].n)}</b><span class="precio" style="color:var(--azul);font-weight:800">${soles(P[pid].v[0].p)}</span></div></div>
    <p class="sug-por">${razon(base,pid)}</p>
    ${nota?`<p class="alerta alerta-ok" style="margin:0">${ICO.check}${nota}</p>`:`<div class="sug-btns"><button class="btn btn-azul" data-act="sug" data-a="agrega" data-ctx="${ctx}" data-pid="${pid}">Agregar a mi pedido</button><button class="btn btn-gris" data-act="sug" data-a="descarta" data-ctx="${ctx}" data-pid="${pid}">No me interesa</button></div>`}`}).join('')}
   <div class="sug-links"><button class="btn-texto" data-act="porque" data-ctx="${ctx}" aria-expanded="${!!why}">¿Por qué me muestran esto?</button><button class="btn-texto" data-act="sug" data-a="silencia" data-ctx="${ctx}" data-pids="${pids.join(',')}">No mostrar más sugerencias</button></div>
   ${why?`<div class="porque">Bela te sugiere productos según lo que estás comprando ahora${hist?' y tu historial de compras en Belaf Center, porque lo aceptaste':' (tu historial de compras solo se usa si lo aceptas al pagar)'}. Son reglas fijas definidas por la tienda; no es inteligencia artificial. Puedes desactivarlas cuando quieras.</div>`:''}
  </div></div>`}
function sugCompraHTML(ctx){if(!sugActivas()||ui.adicional||!ui.cart)return'';const base=ui.cart.items[0].pid;const s=REGLA_COMPRA[base];if(!s)return'';
  const dec=ui.sug.decididas[s];const enCarro=ui.cart.items.some(i=>i.pid===s);
  if(dec&&dec!=='agrega')return'';if(dec==='agrega'&&ctx!==ui.sug.agregadoEn)return'';if(enCarro&&dec!=='agrega')return'';
  if(!dec){ui.sug.oferta=ui.sug.oferta||{};const of=ui.sug.oferta[ctx];if(!of)return ofertaSug(ctx);if(of==='no')return''}
  return globoSug(ctx,base,[s])}
function ofertaSug(ctx){return`<div class="globo-bela" data-sug="${ctx}">${belaImg('bela-mini')}<div class="globo" role="complementary" aria-label="Bela pregunta"><div class="globo-tit"><span>Bela</span></div><p style="margin:4px 0 8px">¿Quieres que te dé una sugerencia de qué producto puede completar tu compra?</p><div class="sug-btns"><button class="btn btn-azul" data-act="sug-oferta" data-ctx="${ctx}" data-r="si">Sí</button><button class="btn btn-gris" data-act="sug-oferta" data-ctx="${ctx}" data-r="no">No</button></div></div></div>`}
function sugPostHTML(o){if(!sugActivas())return'';const base=o.items[0].pid;const ya=new Set(S.pedidos.flatMap(p=>p.items.map(i=>i.pid)));
  const l=(REGLA_POST[base]||[]).filter(p=>!ya.has(p)&&!['descarta','cierra'].includes(ui.sug.decididas[p])&&(!ui.sug.decididas['post:'+p]||ui.sug.nota['post:'+p])).slice(0,2);if(!l.length)return'';return globoSug('post',base,l)}
function accionSug(a,ctx,pid,pids){
  const lista=pid?[pid]:pids;
  lista.forEach(p=>{const t0=ui.sug.mostradas[ctx+':'+p];const ms=t0?Date.now()-t0:null;
    log('sugerencia_accion',`${a}: ${P[p].n} (${ctx})`,{accion:a,producto:p,contexto:ctx,ms_hasta_decidir:ms});
    ui.sug.visibles=ui.sug.visibles.filter(v=>!(v.ctx===ctx&&v.pid===p))});
  if(a==='silencia'){S.sugStats.silenciadas++;silenciar();toast('Listo, Bela no te mostrará más sugerencias en esta sesión.')}
  else if(a==='cierra'){S.sugStats.cerradas++;lista.forEach(p=>ui.sug.decididas[ctx==='post'?'post:'+p:p]='cierra')}
  else if(a==='descarta'){S.sugStats.descartadas++;ui.sug.decididas[ctx==='post'?'post:'+pid:pid]='descarta'}
  else if(a==='agrega'){S.sugStats.agregadas++;
    if(ctx==='post'){ui.sug.decididas['post:'+pid]='agrega';persistir();iniciarCompra(pid,true);return}
    ui.sug.decididas[pid]='agrega';ui.sug.agregadoEn=ctx;ui.cart.items.push({pid,vid:P[pid].v[0].id});
    ui.sug.nota[ctx+':'+pid]=`Agregado a tu pedido. Total: ${soles(totales().total)}`;toast(`Agregaste ${P[pid].corto} a tu pedido`)}
  persistir();renderPantalla();
}
function marcarIgnoradas(){if(VISTA!=='cliente')return;(ui.sug.visibles||[]).forEach(v=>{const k=v.ctx==='post'?'post:'+v.pid:v.pid;if(!ui.sug.decididas[k]){const t0=ui.sug.mostradas[v.ctx+':'+v.pid];S.sugStats.ignoradas++;
  log('sugerencia_accion',`ignora: ${P[v.pid].n} (${v.ctx})`,{accion:'ignora',producto:v.pid,contexto:v.ctx,ms_hasta_decidir:t0?Date.now()-t0:null})}});ui.sug.visibles=[]}

/* ----- Compra ----- */
function iniciarCompra(pid,adicional){
  if(ui.agregando&&ui.cart&&!adicional){ui.cart.items.push({pid,vid:P[pid].v[0].id});ui.fichaIdx=ui.cart.items.length-1;ui.agregando=false;log('adiciona_producto',pid);go('producto',{pid});return}
  ui.cart={items:[{pid,vid:P[pid].v[0].id}]};ui.fichaIdx=0;ui.adicional=adicional;ui.cupon=null;ui.cuponMsg='';ui.errores={};ui.form.terminos=false;
  if(adicional&&S.cliente){Object.assign(ui.form,S.cliente)}go(adicional?'pago':'producto',{pid})}
function validar(){const f=ui.form,e={};const t=s=>(s||'').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t(f.email)))e.email='Escribe un correo válido, por ejemplo nombre@correo.com';
  if(!t(f.nombres))e.nombres='Escribe tus nombres';if(!t(f.apellidos))e.apellidos='Escribe tus apellidos';
  if(!/^(\d{8}|\d{11})$/.test(t(f.doc)))e.doc='DNI de 8 dígitos o RUC de 11';
  if(!/^9\d{8}$/.test(t(f.cel)))e.cel='Celular de 9 dígitos que empiece con 9';
  if(ui.metodo==='tarjeta'){if(!t(f.titular))e.titular='Escribe el nombre del titular';if((t(f.tarjeta).replace(/\s/g,'')).length<12)e.tarjeta='Usa un número ficticio, ej. 4111 1111 1111 1111';if(!/^\d{2}\/\d{2}$/.test(t(f.venc)))e.venc='Formato MM/AA';if(!/^\d{3,4}$/.test(t(f.cvv)))e.cvv='3 o 4 dígitos'}
  if(!f.terminos)e.terminos='Debes aceptar los términos para continuar';return e}
function metodoLabel(m=ui.metodo){return{tarjeta:'Tarjeta',yape:'Yape',plin:'Plin',banca:'Banca virtual · '+ui.banco}[m]}
function tomarLicencia(pid,correo){const l=S.inventario[pid].find(x=>x.estado==='Disponible');if(!l)return null;l.estado='Entregada';l.correo=correo;l.fecha=Date.now();return{codigo:l.codigo,clave:l.clave}}
function nuevoMail(m){const mail={id:'M'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),fecha:Date.now(),leido:false,...m};S.correos.unshift(mail);return mail}
function entregarPedido(o,nota){o.licencias=o.items.map(it=>{const l=tomarLicencia(it.pid,o.email);return{pid:it.pid,n:it.n,codigo:l?.codigo||null,clave:l?.clave||null}});o.estado='Pagado';o.pagadoEn=Date.now();
  nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:o.licencias,nota,asunto:nota==='renovacion'?`Renovación lista: ${o.items[0].n}`:`¡Tu licencia está lista! ${o.items.map(i=>P[i.pid].corto).join(' + ')}`,preview:'Código, clave y pasos de activación'});
  log('licencia_entregada',`${o.id} → ${o.email}: ${o.licencias.map(l=>l.codigo||'SIN STOCK').join(', ')}`)}
function pagar(){
  ui.errores=validar();if(Object.keys(ui.errores).length){log('pago_error',Object.keys(ui.errores).join(','));renderPantalla();const p=$('.mal input, .mal');p&&p.scrollIntoView({block:'center'});toast('Revisa los campos marcados');return}
  const f=ui.form,t=totales();const o={id:'BC-P-'+S.seqPedido++,fecha:Date.now(),items:ui.cart.items.map(it=>({pid:it.pid,vid:it.vid,n:P[it.pid].n,v:variante(it).n,p:variante(it).p})),subtotal:t.sub,descuento:t.desc,total:t.total,metodo:metodoLabel(),
    email:f.email.trim(),nombre:f.nombres.trim(),apellidos:f.apellidos.trim(),doc:f.doc.trim(),cel:f.cel.trim(),historial:!!f.historial,estado:'',licencias:[],flujo:S.config.flujo};
  S.cliente={email:o.email,nombres:o.nombre,apellidos:o.apellidos,doc:o.doc,cel:o.cel,historial:o.historial};S.pedidos.unshift(o);
  log('pago_ok',`${o.id} ${soles(o.total)} ${o.metodo} flujo=${S.config.flujo}`);
  if(S.config.flujo==='propuesto'){entregarPedido(o);persistir();go('gracias',{pedidoId:o.id})}
  else{o.estado='En espera';o.moneda=ui.moneda;o.esperaHasta=Date.now()+S.config.esperaMin*60000;nuevoMail({tipo:'espera',pedidoId:o.id,asunto:'¡Hemos recibido tu pedido en Belaf Center!',preview:'Hemos recibido tu pedido, está en espera hasta confirmar el pago'});persistir();go('espera',{pedidoId:o.id})}
}
function confirmarEspera(o,como){if(o.estado==='Pagado')return;log('espera_fin',`${o.id} (${como}) espera real ${Math.round((Date.now()-o.fecha)/1000)} s`);entregarPedido(o);commit();if(VISTA==='cliente'&&ui.screen==='espera')renderPantalla()}

/* ==========================================================
   CHAT CON BELA (respuestas predefinidas, sin IA)
   ========================================================== */
const FAQ=[['faq_licencia','No me llegó mi licencia'],['faq_activar','¿Cómo activo mi licencia?'],['faq_garantia','Garantía y cambios'],['faq_pagos','Medios de pago'],['faq_factura','Factura con RUC']];
const CAT_DE={faq_licencia:'licencia no recibida',faq_activar:'activación',faq_garantia:'garantía',faq_pagos:'pago',faq_factura:'pago'};
function momentoActual(){if(ui.screen==='pago')return'durante';if(ui.screen==='espera')return pedido()?.estado!=='Pagado'?'durante':'después';if(['inicio','tienda','producto'].includes(ui.screen))return'antes';return'después'}
function abrirChat(ctx={}){ui.chat.open=true;ui.chat.ctx={mom:ctx.mom||momentoActual(),pid:ctx.pid||(['producto','pago'].includes(ui.screen)?ui.cart?.items[0].pid:pedido()?.items[0].pid)||S.pedidos[0]?.items[0].pid||null,pedidoId:ctx.pedidoId||ui.pedidoId||S.pedidos[0]?.id||null};
  log('chat_abierto',`momento=${ui.chat.ctx.mom}`);persistir();$('#chat').hidden=false;renderDock();ui.chat.n=-1;renderChat();setTimeout(()=>$('#chat-in').focus({preventScroll:true}),50)}
function cerrarChat(){ui.chat.open=false;$('#chat').hidden=true;log('chat_cerrado');persistir();renderDock()}
function ticketActual(){const id=ui.chat.tickets[ui.chat.tickets.length-1];return S.tickets.find(t=>t.id===id)}
function msg(t,de,texto,extra={}){t.mensajes.push({de,texto,t:Date.now(),...extra});t.act=Date.now()}
function nuevoTicket(cat){const id='BC-'+pad(S.seqTicket++);const c=ui.chat.ctx;const o=S.pedidos.find(x=>x.id===c.pedidoId);
  const t={id,cat,mom:c.mom,estado:'Abierto',creado:Date.now(),act:Date.now(),derivado:false,derivadoEn:null,conResumen:null,asesorUnido:false,resueltoPor:null,resueltoEn:null,primeraResp:null,
    cliente:{nombre:S.cliente?`${S.cliente.nombres} ${S.cliente.apellidos}`:'Cliente sin identificar',email:S.cliente?.email||''},pid:c.pid,pedidoId:o?o.id:null,
    resumen:{producto:o?o.items.map(i=>i.n).join(' + '):(c.pid?P[c.pid].n:'No indicado'),problema:'',intentado:[],detalle:''},mensajes:[],sim:null};
  S.tickets.unshift(t);ui.chat.tickets.push(id);log('ticket_creado',`${id} ${cat} (${c.mom})`);return t}
function asegurarTicket(cat,labelCliente){let t=ticketActual();
  if(!t||t.estado==='Resuelto'){t=nuevoTicket(cat||'otro');msg(t,'cliente',labelCliente);msg(t,'bela',`Registré tu caso **#${t.id}** para darle seguimiento.`)}
  else{msg(t,'cliente',labelCliente);if(cat&&t.cat==='otro')t.cat=cat}return t}
const OPC={si:{id:'ok_si',label:'Sí, me ayudó'},no:{id:'ok_no',label:'No, necesito más ayuda'},asesor:{id:'asesor',label:'Hablar con un asesor',rojo:true}};
function belaAct(id,label){
  const tAct=ticketActual();if(tAct&&tAct.derivado&&tAct.estado!=='Resuelto'){clienteAAsesor(label);return}
  log('chat_opcion',label);
  if(id==='asesor'){const t=asegurarTicket(null,label);derivar(t);return}
  const t=asegurarTicket(CAT_DE[id],label);responder(t,id);commit();
}
function responder(t,id){const o=S.pedidos.find(x=>x.id===t.pedidoId);const pr=t.pid?P[t.pid]:null;const R=t.resumen;
  const tieneIntento=s=>{if(!R.intentado.includes(s))R.intentado.push(s)};
  switch(id){
  case'faq_licencia':R.problema=R.problema||'No le llegó la licencia al correo';
    if(o&&o.estado==='Pagado'){msg(t,'bela',`Encontré tu pedido **${o.id}**. La licencia se envió a **${o.email}** el ${fechaHora(o.pagadoEn||o.fecha)}.\nRevisa también las carpetas Spam y Promociones. ¿Quieres que la reenvíe?`,{opciones:[{id:'reenviar',label:'Reenviar a mi correo'},OPC.si,OPC.asesor]});tieneIntento('Ubicar pedido y revisar spam/Promociones')}
    else if(o){msg(t,'bela',`Tu pedido **${o.id}** está en espera hasta confirmar el pago. Cuando se confirme, la licencia llega a **${o.email}**. [[El tiempo de verificación depende de que recibamos tu captura::CONFIRMAR plazo real de verificación]].`,{opciones:[OPC.si,OPC.asesor]});tieneIntento('Informar estado del pedido en espera')}
    else{msg(t,'bela','Las licencias se envían al correo que escribiste al pagar. Revisa tu bandeja de entrada, Spam y Promociones.\nSi no la encuentras, un asesor puede revisarlo con tu número de pedido.',{opciones:[OPC.si,OPC.asesor]});tieneIntento('Revisar spam y Promociones')}break;
  case'reenviar':if(o){nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:o.licencias,nota:'reenvio',asunto:`Reenvío de tu licencia · Pedido ${o.id}`,preview:'Te reenviamos tu código y clave'});tieneIntento('Reenvío de licencia al correo');log('licencia_reenviada',o.id);
    msg(t,'bela',`Listo, la reenvié a **${o.email}**. ¿Ya te llegó?`,{opciones:[{id:'ok_si',label:'Sí, ya me llegó'},OPC.no]})}break;
  case'faq_activar':R.problema=R.problema||`Necesita ayuda para activar ${pr?pr.n:'su licencia'}`;
    if(pr){responder(t,'act_'+pr.tipo);return}
    msg(t,'bela','¿Qué producto quieres activar?',{opciones:[{id:'act_windows',label:'Windows'},{id:'act_office',label:'Office'},{id:'act_antivirus',label:'Antivirus'}]});break;
  case'act_windows':case'act_office':case'act_antivirus':{const tipo=id.slice(4);tieneIntento(`Pasos de activación de ${tipo==='windows'?'Windows':tipo==='office'?'Office':'antivirus'}`);
    msg(t,'bela',`Sigue estos pasos:\n${PASOS[tipo].map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n¿Pudiste activarla?`,{opciones:[{id:'ok_si',label:'Sí, ya está activada'},{id:'err',label:'No, me sale un error'}]});break}
  case'err':msg(t,'bela','¿Qué mensaje te aparece?',{opciones:[{id:'err_inv',label:'La clave no es válida'},{id:'err_usada',label:'La clave ya fue usada'},{id:'err_otro',label:'Otro error'}]});break;
  case'err_inv':case'err_usada':case'err_otro':{const txt={err_inv:'“La clave no es válida”',err_usada:'“La clave ya fue usada”',err_otro:'otro error (no especificado)'}[id];
    R.problema=`Al activar ${pr?pr.n:'la licencia'} aparece: ${txt}`;t.cat='activación';
    msg(t,'bela',`Este caso necesita que una persona revise tu licencia. ${S.config.resumen?'Si te paso con un asesor, le comparto lo que ya intentamos para que no tengas que repetirlo.':''}`,{opciones:[OPC.asesor,{id:'faq_activar',label:'Ver los pasos otra vez'}]});break}
  case'faq_garantia':R.problema=R.problema||'Consulta sobre garantía y cambios';
    msg(t,'bela','[[Las condiciones de garantía y cambios las revisa nuestro equipo según tu caso::CONFIRMAR CON EL DUEÑO condiciones, plazo y casos de cambio o devolución]].\nSi tu licencia no activa o tienes un problema con ella, un asesor puede revisarlo.',{opciones:[OPC.si,OPC.asesor]});tieneIntento('Información general de garantía');break;
  case'faq_pagos':R.problema=R.problema||'Consulta sobre medios de pago';
    msg(t,'bela','Puedes pagar con:\n• Tarjeta de crédito o débito\n• Yape\n• Plin\n• Banca virtual: BCP, Interbank o Scotiabank\n[[Con tarjeta el pago se confirma al momento::CONFIRMAR tiempos de confirmación por medio de pago]].',{opciones:[OPC.si,OPC.asesor]});tieneIntento('Información de medios de pago');break;
  case'faq_factura':R.problema=R.problema||'Necesita factura con RUC';
    msg(t,'bela','Para factura, escribe tu RUC de 11 dígitos en el campo “DNI o RUC” al pagar.\n[[La factura llega a tu correo::CONFIRMAR CON EL DUEÑO si se emite automáticamente y en qué plazo]].\nSi ya compraste con DNI y necesitas factura, un asesor puede ayudarte.',{opciones:[OPC.si,OPC.asesor]});tieneIntento('Información de factura con RUC');break;
  case'ok_si':t.estado='Resuelto';t.resueltoPor=t.derivado?'asesor':'bela';t.resueltoEn=Date.now();log('ticket_resuelto_bela',t.id);
    msg(t,'bela',`¡Qué bueno! Dejo tu caso **#${t.id}** como resuelto. Si necesitas algo más, elige una opción de abajo o escríbeme.`);break;
  case'ok_no':msg(t,'bela','Entiendo. ¿Te paso con un asesor?',{opciones:[OPC.asesor]});break;
  }
}
function interpretar(txt){const s=txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  if(/asesor|humano|persona|agente|hablar con alguien/.test(s))return'asesor';
  if(/factura|ruc|boleta/.test(s))return'faq_factura';
  if(/(no|nunca).*(lleg|recib)|llega|llego|no tengo (la|mi) (licencia|clave)|reenvi/.test(s))return'faq_licencia';
  if(/activ|instal|clave.*(invalid|no sirve|no funciona)|error/.test(s))return'faq_activar';
  if(/garantia|cambio|devol|reembolso/.test(s))return'faq_garantia';
  if(/pago|pagar|yape|plin|tarjeta|bcp|interbank|scotiabank|transferencia/.test(s))return'faq_pagos';return null}
function textoCliente(txt){const tAct=ticketActual();
  if(tAct&&tAct.derivado&&tAct.estado!=='Resuelto'){clienteAAsesor(txt);return}
  log('chat_texto',txt);const id=interpretar(txt);
  if(id){if(id==='asesor'){const t=asegurarTicket(null,txt);derivar(t);return}const t=asegurarTicket(CAT_DE[id],txt);responder(t,id);commit();return}
  const t=asegurarTicket('otro',txt);if(!t.resumen.problema)t.resumen.problema=`Escribió: “${txt}”`;
  msg(t,'bela','No estoy segura de haber entendido tu consulta. ¿Quieres que te pase con un asesor? También puedes elegir una opción de abajo.',{opciones:[OPC.asesor]});log('bela_no_entiende',txt);commit()}
function asesorOnline(){return Date.now()-ultimoPingAsesor<6000}
function derivar(t){
  t.derivado=true;t.derivadoEn=Date.now();t.conResumen=S.config.resumen;t.estado='Abierto';
  if(!t.resumen.problema)t.resumen.problema='Pidió hablar con un asesor sin detallar el problema';
  msg(t,'bela',`Te paso con un asesor. ${t.conResumen?'Le comparto lo que ya conversamos para que no tengas que repetirlo. ':''}Tu caso es **#${t.id}**.\n[[Horario de atención de asesores::CONFIRMAR horario real y tiempo de respuesta]].`);
  msg(t,'sistema','Buscando un asesor disponible…',{tipo:'espera'});
  const sim=S.config.asesorModo==='simulado'||!asesorOnline()||!syncDisponible();t.sim=sim?{paso:'unir'}:null;
  log('derivacion',`${t.id} ${t.conResumen?'con':'sin'} resumen · asesor ${sim?'simulado':'real'}`);commit();
  if(sim)setTimeout(()=>simUnir(t.id),2500)}
function unirAsesor(t){if(t.asesorUnido)return;t.asesorUnido=true;t.estado='En curso';msg(t,'sistema','Ahora te atiende una persona',{tipo:'aviso'});if(t.conResumen)msg(t,'sistema','',{tipo:'resumen'})}
function clienteAAsesor(txt){const t=ticketActual();msg(t,'cliente',txt);log('chat_a_asesor',txt);commit();if(t.sim)simCliente(t)}
/* --- Asesor simulado (pre-escrito) --- */
function tk(id){return S.tickets.find(t=>t.id===id)}
function simEscribe(id,ms,fn){ui.chat.escribiendo=true;renderChat();setTimeout(()=>{ui.chat.escribiendo=false;const t=tk(id);if(t){fn(t);commit()}},ms)}
function simUnir(id){const t=tk(id);if(!t||t.asesorUnido)return;unirAsesor(t);t.primeraResp=Date.now();commit();
  simEscribe(id,1600,t=>{const nom=(S.cliente?.nombres||'').split(' ')[0];
    if(t.conResumen){msg(t,'asesor',`Hola${nom?' '+nom:''}, soy ${AGENTE} de Belaf Center. Ya leí lo que conversaste con Bela: ${t.resumen.problema.charAt(0).toLowerCase()+t.resumen.problema.slice(1)}. No necesitas repetirme nada; reviso tu caso #${t.id} ahora mismo.`);t.sim.paso='resolver';setTimeout(()=>simEscribe(id,2600,simResolver),400)}
    else{msg(t,'asesor',`Hola, soy ${AGENTE} de Belaf Center. Veo que solicitas ayuda. ¿Me cuentas qué problema tienes y qué producto compraste?`);t.sim.paso='problema'}})}
function simCliente(t){if(t.sim.paso==='problema'){t.sim.paso='~';simEscribe(t.id,1800,t=>{msg(t,'asesor','Gracias. ¿Me indicas tu número de pedido o el correo con el que compraste?');t.sim.paso='pedido'})}
  else if(t.sim.paso==='pedido'){t.sim.paso='~';simEscribe(t.id,2200,simResolver)}
  else if(t.sim.paso==='fin'||t.sim.paso==='opciones'){t.sim.paso='~';simEscribe(t.id,1500,t=>{msg(t,'asesor','Gracias por escribir. Lo reviso y te respondo por aquí.');t.sim.paso='fin'})}}
function itemsReemplazo(o,t){const m=o.items.filter(i=>i.pid===t.pid);return m.length?m:o.items.slice(0,1)}
function simResolver(t){const o=S.pedidos.find(x=>x.id===t.pedidoId)||S.pedidos[0];
  if((t.cat==='activación'||t.cat==='licencia no recibida')&&o){
    if(t.cat==='activación'){const lics=itemsReemplazo(o,t).map(it=>{const l=tomarLicencia(it.pid,o.email);return{pid:it.pid,n:it.n,codigo:l?.codigo||null,clave:l?.clave||null}});nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:lics,nota:'reemplazo',asunto:`Clave de reemplazo · Pedido ${o.id}`,preview:'Te enviamos una nueva clave'});
      msg(t,'asesor',`Revisé tu licencia y te envié una clave de reemplazo a ${o.email}. Pruébala con los mismos pasos y me cuentas.`,{opciones:[{id:'sim_ok',label:'Sí, ya funciona'},{id:'sim_no',label:'Todavía no'}]})}
    else{nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:o.licencias,nota:'reenvio',asunto:`Reenvío de tu licencia · Pedido ${o.id}`,preview:'Te reenviamos tu código y clave'});
      msg(t,'asesor',`Listo, te reenvié la licencia a ${o.email}. Revisa también Spam y Promociones. ¿Te llegó?`,{opciones:[{id:'sim_ok',label:'Sí, ya me llegó'},{id:'sim_no',label:'Todavía no'}]})}}
  else msg(t,'asesor',`Gracias por esperar. Revisé tu caso #${t.id}: [[respuesta del asesor según la política de la tienda::CONFIRMAR respuesta estándar para este tipo de caso]]. ¿Te ayudo con algo más?`,{opciones:[{id:'sim_ok',label:'Eso es todo, gracias'},{id:'sim_no',label:'Tengo otra duda'}]});
  t.sim.paso='opciones'}
function simOpcion(id,label){const t=ticketActual();msg(t,'cliente',label);log('chat_opcion',label);
  if(id==='sim_ok'){t.estado='Resuelto';t.resueltoPor='asesor';t.resueltoEn=Date.now();t.sim&&(t.sim.paso='cerrado');commit();
    setTimeout(()=>simEscribe(t.id,1200,t=>{msg(t,'asesor',`¡Perfecto! Cierro tu caso #${t.id} como resuelto. Gracias por tu paciencia.`);log('ticket_resuelto_asesor',t.id)}),200)}
  else{commit();if(t.sim){t.sim.paso='~';simEscribe(t.id,1500,t=>{msg(t,'asesor','Entiendo. Cuéntame qué ves en pantalla y lo revisamos juntos.');t.sim.paso='fin'})}}}

function renderChat(){if(VISTA!=='cliente')return;
  const t=ticketActual();const conPersona=t&&t.derivado&&t.asesorUnido&&!(t.estado==='Resuelto'&&!t.sim&&false);
  const head=$('#chat-head');
  head.innerHTML=conPersona&&t.estado!=='Resuelto'?`<span class="av persona" aria-hidden="true">${AGENTE[0]}</span><span><b>${AGENTE} <span class="tag">Persona</span></b><small>Asesora de Belaf Center</small></span><button class="cerrar" data-act="cerrar-chat" aria-label="Cerrar chat">${ICO.x}</button>`
    :`<span class="av">${belaImg('bela-av')}</span><span><b>Bela <span class="tag">Asistente automático</span></b><small>Respuestas predefinidas de Belaf Center</small></span><button class="cerrar" data-act="cerrar-chat" aria-label="Cerrar chat">${ICO.x}</button>`;
  const msgs=[];msgs.push({de:'bela',texto:'¡Hola! Soy Bela, la asistente automática de Belaf Center. ¿En qué puedo ayudarte?',t:null});
  ui.chat.tickets.forEach(id=>{const tt=tk(id);if(tt)tt.mensajes.forEach(m=>msgs.push({...m,_t:tt}))});
  let html='';const ult=msgs.length-1;
  msgs.forEach((m,i)=>{
    if(m.tipo==='espera'){if(!m._t.asesorUnido)html+=`<div class="aviso-chat">${esc(m.texto)}</div>`;return}
    if(m.tipo==='aviso'){html+=`<div class="aviso-persona" role="status">${esc(m.texto)}<br><small style="font-weight:600">${AGENTE}, asesora de Belaf Center</small></div>`;return}
    if(m.tipo==='resumen'){const tt=m._t,R=tt.resumen,oc=ui.resumenOculto[tt.id];
      html+=`<div class="resumen-card"><div class="rc-top"><span>Bela compartió este resumen con el asesor</span><button class="btn-texto" style="min-height:40px;padding:4px" data-act="toggle-resumen" data-id="${tt.id}" aria-expanded="${!oc}">${oc?'Ver':'Ocultar'}</button></div>
      ${oc?'':`<dl><dt>Producto</dt><dd>${esc(R.producto)}</dd><dt>Problema</dt><dd>${esc(R.problema)}</dd><dt>Qué se intentó</dt><dd>${R.intentado.length?esc(R.intentado.join('; ')):'Aún nada'}</dd><dt>N.º de caso</dt><dd>#${tt.id}</dd></dl>`}</div>`;return}
    if(m.de==='sistema'){html+=`<div class="aviso-chat">${esc(m.texto)}</div>`;return}
    const quien=m.de==='bela'?'Bela':m.de==='asesor'?`${AGENTE} · Asesora`:'';
    html+=`<div class="msg ${m.de}">${quien?`<span class="quien">${quien}</span>`:''}${fmt(m.texto)}${m.t?`<span class="msg-hora">${hora(m.t)}</span>`:''}</div>`;
    if(m.opciones&&i===ult)html+=`<div class="chips">${m.opciones.map(o=>`<button class="chip${o.rojo?' rojo':''}" data-act="chip" data-id="${o.id}" data-label="${esc(o.label)}">${esc(o.label)}</button>`).join('')}</div>`});
  if(ui.chat.escribiendo)html+=`<div class="escribiendo">${AGENTE} está escribiendo…</div>`;
  const log_=$('#chat-log');log_.innerHTML=html;
  if(msgs.length!==ui.chat.n||ui.chat.escribiendo){log_.scrollTop=log_.scrollHeight;ui.chat.n=msgs.length}
  const derivadoActivo=t&&t.derivado&&t.estado!=='Resuelto';
  $('#chat-faq').innerHTML=derivadoActivo?'':FAQ.map(([id,l])=>`<button class="chip" data-act="chip" data-id="${id}" data-label="${esc(l)}">${l}</button>`).join('')+`<button class="chip rojo" data-act="chip" data-id="asesor" data-label="Hablar con un asesor">Hablar con un asesor</button>`;
  $('#chat-in').placeholder=derivadoActivo?`Escríbele a ${AGENTE}…`:'Escribe tu consulta…';
}
$('#chat-form').addEventListener('submit',e=>{e.preventDefault();const i=$('#chat-in');const v=i.value.trim();if(!v)return;i.value='';textoCliente(v)});

/* ==========================================================
   VISTA ASESOR
   ========================================================== */
function renderAsesor(completo){const root=$('#vista-asesor');
  if(completo||!$('#as-lista')){root.innerHTML=`<div class="vista-cab"><div class="in">${logoImg()}<div><h1>Bandeja de tickets</h1><small>Vista asesor · ${AGENTE}</small></div><span class="top-sp" style="flex:1"></span><span class="pill pill-gris" id="as-sync"></span></div></div>
   <div class="as-wrap"><div class="as-lista"><div class="as-filtros" id="as-filtros"></div><div id="as-lista"></div></div><div class="as-det" id="as-det"></div></div>`;ui._detId=null}
  const est=['Todos','Abierto','En curso','Resuelto'];const cnt=e=>S.tickets.filter(t=>e==='Todos'||t.estado===e).length;
  $('#as-sync').textContent=syncDisponible()?'Sincronizado en vivo':'Modo simulado (sin sincronización)';
  $('#as-filtros').innerHTML=est.map(e=>`<button aria-pressed="${ui.asesorFiltro===e}" data-act="as-filtro" data-e="${e}">${e} (${cnt(e)})</button>`).join('');
  const l=S.tickets.filter(t=>ui.asesorFiltro==='Todos'||t.estado===ui.asesorFiltro).sort((a,b)=>b.act-a.act);
  $('#as-lista').innerHTML=l.length?l.map(t=>`<button class="as-item" data-act="as-sel" data-id="${t.id}" aria-current="${ui.asesorSel===t.id}"><span class="l1"><b>#${t.id}</b><span class="pill st-${t.estado.replace(' ','-')}">${t.estado}</span></span>
    <span class="l2">${esc(t.cat)} · ${esc(t.mom)} de la compra${t.demo?' · demo':''}</span><span class="l1"><span>${t.derivado?'<span class="pill pill-rojo">Derivado por Bela</span>':'<span class="pill pill-azul">Atendido por Bela</span>'} ${t.derivado&&!t.asesorUnido&&t.estado!=='Resuelto'?'<span class="pill st-Abierto">Sin respuesta</span>':''}</span><small style="color:var(--gris)">${hace(t.act)}</small></span></button>`).join(''):'<p class="vacio">No hay tickets en este estado.</p>';
  renderAsesorDet()}
function renderAsesorDet(){const det=$('#as-det');const t=tk(ui.asesorSel);
  if(!t){det.innerHTML=`<div class="vacio">Elige un ticket de la bandeja. Los casos que Bela deriva aparecen aquí al instante.</div>`;ui._detId=null;return}
  if(ui._detId!==t.id){det.innerHTML=`<div id="as-det-in"></div><div class="as-panel as-reply"><h3 style="font-size:14px;margin-bottom:8px">Responder al cliente</h3>
    <div class="rapidas">${['Hola, soy '+AGENTE+' de Belaf Center. Ya revisé tu caso y te ayudo ahora mismo.','¿Me indicas tu número de pedido o el correo con el que compraste?','Te reenvié la licencia a tu correo. Revisa también Spam y Promociones.','¿Me envías una captura del mensaje de error?','Listo, tu caso queda resuelto. ¡Gracias por tu paciencia!'].map(r=>`<button data-act="as-rapida" data-t="${esc(r)}">${esc(r)}</button>`).join('')}</div>
    <label class="sr" for="as-txt">Mensaje</label><textarea id="as-txt" placeholder="Escribe tu respuesta…"></textarea>
    <div class="as-acc"><button class="btn btn-azul" data-act="as-enviar">Enviar</button><button class="btn btn-linea" data-act="as-reenviar">Reenviar licencia</button><button class="btn btn-linea" data-act="as-reemplazo">Enviar clave de reemplazo</button></div></div>`;ui._detId=t.id}
  const R=t.resumen;const sinResumen=t.derivado&&t.conResumen===false;
  const hist=t.mensajes.filter(m=>m.tipo!=='resumen'&&m.tipo!=='espera').filter(m=>!sinResumen||m.t>=t.derivadoEn||m.de==='asesor');
  $('#as-det-in').innerHTML=`<div class="as-panel"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><h2 style="font-size:18px">Caso #${t.id} ${t.demo?'<span class="pill pill-gris">demo</span>':''}</h2>
   <div class="estados" role="group" aria-label="Estado">${['Abierto','En curso','Resuelto'].map(e=>`<button aria-pressed="${t.estado===e}" data-act="as-estado" data-e="${e}">${e}</button>`).join('')}</div></div>
   <dl class="as-meta"><div><dt>Cliente</dt><dd>${esc(t.cliente.nombre)}</dd></div><div><dt>Correo</dt><dd>${esc(t.cliente.email||'—')}</dd></div><div><dt>Categoría</dt><dd>${esc(t.cat)}</dd></div><div><dt>Momento</dt><dd>${esc(t.mom)} de la compra</dd></div><div><dt>Creado</dt><dd>${fechaHora(t.creado)}</dd></div><div><dt>Atención</dt><dd>${t.derivado?'Derivado por Bela':'Solo Bela'}</dd></div></dl></div>
  ${t.derivado?(sinResumen?`<div class="as-panel resumen-sin">Cliente solicita ayuda</div>`:`<div class="as-panel resumen-bela"><h3>Resumen <span class="pill pill-azul">Generado por Bela</span></h3><dl><dt>Producto</dt><dd>${esc(R.producto)}</dd><dt>Problema</dt><dd>${esc(R.problema)}</dd><dt>Qué se intentó</dt><dd>${R.intentado.length?esc(R.intentado.join('; ')):'Aún nada'}</dd><dt>N.º de caso</dt><dd>#${t.id}${t.pedidoId?' · Pedido '+t.pedidoId:''}</dd></dl></div>`):''}
  <div class="as-panel"><h3 style="font-size:14px;margin-bottom:8px">${sinResumen?'Mensajes desde la derivación':'Historial completo'}</h3><div class="hist" id="as-hist">${hist.map(m=>m.de==='sistema'?`<div class="aviso-chat">${esc(m.texto)}</div>`:`<div class="msg ${m.de}" style="${m.de==='cliente'?'':''}"><span class="quien" style="${m.de==='cliente'?'color:#DCE6FF':''}">${m.de==='bela'?'Bela (automático)':m.de==='asesor'?AGENTE:'Cliente'}</span>${fmt(m.texto)}${m.opciones?`<br><small style="opacity:.75">Opciones mostradas: ${m.opciones.map(o=>esc(o.label)).join(' / ')}</small>`:''}<span class="msg-hora">${hora(m.t)}</span></div>`).join('')||'<p class="vacio">Aún no hay mensajes.</p>'}</div></div>`;
  const h=$('#as-hist');if(h)h.scrollTop=h.scrollHeight}
function asesorEnvia(txt){const t=tk(ui.asesorSel);if(!t||!txt.trim())return;
  if(!t.derivado){t.derivado=true;t.derivadoEn=Date.now();t.conResumen=S.config.resumen}
  if(!t.asesorUnido){unirAsesor(t);t.primeraResp=Date.now()}
  t.sim=null;msg(t,'asesor',txt.trim());if(t.estado==='Abierto')t.estado='En curso';log('asesor_mensaje',`${t.id}: ${txt.trim()}`);commit()}
function asesorEstado(e){const t=tk(ui.asesorSel);if(!t)return;t.estado=e;t.act=Date.now();if(e==='Resuelto'){t.resueltoEn=Date.now();t.resueltoPor=t.derivado?'asesor':'bela';msg(t,'sistema','Tu caso fue marcado como resuelto por el asesor.',{tipo:'aviso_res'})}
  if(e==='En curso'&&!t.asesorUnido){unirAsesor(t);t.primeraResp=Date.now();t.sim=null}log('asesor_estado',`${t.id} → ${e}`);commit()}

/* ==========================================================
   VISTA NEGOCIO
   ========================================================== */
function normTickets(){const reales=S.tickets.map(t=>({cat:t.cat,mom:t.mom,por:t.estado==='Resuelto'?(t.resueltoPor||(t.derivado?'asesor':'bela')):null,derivado:t.derivado,min:t.resueltoEn?(t.resueltoEn-t.creado)/60000:null,abierto:t.estado!=='Resuelto',sinResp:t.estado!=='Resuelto'&&!t.asesorUnido&&t.derivado,ref:t}));
  return ui.demo?SEMILLA.concat(reales):reales.filter(r=>!r.ref.demo)}
function barras(pares,cls=''){const max=Math.max(1,...pares.map(p=>p[1]));return`<div class="barras">${pares.map(([l,n,c])=>`<div class="barra-f"><span>${esc(l)}</span><span class="pista"><span class="relleno ${c||cls}" style="width:${n/max*100}%"></span></span><b>${n}</b></div>`).join('')}</div>`}
const fmin=v=>v==null||isNaN(v)?'—':(v<1?`${Math.round(v*60)} s`:`${v.toFixed(1)} min`);
function renderNegocio(){const root=$('#vista-negocio');
  const tabs=[['inv','Inventario de licencias'],['inc','Registro de incidentes'],['sug','Sugerencias']];
  let c='';
  if(ui.negTab==='inv'){c=`<div class="fila-carga"><div class="campo"><label for="carga-p">Producto</label><select id="carga-p">${Object.keys(P).map(k=>`<option value="${k}">${esc(P[k].n)}</option>`).join('')}</select></div><div class="campo"><label for="carga-n">Cantidad</label><input id="carga-n" type="number" min="1" max="20" value="5" style="width:90px"></div><button class="btn btn-azul" data-act="cargar-lic">Cargar licencias</button><span class="etq-demo">Claves ficticias de demostración</span></div>`+
    Object.keys(P).map(k=>{const l=S.inventario[k];const disp=l.filter(x=>x.estado==='Disponible').length;
      return`<section class="inv-prod"><h3>${esc(P[k].n)} <span class="pill ${disp<3?'pill-rojo':'pill-azul'}">Stock: ${disp} de ${l.length}</span>${disp<3?`<span class="pill st-Abierto">${ICO.alerta.replace('width="18" height="18"','width="12" height="12"')} Stock bajo</span>`:''}</h3>
      <div class="tabla-w"><table><thead><tr><th>Código</th><th>Clave</th><th>Estado</th><th>Entregada a</th><th>Cuándo</th></tr></thead><tbody>${l.map(x=>`<tr><td class="mono">${x.codigo}</td><td class="mono">${x.clave}</td><td><span class="pill ${x.estado==='Disponible'?'st-Resuelto':'pill-gris'}">${x.estado}</span></td><td>${esc(x.correo||'—')}</td><td>${x.fecha?fechaHora(x.fecha):'—'}</td></tr>`).join('')}</tbody></table></div></section>`}).join('')}
  else if(ui.negTab==='inc'){const N=normTickets();const tot=N.length;const res=N.filter(x=>!x.abierto);const bela=res.filter(x=>x.por==='bela');const ase=N.filter(x=>x.derivado);
    const avg=a=>{const v=a.map(x=>x.min).filter(x=>x!=null);return v.length?v.reduce((s,x)=>s+x,0)/v.length:null};
    const riesgo=N.filter(x=>x.sinResp);const pct=n=>tot?Math.round(n/tot*100)+'%':'0%';
    c=`<p style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:0 0 12px">${ui.demo?'<span class="etq-demo">Datos ficticios de demostración + tickets reales de la prueba</span>':'<span class="etq-demo">Solo tickets generados en esta prueba</span>'}<label class="check" style="min-height:0"><input type="checkbox" data-change="demo"${ui.demo?' checked':''}>Incluir datos de demostración</label></p>
    <div class="kpis"><div class="kpi"><span>Total de casos</span><b>${tot}</b></div><div class="kpi"><span>Resueltos por Bela</span><b>${bela.length}</b><em>${pct(bela.length)} del total</em></div><div class="kpi"><span>Derivados a asesor</span><b>${ase.length}</b><em>${pct(ase.length)} del total</em></div>
    <div class="kpi"><span>Tiempo promedio de resolución</span><b>${fmin(avg(res))}</b><em>Bela ${fmin(avg(bela))} · Asesor ${fmin(avg(res.filter(x=>x.por==='asesor')))}</em></div><div class="kpi riesgo"><span>Abiertos sin respuesta</span><b>${riesgo.length}</b><em>clientes en riesgo</em></div></div>
    <div class="paneles"><div class="panel"><h3>Por categoría</h3>${barras(CATS.map(k=>[k,N.filter(x=>x.cat===k).length]))}</div>
    <div class="panel"><h3>Por momento de la compra</h3>${barras(MOMS.map(k=>[k,N.filter(x=>x.mom===k).length]))}</div>
    <div class="panel"><h3>¿Quién lo resolvió?</h3>${barras([['Bela',bela.length],['Asesor',res.filter(x=>x.por==='asesor').length,'r'],['Pendiente',N.filter(x=>x.abierto).length,'g']])}</div></div>
    <h3 style="font-size:15px;font-weight:800;margin:18px 0 8px">Clientes en riesgo: casos derivados que nadie ha respondido</h3>
    <div class="tabla-w"><table><thead><tr><th>Caso</th><th>Cliente</th><th>Categoría</th><th>Esperando</th></tr></thead><tbody>${riesgo.filter(x=>x.ref).map(x=>`<tr><td>#${x.ref.id}</td><td>${esc(x.ref.cliente.nombre)}</td><td>${esc(x.cat)}</td><td>${hace(x.ref.derivadoEn||x.ref.creado).replace('hace ','')}</td></tr>`).join('')||'<tr><td colspan="4">Ningún caso real esperando respuesta.</td></tr>'}</tbody></table></div>`}
  else{const s=S.sugStats;const r=(a,b)=>b?Math.round(a/b*100)+'%':'—';
    c=`<p style="margin:0 0 12px"><span class="etq-demo">Datos de esta prueba</span> Las sugerencias están <b>${S.config.sugerencias?'activadas':'desactivadas'}</b> en este momento.</p>
    <div class="kpis"><div class="kpi"><span>Mostradas</span><b>${s.mostradas}</b></div><div class="kpi"><span>Agregadas</span><b>${s.agregadas}</b><em>Aceptación ${r(s.agregadas,s.mostradas)}</em></div><div class="kpi"><span>“No me interesa”</span><b>${s.descartadas}</b></div><div class="kpi"><span>Silenciadas</span><b>${s.silenciadas}</b><em>Silenciamiento ${r(s.silenciadas,s.mostradas)}</em></div><div class="kpi"><span>Cerradas o ignoradas</span><b>${s.cerradas+s.ignoradas}</b><em>${s.cerradas} cerradas · ${s.ignoradas} ignoradas</em></div></div>
    <div class="paneles"><div class="panel" style="grid-column:1/-1"><h3>Resultado de las sugerencias</h3>${barras([['Agregadas',s.agregadas],['No me interesa',s.descartadas,'g'],['Cerradas',s.cerradas,'g'],['Ignoradas',s.ignoradas,'g'],['Silenciadas',s.silenciadas,'r']])}</div></div>`}
  root.innerHTML=`<div class="vista-cab"><div class="in">${logoImg()}<div><h1>Panel del negocio</h1><small>Vista dueño · Belaf Center</small></div></div></div>
  <div class="neg"><div class="tabs" role="tablist">${tabs.map(([id,n])=>`<button role="tab" aria-selected="${ui.negTab===id}" data-act="neg-tab" data-t="${id}">${n}</button>`).join('')}</div>${c}</div>`}

/* ==========================================================
   PANEL DEL INVESTIGADOR (Ctrl+Shift+M)
   ========================================================== */
const TAREAS={T1:'Compra y recepción de la licencia',T2:'Bela resuelve una duda',T3:'Caso complejo (con o sin resumen)',T4:'Recordatorio de renovación',T5:'Sugerencias de Bela'};
function seg(clave,ops){return`<div class="seg" role="group">${ops.map(([v,l])=>`<button aria-pressed="${S.config[clave]===v}" data-act="cfg" data-k="${clave}" data-v="${v}">${l}</button>`).join('')}</div>`}
function renderInv(){if(!ui.invAbierto)return;const a=S.inv.activa;
  const ev=S.inv.eventos.slice(-60).reverse().map(e=>`${e.tarea||'—'} ${e.seg!==''?String(e.seg).padStart(6)+'s':'      '} ${e.tipo}: ${e.detalle}`).join('\n');
  $('#inv').innerHTML=`<div class="inv-cab"><h2>Panel del investigador</h2><button data-act="inv-cerrar" aria-label="Cerrar panel">${ICO.x}</button></div>
  <div class="inv-sec"><h3>Vista de esta ventana</h3><div class="seg">${['cliente','asesor','negocio'].map(v=>`<button aria-pressed="${VISTA===v}" data-act="vista" data-v="${v}">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div>
   <div class="inv-btns"><button class="btn btn-gris" data-act="ventana" data-v="asesor">Abrir Asesor en otra ventana</button><button class="btn btn-gris" data-act="ventana" data-v="negocio">Abrir Negocio en otra ventana</button></div>
   <p style="font-size:12px;color:var(--gris);margin:8px 0 0">Sincronización: ${chan?'BroadcastChannel activo':'sin BroadcastChannel'} · ${lsOK?'localStorage activo':'localStorage no disponible'}. ${syncDisponible()?'':'Se usará el asesor simulado.'}</p></div>
  <div class="inv-sec"><h3>Vista de los participantes</h3>${seg('vistaPublica',[['cliente','Cliente'],['asesor','Asesor'],['negocio','Negocio']])}<p style="font-size:12px;color:var(--gris);margin:8px 0 0">Todos los que ingresen sin rol de administradora verán esta vista, con las condiciones de abajo. Los cambios se aplican en vivo.</p></div>
  <div class="inv-sec"><h3>Condiciones</h3>
   <div class="seg-l">H3 · Entrega de licencia</div>${seg('flujo',[['propuesto','Flujo propuesto'],['actual','Flujo actual']])}
   <div class="seg-l">H2 · Derivación al asesor</div>${seg('resumen',[[true,'Con resumen'],[false,'Sin resumen']])}
   <div class="seg-l">H4 · Recordatorio</div>${seg('recordatorio',[['generico','Genérico'],['personalizado','Personalizado']])}
   <div class="seg-l">H5 · Sugerencias de Bela</div>${seg('sugerencias',[[true,'Activadas'],[false,'Desactivadas']])}
   <div class="seg-l">Asesor</div>${seg('asesorModo',[['auto','Real si hay ventana abierta'],['simulado','Siempre simulado']])}
   <div class="seg-l">Marcas [CONFIRMAR] en textos</div>${seg('marcas',[[true,'Visibles'],[false,'Ocultas']])}
   <div class="campo" style="margin-top:8px"><label for="inv-espera">Espera del flujo actual (minutos, dato del dueño)</label><input id="inv-espera" type="number" min="1" max="1440" value="${S.config.esperaMin}" data-change="espera"></div>
   ${silenciadas()?'<p class="alerta alerta-amb" style="margin:0">El participante silenció las sugerencias en esta sesión. <button class="btn-texto" data-act="reactivar-sug">Reactivar</button></p>':''}</div>
  <div class="inv-sec"><h3>Atajos</h3><div class="inv-btns">
   <button class="btn btn-gris" data-act="inv-rec" data-c="whatsapp">Mostrar recordatorio WhatsApp</button><button class="btn btn-gris" data-act="inv-rec" data-c="gmail">Mostrar recordatorio Gmail</button>
   <button class="btn btn-gris" data-act="inv-autollenar">Autocompletar pago (ficticio)</button><button class="btn btn-gris" data-act="avanzar-tiempo">Avanzar tiempo</button><button class="btn btn-gris" data-act="inicio-inv">Ir al inicio</button></div>
   <div class="seg-l">Canal del recordatorio al iniciar T4</div>${seg('canalT4',[['whatsapp','WhatsApp'],['gmail','Gmail']])}</div>
  <div class="inv-sec"><h3>Correo del cliente</h3><button class="btn btn-azul" data-act="inv-recordatorio">Simular que pasó el tiempo: enviar recordatorio de renovación</button></div><div class="inv-sec"><h3>Tareas</h3>${a?`<div class="crono" id="crono">0.0 s</div><div style="font-size:13px;color:var(--gris)">${a} en curso · <span id="toques">${S.inv.tareas[a].toques}</span> toques</div>`:''}
   ${Object.keys(TAREAS).map(id=>{const t=S.inv.tareas[id];const d=t.ini&&t.fin?((t.fin-t.ini)/1000).toFixed(1)+' s':'';
     return`<div class="tarea"><span><b>${id}</b> ${TAREAS[id]}<small>${t.estado}${d?` · ${d} · ${t.toques} toques`:''}</small></span>${a===id?`<button class="btn btn-rojo" data-act="t-fin" data-t="${id}">Terminar</button>`:`<button class="btn btn-azul" data-act="t-ini" data-t="${id}">Iniciar</button>`}</div>`}).join('')}</div>
  <div class="inv-sec"><h3>Registro de eventos (${S.inv.eventos.length})</h3><div class="log">${esc(ev)||'Sin eventos todavía.'}</div>
   <div class="inv-btns" style="margin-top:8px"><button class="btn btn-gris" data-act="exp" data-f="json">Copiar JSON</button><button class="btn btn-gris" data-act="exp" data-f="csv">Copiar CSV</button><button class="btn btn-gris" data-act="desc" data-f="json">Descargar JSON</button><button class="btn btn-gris" data-act="desc" data-f="csv">Descargar CSV</button></div></div>
  <div class="inv-sec"><button class="btn btn-rojo btn-bloque" data-act="reiniciar">Reiniciar todo (datos, inventario y registro)</button></div>`;tickCrono()}
function tickCrono(){const a=S.inv.activa;const el=$('#crono');if(a&&el){el.textContent=((Date.now()-S.inv.tareas[a].ini)/1000).toFixed(1)+' s';const tq=$('#toques');tq&&(tq.textContent=S.inv.tareas[a].toques)}}
setInterval(()=>{if(ui.invAbierto)tickCrono()},200);
function abrirInv(v){if(!esAdmin()){ui.invAbierto=false;$('#inv').hidden=true;return}ui.invAbierto=v??!ui.invAbierto;$('#inv').hidden=!ui.invAbierto;renderInv()}
function iniciarTarea(id){if(S.inv.activa)terminarTarea(S.inv.activa,'interrumpida');const t=S.inv.tareas[id];Object.assign(t,{estado:'en curso',ini:Date.now(),fin:null,toques:0});S.inv.activa=id;
  if(id==='T5')S.config.sugerencias=true;log('tarea_inicio',`${id} ${TAREAS[id]}`);commit();aplicarMarcas();
  if(VISTA==='cliente'){if(ui.chat.open)cerrarChat();if(id==='T4')mostrarRecordatorio(S.config.canalT4);else{ui.cart=null;ui.agregando=false;go('inicio')}}}
function terminarTarea(id,como='terminada'){const t=S.inv.tareas[id];t.fin=Date.now();t.estado=como;log('tarea_fin',`${id} ${((t.fin-t.ini)/1000).toFixed(1)} s, ${t.toques} toques`);S.inv.activa=null;if(id==='T5')S.config.sugerencias=false;commit()}
function mostrarRecordatorio(c){if(c==='gmail'){let m=S.correos.find(x=>x.tipo==='recordatorio');if(!m)m=nuevoMail({tipo:'recordatorio',asunto:'Recordatorio'});else{m.fecha=Date.now();m.leido=false}log('recordatorio_enviado',`gmail ${S.config.recordatorio}`);persistir();go('gmail')}
  else{log('recordatorio_enviado',`whatsapp ${S.config.recordatorio}`);go('wa',{waModo:'recordatorio'})}}
function exportar(f){const reales=S.tickets.filter(t=>!t.demo);
  if(f==='json')return JSON.stringify({exportado:new Date().toISOString(),condiciones:S.config,tareas:S.inv.tareas,sugerencias:S.sugStats,eventos:S.inv.eventos,tickets:reales,pedidos:S.pedidos},null,2);
  const cols=['hora','tarea','seg','vista','pantalla','tipo','detalle','condicion','accion','producto','contexto','ms_hasta_decidir'];const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  return[cols.join(','),...S.inv.eventos.map(e=>cols.map(c=>q(e[c])).join(','))].join('\n')}
function copiar(txt){const ok=()=>toast('Copiado al portapapeles');const fb=()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(e){toast('No se pudo copiar; usa Descargar')}ta.remove()};
  try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}}
function descargar(f){const b=new Blob([exportar(f)],{type:f==='json'?'application/json':'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`belaf-registro-${Date.now()}.${f}`;document.body.appendChild(a);a.click();a.remove()}

/* ==========================================================
   EVENTOS
   ========================================================== */
function aplicarMarcas(){document.body.classList.toggle('sin-marcas',!S.config.marcas)}
const ACC={
  'inicio':()=>go('tienda'),'home':()=>go('inicio'),'inicio-inv':()=>{setVista('cliente');go('inicio')},
  'menu':()=>{ui.menu=!ui.menu;ui.submenu=false;renderTop()},'submenu':()=>{ui.submenu=!ui.submenu;renderTop()},
  'moneda':el=>{ui.moneda=el.dataset.m;log('moneda',el.dataset.m);go('tienda')},
  'nav-na':el=>toast(`“${el.dataset.n}” no está incluido en este prototipo`),
  'buscar':()=>{log('buscar',ui.q);$('#grid').innerHTML=gridHTML();$('#conteo').textContent=conteoTxt()},
  'adicionar':()=>{ui.agregando=true;log('adicionar_producto');go('tienda')},
  'banco':el=>{ui.banco=el.dataset.b;renderPantalla()},
  'ver-prod':el=>iniciarCompra(el.dataset.pid,false),
  'variante':el=>{ui.cart.items[ui.fichaIdx||0].vid=el.dataset.vid;renderPantalla()},
  'comprar':()=>{ui.errores={};log('comprar',ui.cart.items.map(i=>i.pid).join('+'));go('pago')},
  'volver-ficha':()=>{if(ui.adicional)go('gracias');else go('producto')},
  'ir-carrito':()=>{if(ui.cart)go('pago');else toast('Tu carrito está vacío')},
  'quitar-item':el=>{const it=ui.cart.items.splice(+el.dataset.i,1)[0];if(it){delete ui.sug.decididas[it.pid];delete ui.sug.nota['ficha:'+it.pid];delete ui.sug.nota['pago:'+it.pid];ui.sug.decididas[it.pid]='descarta';log('quitar_item',it.pid)}renderPantalla()},
  'cupon':()=>{const c=(ui.form.cuponTxt||'').trim().toUpperCase();if(c==='BELA10'){ui.cupon={code:c,pct:10};ui.cuponMsg='Cupón BELA10 aplicado: 10% de descuento.'}else{ui.cupon=null;ui.cuponMsg=c?'Ese cupón no es válido. Revisa cómo está escrito.':'Escribe un código de cupón.'}log('cupon',c);renderPantalla()},
  'pagar':pagar,
  'abrir-correo':()=>go('gmail'),
  'leer-mail':el=>{const m=S.correos.find(x=>x.id===el.dataset.id);if(m){m.leido=true;log('correo_abierto',`${m.tipo}${m.tipo==='recordatorio'?' '+S.config.recordatorio:''}`)}persistir();go('correo',{mailId:el.dataset.id})},
  'copiar-clave':el=>{copiar(el.dataset.clave);log('clave_copiada')},
  'chat-desde-correo':el=>{const o=S.pedidos.find(x=>x.id===el.dataset.pedido);abrirChat({mom:'después',pid:o?.items[0].pid,pedidoId:o?.id})},
  'abrir-chat':()=>abrirChat(),'cerrar-chat':cerrarChat,
  'cerrar-globo':()=>{ui.globoTienda=false;renderDock()},
  'chip':el=>{const id=el.dataset.id,l=el.dataset.label;if(id.startsWith('sim_'))simOpcion(id,l);else belaAct(id,l)},
  'toggle-resumen':el=>{ui.resumenOculto[el.dataset.id]=!ui.resumenOculto[el.dataset.id];log('resumen_cliente',ui.resumenOculto[el.dataset.id]?'oculta':'ve');renderChat()},
  'sug':el=>accionSug(el.dataset.a,el.dataset.ctx,el.dataset.pid,(el.dataset.pids||'').split(',').filter(Boolean)),
  'porque':el=>{const c=el.dataset.ctx;ui.sug.porque[c]=!ui.sug.porque[c];log('sugerencia_porque',c);renderPantalla()},
  'wa-captura':()=>{log('wa_captura_enviada');go('wa',{waModo:'captura'})},
  'volver-espera':()=>go('espera'),
  'avanzar-tiempo':()=>{const o=S.pedidos.find(x=>x.estado==='En espera');if(!o){toast('No hay pedidos en espera');return}log('avanzar_tiempo',o.id);confirmarEspera(o,'tiempo avanzado por investigador');toast('Tiempo avanzado: pago verificado')},
  'renovar':el=>{log('recordatorio_clic',`${el.dataset.ctx} ${S.config.recordatorio}`);ui.renov={metodo:'yape',desde:el.dataset.ctx,pid:datosRenov().pid};go('renovar')},
  'volver-recordatorio':()=>ui.renov?.desde==='gmail'?go('gmail'):go('wa',{waModo:'recordatorio'}),
  'pagar-renov':()=>{const x=infoRenov();const em=S.cliente?.email||'ana.demo@correo-demo.pe';const o={id:'BC-P-'+S.seqPedido++,fecha:Date.now(),items:[{pid:x.pid,vid:'a',n:P[x.pid].n,v:'Renovación',p:x.precio}],subtotal:x.base,descuento:x.base-x.precio,total:x.precio,metodo:metodoLabel(ui.renov.metodo),email:em,nombre:x.nombre,estado:'',licencias:[],renovacion:true};
    S.pedidos.unshift(o);entregarPedido(o,'renovacion');log('renovacion_ok',`${o.id} ${P[x.pid].corto} ${soles(o.total)} ${S.config.recordatorio}`);persistir();go('renovado',{pedidoId:o.id})},
  'as-filtro':el=>{ui.asesorFiltro=el.dataset.e;renderAsesor()},
  'as-sel':el=>{ui.asesorSel=el.dataset.id;log('asesor_abre',el.dataset.id);persistir();renderAsesor()},
  'as-rapida':el=>{$('#as-txt').value=el.dataset.t;$('#as-txt').focus()},
  'as-enviar':()=>{const ta=$('#as-txt');asesorEnvia(ta.value);ta.value=''},
  'as-estado':el=>asesorEstado(el.dataset.e),
  'as-reenviar':()=>{const t=tk(ui.asesorSel);const o=t&&(S.pedidos.find(x=>x.id===t.pedidoId)||S.pedidos.find(x=>x.email===t.cliente.email));if(!o){toast('Este ticket no tiene un pedido de la prueba asociado');return}
    nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:o.licencias,nota:'reenvio',asunto:`Reenvío de tu licencia · Pedido ${o.id}`,preview:'Te reenviamos tu código y clave'});asesorEnvia(`Te reenvié la licencia del pedido ${o.id} a ${o.email}.`)},
  'as-reemplazo':()=>{const t=tk(ui.asesorSel);const o=t&&(S.pedidos.find(x=>x.id===t.pedidoId)||S.pedidos.find(x=>x.email===t.cliente.email));if(!o){toast('Este ticket no tiene un pedido de la prueba asociado');return}
    const lics=itemsReemplazo(o,t).map(it=>{const l=tomarLicencia(it.pid,o.email);return{pid:it.pid,n:it.n,codigo:l?.codigo||null,clave:l?.clave||null}});nuevoMail({tipo:'licencia',pedidoId:o.id,nombre:o.nombre,licencias:lics,nota:'reemplazo',asunto:`Clave de reemplazo · Pedido ${o.id}`,preview:'Te enviamos una nueva clave'});asesorEnvia(`Te envié una clave de reemplazo a ${o.email}. Pruébala y me cuentas.`)},
  'neg-tab':el=>{ui.negTab=el.dataset.t;renderNegocio()},
  'cargar-lic':()=>{const k=$('#carga-p').value;const n=Math.min(20,Math.max(1,+$('#carga-n').value||5));const r=rnd(Date.now()%100000+7);const l=S.inventario[k];for(let i=0;i<n;i++)l.push({codigo:`LIC-${PREF[k]}-${pad(l.length+1)}`,clave:genClave(r),estado:'Disponible',correo:'',fecha:null});log('licencias_cargadas',`${k} +${n}`);commit();toast(`Cargaste ${n} licencias de ${P[k].corto}`)},
  'inv-cerrar':()=>abrirInv(false),
  'vista':el=>setVista(el.dataset.v),
  'ventana':el=>{try{window.open(location.href.split('#')[0]+'#'+el.dataset.v,'_blank')}catch(e){toast('El navegador bloqueó la ventana')}},
  'sug-oferta':el=>{const c=el.dataset.ctx,r=el.dataset.r;ui.sug.oferta=ui.sug.oferta||{};ui.sug.oferta[c]=r;log('sugerencia_oferta',`${r} (${c})`);if(r==='no')S.sugStats.descartadas++;persistir();renderPantalla()},
  'tab-eq':el=>{const v=el.dataset.v;setVista(v==='cliente'?'equipo':v)},
  'inv-recordatorio':()=>{let m=S.correos.find(x=>x.tipo==='recordatorio');if(!m)nuevoMail({tipo:'recordatorio',asunto:'Recordatorio'});else{m.fecha=Date.now();m.leido=false}log('recordatorio_enviado','correo (simulado: pasó el tiempo)');commit();toast('Recordatorio enviado al correo del cliente')},
  'cfg':el=>{const k=el.dataset.k;let v=el.dataset.v;if(v==='true')v=true;else if(v==='false')v=false;S.config[k]=v;log('condicion',`${k}=${v}`);commit();aplicarMarcas();if(VISTA==='cliente')renderPantalla()},
  'reactivar-sug':()=>{ui._silencio=false;try{sessionStorage.removeItem('belaf_sug_off')}catch(e){}renderInv();renderPantalla()},
  'inv-rec':el=>{setVista('cliente');mostrarRecordatorio(el.dataset.c)},
  'inv-autollenar':()=>{Object.assign(ui.form,{email:'ana.demo@correo-demo.pe',nombres:'Ana',apellidos:'Quispe Demo',doc:'12345678',cel:'987654321',tarjeta:'4111 1111 1111 1111',titular:'Ana Quispe',venc:'12/29',cvv:'123'});if(VISTA==='cliente'&&ui.screen==='pago')renderPantalla();toast('Datos ficticios listos')},
  't-ini':el=>iniciarTarea(el.dataset.t),'t-fin':el=>terminarTarea(el.dataset.t),
  'exp':el=>copiar(exportar(el.dataset.f)),'desc':el=>descargar(el.dataset.f),
  'reiniciar':()=>{if(!confirm('¿Reiniciar todo? Se borran pedidos, tickets, inventario y registro.'))return;S=estadoInicial();cfgDirty=true;const inv=ui.invAbierto;ui=nuevaUI();ui.invAbierto=inv;try{sessionStorage.removeItem('belaf_sug_off')}catch(e){}$('#chat').hidden=true;commit();aplicarMarcas();if(VISTA==='cliente')go('inicio');toast('Prototipo reiniciado')}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const f=ACC[el.dataset.act];if(f){e.preventDefault();f(el)}});
document.addEventListener('input',e=>{const k=e.target.dataset.f;if(k){ui.form[k]=e.target.value;if(ui.errores[k]){delete ui.errores[k];const c=e.target.closest('.campo');c&&c.classList.remove('mal');const er=c&&c.querySelector('.err');er&&er.remove()}}});
document.addEventListener('change',e=>{const el=e.target;const k=el.dataset.change;
  if(el.dataset.fc){ui.form[el.dataset.fc]=el.checked;if(el.dataset.fc==='terminos'&&el.checked&&ui.errores.terminos){delete ui.errores.terminos;renderPantalla()}return}
  if(!k)return;
  if(k==='orden'){ui.orden=el.value;$('#grid').innerHTML=gridHTML();log('ordenar',el.value)}
  else if(k==='metodo'){ui.metodo=el.value;log('metodo_pago',el.value);renderPantalla()}
  else if(k==='banco'){ui.banco=el.value}
  else if(k==='rmetodo'){ui.renov.metodo=el.value}
  else if(k==='rprod'){ui.renov.pid=el.value;log('renovar_producto',el.value);renderPantalla()}
  else if(k==='demo'){ui.demo=el.checked;renderNegocio()}
  else if(k==='espera'){S.config.esperaMin=Math.max(1,+el.value||30);log('condicion','esperaMin='+S.config.esperaMin);commit()}});
/* Contador de toques (solo vista Cliente, solo con tarea activa) */
$('#vista-cliente').addEventListener('pointerdown',e=>{const a=S.inv.activa;if(!a||VISTA!=='cliente')return;S.inv.tareas[a].toques++;
  const el=e.target.closest('button,a,input,select,label,textarea,[data-act]');const lbl=el?(el.getAttribute('aria-label')||el.dataset.label||el.placeholder||el.textContent||el.tagName).trim().replace(/\s+/g,' ').slice(0,50):'(fondo)';
  log('toque',lbl);persistir();tickCrono()},true);
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&(e.key==='M'||e.key==='m')){e.preventDefault();abrirInv()}
  if(e.key==='Escape'){if(ui.invAbierto)abrirInv(false);else if(ui.chat.open)cerrarChat()}});
/* Acceso táctil oculto: 5 toques rápidos sobre el aviso superior */
(()=>{let n=0,t=0;$('#aviso').addEventListener('click',()=>{const now=Date.now();n=now-t<600?n+1:1;t=now;if(n>=5){n=0;abrirInv()}})})();

/* Sincronización entre ventanas */
if(chan)chan.onmessage=e=>{const d=e.data||{};if(d.de===WIN_ID)return;if(d.tipo==='estado'){S=d.estado;if(!esAdmin())fijarCFG();else normCfg();renderVivo(true)}else if(d.tipo==='ping'&&d.vista==='asesor')ultimoPingAsesor=Date.now()};
window.addEventListener('storage',e=>{if(e.key!==KEY||!e.newValue)return;try{const n=JSON.parse(e.newValue);if(!chan){S=n;if(!esAdmin())fijarCFG();else normCfg();renderVivo(true)}}catch(err){}});
setInterval(()=>{if(VISTA==='asesor'&&chan)try{chan.postMessage({tipo:'ping',vista:'asesor',de:WIN_ID})}catch(e){}},2000);
function renderVivo(remoto){if(!esAdmin()&&VISTA!==(S.config.vistaPublica||'cliente')){setVista(S.config.vistaPublica);taskSync(remoto);return}aplicarMarcas();
  if(VISTA==='cliente'){if(ui.chat.open)renderChat();if(remoto&&['gmail','correo','espera'].includes(ui.screen))renderPantalla()}
  else if(VISTA==='asesor')renderAsesor();else renderNegocio();
  renderInv();renderTabs();taskSync(remoto)}
function setVista(v){if(!esAdmin()){v=S.config.vistaPublica||'cliente';ui._eq=false;ui.invAbierto=false;ui._tabPrev=null}if(esAdmin()&&['asesor','negocio','investigador','equipo'].includes(v))ui._eq=true;let inv=false;if(v==='investigador'){inv=true;v='negocio'}if(v==='equipo')v='cliente';if(!['cliente','asesor','negocio'].includes(v))v='cliente';VISTA=v;ui._tab=inv?'investigador':v;if(inv)ui.invAbierto=true;else if(ui._tabPrev==='investigador')ui.invAbierto=false;ui._tabPrev=ui._tab;$('#inv').hidden=!ui.invAbierto;
  $('#vista-cliente').hidden=v!=='cliente';$('#vista-asesor').hidden=v!=='asesor';$('#vista-negocio').hidden=v!=='negocio';
  const h2=ui._tab==='investigador'?'investigador':(v==='cliente'?(ui._eq?'equipo':''):v);const h='#'+h2;if(location.hash!==h&&!(h2===''&&!location.hash))history.replaceState(null,'',h2?h:location.pathname);
  document.title=`Belaf Center · ${v==='cliente'?'Tienda':v==='asesor'?'Asesor':'Negocio'} (prototipo)`;
  if(v==='cliente')renderPantalla();else if(v==='asesor')renderAsesor(true);else renderNegocio();renderInv();renderTabs()}
window.addEventListener('hashchange',()=>setVista(location.hash.slice(1)));

function renderTabs(){
 const te=$('#tabs-equipo');if(te){te.hidden=!ui._eq;if(ui._eq){const h=[['cliente','Cliente'],['asesor','Asesor'],['negocio','Negocio'],['investigador','Investigador']].map(([v,n])=>`<button class="${(ui._tab||VISTA)===v?'on':''}" data-act="tab-eq" data-v="${v}">${n}</button>`).join('');if(te._h!==h){te.innerHTML=h;te._h=h}}}
 const ct=$('#cli-tabs');if(ct){ct.hidden=VISTA!=='cliente'||ui.chat.open;if(!ct.hidden){const n=S.correos.filter(m=>!m.leido).length,c=['gmail','correo'].includes(ui.screen);const h=`<button class="${c?'':'on'}" data-act="inicio">Tienda</button><button class="${c?'on':''}" data-act="abrir-correo">Correo${n?`<span class="bd">${n}</span>`:''}</button>`;if(ct._h!==h){ct.innerHTML=h;ct._h=h}}}}
setInterval(renderTabs,1200);
function taskSync(remoto){if(ui._ta===undefined){ui._ta=S.inv.activa;return}if(!remoto||VISTA!=='cliente'||S.inv.activa===ui._ta){ui._ta=S.inv.activa;return}const id=S.inv.activa;ui._ta=id;if(!id)return;if(ui.chat.open)cerrarChat();if(id==='T4')mostrarRecordatorio(S.config.canalT4);else{ui.cart=null;ui.agregando=false;go('inicio')}}
/* Sincronización entre dispositivos (base de datos del Artifact; si no hay, sigue funcionando entre ventanas del mismo navegador) */
var DB=null,dbT=null;
function dbPush(){if(!DB)return;clearTimeout(dbT);dbT=setTimeout(()=>{try{let j=JSON.stringify(S);if(j.length>230000){const cp=JSON.parse(j);while(JSON.stringify(cp).length>230000&&cp.inv.eventos.length>50)cp.inv.eventos.splice(0,100);j=JSON.stringify(cp)}DB.doc('estado/main').set({json:j,de:WIN_ID,ts:Date.now()}).catch(()=>{});if(esAdmin()&&cfgDirty){const cj=JSON.stringify(S.config);if(cj!==cfgPush){cfgPush=cj;cfgDirty=false;DB.doc('control/config').set({config:JSON.parse(cj),ts:Date.now()}).catch(()=>{cfgPush=null;cfgDirty=true;avisoPermiso()})}}}catch(e){}},200)}
(async()=>{try{if(!window.claude||!claude.use)return;DB=await claude.use('db');if(!DB)return;
 DB.doc('estado/main').onSnapshot(sn=>{try{if(!sn.exists){dbPush();return}const d=sn.data();if(!d||d.de===WIN_ID||sn.metadata&&sn.metadata.hasPendingWrites)return;const n=JSON.parse(d.json);if(n&&n.v===1){S=n;fijarCFG();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}renderVivo(true)}}catch(e){}});
 DB.doc('control/config').onSnapshot(sn=>{try{if(!sn.exists){if(esAdmin()){cfgDirty=true;persistir()}return}const d=sn.data();if(!d||!d.config)return;CFG=d.config;cfgPush=JSON.stringify(d.config);fijarCFG();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}renderVivo(true)}catch(e){}});
 DB.doc('estado/presencia').onSnapshot(sn=>{try{if(sn.exists&&Date.now()-sn.data().ts<8000)ultimoPingAsesor=Date.now()}catch(e){}});
 setInterval(()=>{if(VISTA==='asesor')DB.doc('estado/presencia').set({ts:Date.now()}).catch(()=>{})},3000)}catch(e){}})();
ui._ta=S.inv.activa;
aplicarMarcas();setVista(location.hash.slice(1)||'cliente');
/* ---------- Pantalla de inicio de sesión ---------- */
function avisoPermiso(){const el=$('#aviso-permiso');if(!esAdmin()){el.hidden=true;return}el.textContent='Tu sesión de administradora venció o no es válida: los cambios del panel no llegarán a los participantes. Cierra sesión y vuelve a ingresar.';el.hidden=false}
async function sha256(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function revisarPermisoAdmin(){try{if(!esAdmin()||!window.claude||!claude.use)return;const u=await claude.use('user');if(u&&!(await u.canEdit()))avisoPermiso()}catch(e){}}
function mostrarSesion(){const ok=!!SESION;$('#login').hidden=ok;$('#salir').hidden=!ok;if(!ok){$('#login-marca').innerHTML=logoImg()+'<b style="font-size:16px">Belaf Center</b>';setTimeout(()=>{try{$('#login-email').focus()}catch(e){}},50)}}
function entrar(email,rol){SESION={email,rol,desde:Date.now()};try{localStorage.setItem(SES_KEY,JSON.stringify(SESION))}catch(e){}
  log('sesion_inicio',`${rol} ${email}`);persistir();mostrarSesion();
  if(rol==='admin'){setVista(location.hash.slice(1)||'equipo');revisarPermisoAdmin()}else{$('#aviso-permiso').hidden=true;abrirInv(false);setVista(S.config.vistaPublica||'cliente')}}
$('#login-form').addEventListener('submit',async e=>{e.preventDefault();const err=$('#login-err');err.hidden=true;
  const email=$('#login-email').value.trim().toLowerCase();const pass=$('#login-pass').value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){err.textContent='Ingresa un correo válido.';err.hidden=false;return}
  try{const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({email,password:pass})});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){err.textContent=j.error||'No se pudo iniciar sesión.';err.hidden=false;return}
    entrar(email,j.rol)}
  catch(x){err.textContent='No hay conexión con el servidor.';err.hidden=false;return}
  $('#login-pass').value=''});
$('#salir').addEventListener('click',e=>{e.stopPropagation();if(SESION)log('sesion_fin',`${SESION.rol} ${SESION.email}`);persistir();SESION=null;try{localStorage.removeItem(SES_KEY)}catch(x){}try{fetch('/api/logout',{method:'POST',credentials:'same-origin'})}catch(x){}
  $('#aviso-permiso').hidden=true;abrirInv(false);setVista(S.config.vistaPublica||'cliente');$('#login-email').value='';mostrarSesion()});
window.addEventListener('storage',e=>{if(e.key!==SES_KEY)return;try{SESION=e.newValue?JSON.parse(e.newValue):null}catch(x){SESION=null}if(!esAdmin())abrirInv(false);mostrarSesion();setVista(esAdmin()?(location.hash.slice(1)||'equipo'):'cliente')});
mostrarSesion();if(esAdmin())revisarPermisoAdmin();