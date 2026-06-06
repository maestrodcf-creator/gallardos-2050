// ── SHARED DATA LAYER ── El Secreto de las Gemas
const TASKS = [
  {id:'t0', name:'Portada y nombre del equipo', page:'Portada'},
  {id:'t1', name:'Plano de calles y ángulos', page:'Pág. 1'},
  {id:'t2', name:'Mapa de profesiones y sectores', page:'Pág. 2'},
  {id:'t3', name:'Red de energía sostenible', page:'Pág. 3'},
  {id:'t4', name:'Agenda de la ciudad', page:'Pág. 4'},
  {id:'t5', name:'Cartel publicitario', page:'Pág. 5'},
  {id:'t6', name:'Exposición oral', page:'Final'},
];

const GROUPS_INIT = [
  {id:'g0', name:'Los Pingüin@s',            emoji:'🐧'},
  {id:'g1', name:'Los Reyes/Reinas del Flow', emoji:'👑'},
  {id:'g2', name:'Las Llamas del Flow',       emoji:'🔥'},
  {id:'g3', name:'Los Listill@s',             emoji:'🧠'},
  {id:'g4', name:'L@s Andaluces/as',          emoji:'🌻'},
  {id:'g5', name:'L@s Sherifs',               emoji:'⭐'},
  {id:'g6', name:'L@s Casas',                emoji:'🏠'},
];

const ACCENTS = [
  'linear-gradient(90deg,#38C6F4,#B06FE8)',
  'linear-gradient(90deg,#F4B942,#F4606C)',
  'linear-gradient(90deg,#3DDBA0,#38C6F4)',
  'linear-gradient(90deg,#B06FE8,#F4606C)',
  'linear-gradient(90deg,#F49C42,#F4B942)',
  'linear-gradient(90deg,#F4606C,#B06FE8)',
  'linear-gradient(90deg,#3DDBA0,#B06FE8)',
];
const SOLID = ['#38C6F4','#F4B942','#3DDBA0','#B06FE8','#F49C42','#F4606C','#3DDBA0'];

const LEVELS = [
  {min:280, label:'Maestro/a de las Gemas', cls:'lv-maestro',   icon:'✦', color:'#F4B942'},
  {min:160, label:'Guardián/a',             cls:'lv-guardian',  icon:'❖', color:'#3DDBA0'},
  {min:70,  label:'Explorador/a',           cls:'lv-explorador',icon:'◆', color:'#38C6F4'},
  {min:0,   label:'Aprendiz de Gema',       cls:'lv-aprendiz',  icon:'⬥', color:'#9CA3AF'},
];

function getLevel(pts){ return LEVELS.find(l=>pts>=l.min); }
function getPoints(g){
  return g.tasks.reduce((s,t)=>{
    if(t.status==='done') return s+Math.max(1,t.stars||1)*10;
    if(t.status==='partial') return s+5;
    return s;
  },0);
}
function countDone(g){ return g.tasks.filter(t=>t.status==='done').length; }

function loadData(){
  try{ return JSON.parse(localStorage.getItem('gemas_v2'))||initData(); }
  catch(e){ return initData(); }
}
function initData(){
  const data=GROUPS_INIT.map((g,i)=>({
    ...g, accent:ACCENTS[i], solid:SOLID[i],
    generalNote:'',
    roles:{coord:'',secre:'',moder:'',porta:''},
    tasks:TASKS.map(t=>({id:t.id,status:'pending',stars:0,comment:''}))
  }));
  saveData(data); return data;
}
function saveData(d){ localStorage.setItem('gemas_v2',JSON.stringify(d)); }
function flashOk(id){
  const el=document.getElementById(id);
  if(!el)return;
  el.style.display='block';
  setTimeout(()=>el.style.display='none',2400);
}
