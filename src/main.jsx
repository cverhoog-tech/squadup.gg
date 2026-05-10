import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './styles.css';

const steam = id => `https://store.steampowered.com/app/${id}`;
const img = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`;
const capsule = id => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`;

const games = [
  {id:553850,title:'HELLDIVERS 2',type:'PvE',genre:'Co-op Shooter',price:'€39.99',sale:'',rank:'#1',friends:5,appid:553850},
  {id:252490,title:'RUST',type:'PvP',genre:'Survival',price:'€19.99',sale:'-50%',rank:'#4',friends:4,appid:252490},
  {id:1245620,title:'ELDEN RING',type:'PvE',genre:'Action RPG',price:'€59.99',sale:'',rank:'#7',friends:3,appid:1245620},
  {id:1172470,title:'APEX LEGENDS',type:'PvP',genre:'Battle Royale',price:'Free',sale:'',rank:'#3',friends:6,appid:1172470},
  {id:1086940,title:'BALDUR’S GATE 3',type:'Co-op',genre:'CRPG',price:'€59.99',sale:'',rank:'#9',friends:2,appid:1086940},
  {id:730,title:'COUNTER-STRIKE 2',type:'PvP',genre:'Tactical FPS',price:'Free',sale:'',rank:'#2',friends:7,appid:730},
  {id:359550,title:'RAINBOW SIX SIEGE',type:'PvP',genre:'Tactical',price:'€19.99',sale:'-60%',rank:'#12',friends:4,appid:359550},
  {id:1282100,title:'REMNANT II',type:'Co-op',genre:'Soulslike',price:'€49.99',sale:'-35%',rank:'#18',friends:3,appid:1282100},
  {id:1361210,title:'DARKTIDE',type:'PvE',genre:'Horde Shooter',price:'€39.99',sale:'-30%',rank:'#21',friends:3,appid:1361210},
  {id:1938090,title:'WARZONE',type:'PvP',genre:'Shooter',price:'Free',sale:'',rank:'#6',friends:5,appid:1938090},
  {id:275850,title:'NO MAN’S SKY',type:'Co-op',genre:'Exploration',price:'€29.99',sale:'-50%',rank:'#30',friends:2,appid:275850},
  {id:1966720,title:'LETHAL COMPANY',type:'Co-op',genre:'Horror',price:'€9.75',sale:'',rank:'#15',friends:6,appid:1966720}
];

const avatars = Array.from({length: 42}, (_,i)=>({
  id:i+1,
  name:['Nova','Rook','Valkyrie','Ghost','Kestrel','Nyx','Atlas','Sable'][i%8],
  title:['Void Captain','Rust Prophet','LAN Warden','Queue Slayer','Mythic Raider','Signal Runner'][i%6],
  hue:(i*37)%360,
  shape:i%5
}));

const friends = avatars.slice(0,8).map((a,i)=>({...a,game:games[i%games.length].title,status:i%3?'online':'in party'}));
const sections = ['Popular With Your Squad','New Co-op Drops','PvP Hotlist','LAN Party Picks','Survival Weekend','Under €25','Top Sellers','Hidden Gems','Friends Are Playing','Fresh Updates','Steam Deals','SquadUp Recommends'];
const chartData = [{name:'Mon',v:2},{name:'Tue',v:4},{name:'Wed',v:3},{name:'Thu',v:7},{name:'Fri',v:9},{name:'Sat',v:12},{name:'Sun',v:6}];
const pieData = [{name:'PvP',value:42},{name:'Co-op',value:35},{name:'Survival',value:23}];

function Avatar({a,small=false}){return <div className={`avatar ${small?'small':''} s${a.shape}`} style={{'--h':a.hue}}><span>{a.name[0]}</span></div>}
function SteamButton({g}){return <a className="steamBtn" href={steam(g.appid)} target="_blank">Steam</a>}
function GameCard({g,wide=false}){return <div className={`gameCard ${wide?'wide':''}`}><img src={img(g.appid)} /><div className="gameMeta"><b>{g.title}</b><span>{g.genre}</span></div><div className="gameTags"><span className={g.type==='PvP'?'red':'green'}>{g.type}</span><span>{g.friends} friends</span><span>{g.rank}</span></div><div className="gameFoot"><strong>{g.price}</strong>{g.sale&&<em>{g.sale}</em>}<button onClick={()=>toast(`${g.title} recommended to Nova`)}>Recommend</button><SteamButton g={g}/></div></div>}
function toast(t){window.dispatchEvent(new CustomEvent('toast',{detail:t}))}

function Shell(){
 const [page,setPage]=useState('home'),[right,setRight]=useState(true),[theme,setTheme]=useState('Immersive'),[note,setNote]=useState(''),[lang,setLang]=useState('EN');
 React.useEffect(()=>{const h=e=>{setNote(e.detail);setTimeout(()=>setNote(''),2400)};window.addEventListener('toast',h);return()=>window.removeEventListener('toast',h)},[]);
 return <div className={`app theme-${theme.toLowerCase()} page-${page}`}>
  <aside className="leftNav"><div className="brand">SQUAD<span>UP</span></div>{['home','explore','parties','voice','calendar','profile','settings'].map(p=><button className={page===p?'active':''} onClick={()=>setPage(p)}>{p}</button>)}<button className="profileMini" onClick={()=>setPage('profile')}><Avatar a={avatars[0]} small/><div><b>Shane</b><span>@squadfounder</span></div></button></aside>
  <main className="main">{page==='home'&&<Home setPage={setPage}/>} {page==='explore'&&<Explore/>} {page==='parties'&&<Parties/>} {page==='voice'&&<Voice/>} {page==='calendar'&&<Calendar/>} {page==='profile'&&<Profile/>} {page==='settings'&&<Settings theme={theme} setTheme={setTheme} lang={lang} setLang={setLang}/>}</main>
  {page!=='explore'&&<button className="rightToggle" onClick={()=>setRight(!right)}>{right?'›':'‹'}</button>}
  {page!=='explore'&&<aside className={`rightRail ${right?'open':'closed'}`}><h3>Live Squad</h3>{friends.slice(0,6).map(f=><div className="railFriend"><Avatar a={f} small/><div><b>{f.name}</b><span>{f.game}</span></div></div>)}<div className="miniPanel"><b>Notifications</b><p>3 party invites · 2 game recommendations</p><button onClick={()=>toast('Live test notification sent')}>Test Live Update</button></div></aside>}
  {note&&<div className="toast">{note}</div>}
 </div>
}

function Home({setPage}){return <section className="home variantD"><div className="heroHome" style={{backgroundImage:`linear-gradient(90deg,#080912 15%,rgba(8,9,18,.35)),url(${capsule(553850)})`}}><div><span className="eyebrow">Trending Now</span><h1>HELLDIVERS 2</h1><p>Drop into a cinematic co-op mission with your squad tonight.</p><div className="actions"><button onClick={()=>{toast('Joined Helldivers party');setPage('parties')}}>Join Party</button><SteamButton g={games[0]}/></div></div></div><div className="homeGrid"><div className="panel stats"><h3>Squad Overview</h3><div className="statrow"><b>12</b><span>Online</span><b>4</b><span>Parties</span><b>7</b><span>Events</span></div></div><div className="panel compactVoice"><h3>Voice</h3><div className="avatarLine">{friends.slice(0,6).map(a=><Avatar a={a} small/>)}<button onClick={()=>toast('Voice joined')}>Join</button></div></div><div className="panel quick"><h3>Quick Actions</h3><button onClick={()=>setPage('parties')}>Start Party</button><button onClick={()=>setPage('calendar')}>Plan LAN</button><button onClick={()=>setPage('explore')}>Discover</button></div><div className="panel activity"><h3>Live Activity</h3>{['Nova recommended Rust','Rook joined voice','Valkyrie created LAN Night'].map(x=><p>{x}</p>)}</div></div><h2>Recommended For You</h2><div className="rowCards">{games.slice(1,7).map(g=><GameCard g={g}/>)}</div></section>}

function Icon({children}){return <span className="tinyIcon">{children}</span>}
function ExploreGameCard({g,compact=false,list=false}){return <article className={`exGame ${compact?'compact':''} ${list?'list':''}`} onClick={()=>toast(`${g.title} opened`)}>
  <img src={compact?img(g.appid):capsule(g.appid)} alt=""/>
  <div className="exOverlay"><b>{g.title}</b><span>{compact?`${g.rank} · ${g.friends} friends`:`${g.friends} friends play this`}</span></div>
  <div className="exBadges"><em className={g.type==='PvP'?'pvp':'pve'}>{g.type}</em>{g.sale&&<em className="sale">{g.sale}</em>}</div>
  {!compact&&<div className="exActions"><button onClick={(e)=>{e.stopPropagation();toast(`${g.title} squad quest created`)}}>♡</button><SteamButton g={g}/></div>}
</article>}
function ExploreCarousel({title,items,wide=false}){const ref=React.useRef(null);const move=(dir)=>{const el=ref.current;if(!el)return;el.scrollBy({left:dir*el.clientWidth*.82,behavior:'smooth'});};return <section className={`exSection ${wide?'wide':''}`}><div className="exSectionHead"><h2>{title}</h2><button onClick={()=>toast(`Viewing all ${title}`)}>View All</button></div><div className="exCarouselWrap"><button className="carArrow left" onClick={()=>move(-1)}>‹</button><div className="exCarousel" ref={ref}>{items.map((g,i)=><ExploreGameCard key={title+g.id+i} g={g}/>)}</div><button className="carArrow right" onClick={()=>move(1)}>›</button></div></section>}
function ExploreListPanel({title,items}){return <div className="exSidePanel"><div className="exSectionHead"><h3>{title}</h3><button>View All</button></div>{items.map((g,i)=><button className="exRank" onClick={()=>toast(`${g.title} selected`)}><img src={img(g.appid)}/><span><b>{g.title}</b><small>{i?`${620+i*30} playing`:'1.2K playing'}</small></span><em>{(9.1-i*.2).toFixed(1)}</em></button>)}</div>}
function Explore(){
 const [mode,setMode]=useState('immersive');
 const [hero,setHero]=useState(2);
 const heroes=[games[2],games[0],games[4],games[5],games[1]];
 const active=heroes[hero%heroes.length];
 const moveHero=(dir)=>setHero((hero+dir+heroes.length)%heroes.length);
 const feed=['Trending Now','Because you play similar games','SquadUp Recommends','Co-op Worlds','PvP Hotlist','Survival Nights','LAN Party Picks','Steam Deals','Friends Are Playing','New Releases','Hidden Gems','Upcoming Boss Fights','Under €30','Weekend Squad Picks'];
 const commandItems=games.concat(games).concat(games.slice(0,4));
 return <section className="exploreExact">
  <div className="exHeader"><div><h1>SQUADUP EXPLORE <span>– TWO WORLDS, ONE FEED</span></h1><p>Switch between immersive cinematic discovery or clean tactical overview. Same content. Different experience.</p></div><div className="exTopControls"><button className="circleBtn">⌕</button><button className="circleBtn">🔔<em>3</em></button><button className="exProfile"><Avatar a={avatars[0]} small/><span><b>Kevin</b><small>Online</small></span></button></div></div>
  <div className="exSwitch"><button className={mode==='immersive'?'active':''} onClick={()=>setMode('immersive')}>SQUADUP IMMERSIVE</button><button className={mode==='command'?'active':''} onClick={()=>setMode('command')}>COMMAND VIEW</button></div>
  {mode==='immersive'?<div className="exLayout">
    <div className="exMainFeed">
      <section className="exHero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,6,12,.92) 0%,rgba(5,6,12,.65) 34%,rgba(5,6,12,.08) 70%,rgba(5,6,12,.75) 100%),url(${capsule(active.appid)})`}}>
        <div className="heroFriends">{friends.slice(0,5).map(f=><Avatar a={f} small/>)}<b>+24</b><span>See who’s playing</span></div>
        <button className="heroArrow left" onClick={()=>moveHero(-1)}>‹</button><button className="heroArrow right" onClick={()=>moveHero(1)}>›</button>
        <div className="heroCopy"><h2>{active.title}</h2><h3>{active.title==='ELDEN RING'?'Rise, Tarnished.':'Squad ready.'}</h3><p>{active.genre} nights with your friends, live parties and Steam-linked discovery.</p><div className="heroButtons"><button onClick={()=>toast(`${active.title} details opened`)}>View Game</button><SteamButton g={active}/></div><div className="heroTags"><span>RPG</span><span>Open World</span><span>Souls-like</span><span className={active.type==='PvP'?'pvp':'pve'}>{active.type}</span></div></div>
        <div className="heroDots">{heroes.map((_,i)=><button onClick={()=>setHero(i)} className={i===hero?'active':''}/>)}</div>
      </section>
      {feed.map((title,i)=> i===2 ? <section className="exRecommendBlock" key={title}><div className="exSectionHead"><h2>SquadUp Recommends</h2></div><div className="recommendGrid"><ExploreGameCard g={games[(i+5)%games.length]} /><div className="recommendList">{games.slice(6,10).map(g=><button onClick={()=>toast(`${g.title} opened`)}><img src={img(g.appid)}/><span><b>{g.title}</b><small>{g.friends} friends play this</small></span><em className={g.type==='PvP'?'pvp':'pve'}>{g.type}</em><strong>›</strong></button>)}</div></div></section> : <ExploreCarousel key={title} title={title} items={Array.from({length:10},(_,j)=>games[(i+j)%games.length])}/>) }
      <section className="exActivity"><h2>Live Squad Activity</h2><div>{['Shane started a party · Helldivers 2','Tom unlocked an achievement · Baldur’s Gate 3','Kevin is live · Streaming RUST','Mira joined a squad · Apex Legends'].map(t=><button><Avatar a={avatars[Math.floor(Math.random()*avatars.length)]} small/><span>{t}</span><i/></button>)}</div></section>
    </div>
    <aside className="exRightFeed"><ExploreListPanel title="Popular Right Now" items={games.slice(0,5)}/><div className="exSidePanel miniCarousel"><div className="exSectionHead"><h3>Trending Now</h3></div><div className="miniStrip">{games.slice(0,5).map(g=><ExploreGameCard g={g} compact/> )}</div></div><div className="exSidePanel squadPick"><h3>SquadUp Recommends</h3><div><img src={img(1086940)}/><span><b>Escape from Tarkov</b><small>4 friends play this</small></span><button onClick={()=>toast('Added to favorites')}>♡</button></div></div><div className="exSidePanel categories"><div className="exSectionHead"><h3>Browse by Category</h3><button>View All</button></div>{['Action','RPG','FPS','Survival','Co-op','Open World','PvP','Story Rich'].map(x=><button onClick={()=>toast(`${x} category opened`)}><Icon>✦</Icon>{x}</button>)}</div></aside>
  </div>:<div className="exCommand"><div className="commandFilters">{['All','Action','RPG','FPS','Survival','Co-op','PvP','Story Rich'].map((f,i)=><button className={i===0?'active':''}>{f}</button>)}</div><div className="commandGridExact">{commandItems.map((g,i)=><ExploreGameCard g={g} list key={i}/>)}</div></div>}
 </section>
}

function Parties(){const [invite,setInvite]=useState(false),[rolled,setRolled]=useState(null),[launched,setLaunched]=useState(false);return <section className="partiesExact"><div className="partyHero" style={{backgroundImage:`linear-gradient(90deg,#080912 20%,rgba(8,9,18,.2)),url(${capsule(252490)})`}}><div><span className="eyebrow">Squad Lobby</span><h1>Friday Rust Raid</h1><p>4/6 ready · voice active · launch window 21:00</p></div><button className={launched?'launching':''} onClick={()=>{setLaunched(true);toast('Party launched');setTimeout(()=>setLaunched(false),1400)}}>{launched?'Launching…':'Launch Party'}</button></div><div className="partyLayout"><div className="partyMain"><div className="memberRow">{friends.slice(0,6).map((f,i)=><div className="memberCard"><Avatar a={f}/><b>{f.name}</b><span>{f.title}</span><em>{i<4?'Ready':'Invited'}</em></div>)}<button className="inviteCard" onClick={()=>setInvite(true)}>+ Invite</button></div><div className="votePanel"><h2>Vote For Next Game</h2><div className="voteBanners">{games.slice(0,3).map((g,i)=><button className={i===0?'winning':''} style={{backgroundImage:`linear-gradient(90deg,rgba(5,6,14,.92),rgba(5,6,14,.25)),url(${img(g.appid)})`}}><b>{g.title}</b><span>{i===0?'5/7 votes · winning':'2/7 votes · losing'}</span></button>)}</div><button className="dice" onClick={()=>setRolled(Math.floor(Math.random()*100)+1)}>Roll 1–100 {rolled&&<b>{rolled}</b>}</button></div><div className="partyChat"><h2>Party Chat</h2><div className="messages"><p><b>Nova:</b> We raid after vote?</p><p><b>Rook:</b> Bringing rockets.</p></div><input placeholder="Message, GIF or emoji…" onKeyDown={e=>{if(e.key==='Enter')toast('Message sent')}}/></div></div><div className="partySide"><div className="panel"><h3>Upcoming Session</h3><p>LAN Night · Saturday · 19:30</p></div><div className="panel"><h3>Squad Facts</h3><p>Most played together: Rust · 32 sessions</p></div><div className="panel"><h3>Voice Channel</h3>{friends.slice(0,4).map(f=><div className="railFriend"><Avatar a={f} small/><span>{f.name}</span></div>)}</div></div></div>{invite&&<div className="modal"><div className="modalCard"><button className="close" onClick={()=>setInvite(false)}>×</button><h2>Invite Friend</h2>{friends.map(f=><button className="pickFriend" onClick={()=>{toast(`Invite sent to ${f.name}`);setInvite(false)}}><Avatar a={f} small/>{f.name}</button>)}</div></div>}</section>}

function Voice(){const [list,setList]=useState(friends.slice(0,7));function move(i){const n=[...list]; const [x]=n.splice(i,1);n.unshift(x);setList(n);toast(`${x.name} moved to top`)}return <section className="voice"><h1>Voice Control Room</h1><div className="voiceGrid">{list.map((f,i)=><div className="voiceUser" draggable onDragEnd={()=>move(i)}><Avatar a={f}/><div><b>{f.name}</b><span>{f.title}</span></div><input type="range" defaultValue={75}/><button>Mute</button></div>)}</div><div className="voiceControls"><button>Noise Suppression</button><button>Echo Cancel</button><button>Mic Test</button><button>Device Select</button></div></section>}
function Calendar(){const [modal,setModal]=useState(false);return <section className="calendar"><div className="calHead"><h1>Squad Calendar</h1><button onClick={()=>setModal(true)}>+ New Event</button></div><div className="calGrid">{Array.from({length:35},(_,i)=><button onClick={()=>setModal(true)} className={i%7===5?'eventDay':''}><b>{i+1}</b>{i%7===5&&<span>LAN Night</span>}</button>)}</div><div className="eventPreview"><h2>Upcoming</h2><p>Rust LAN Party · 6 attending · 4 sidequests open</p><p>Helldivers Drop · Instant queue · Tonight</p></div>{modal&&<div className="modal"><div className="modalCard event"><button className="close" onClick={()=>setModal(false)}>×</button><h2>Create Event</h2><input placeholder="Event title"/><select><option>LAN Party</option><option>Game Night</option><option>Instant Queue</option></select><input placeholder="Game"/><textarea placeholder="Sidequests: snacks, cables, location…"/><button onClick={()=>{toast('Event created');setModal(false)}}>Save Event</button></div></div>}</section>}
function Profile(){return <section className="profileC"><div className="profileHero"><Avatar a={avatars[0]}/><div><h1>Shane</h1><p>@squadfounder · Void Captain</p><button onClick={()=>toast('Nickname editor opened')}>Edit Nickname</button></div></div><div className="profileGrid"><div className="panel"><h3>Weekly Sessions</h3><ResponsiveContainer width="100%" height={170}><AreaChart data={chartData}><Tooltip/><Area dataKey="v" stroke="#9b5cff" fill="#4b1d85"/></AreaChart></ResponsiveContainer><p className="legend">Sessions per day · total 43</p></div><div className="panel"><h3>Playstyle Split</h3><ResponsiveContainer width="100%" height={170}><PieChart><Pie data={pieData} dataKey="value" outerRadius={70}>{pieData.map((_,i)=><Cell fill={['#ff4564','#31e28b','#7c5cff'][i]}/>)}</Pie></PieChart></ResponsiveContainer><p className="legend">PvP 42 · Co-op 35 · Survival 23</p></div><div className="panel achievements"><h3>Showcase Titles</h3>{['Void Captain','Queue Slayer','LAN Warden'].map(x=><button>{x}</button>)}</div></div></section>}
function Settings({theme,setTheme,lang,setLang}){return <section className="settingsC"><h1>Settings</h1><div className="settingsLayout"><nav>{['Account','Connections','Themes','Voice','Language','Moderator'].map(x=><button>{x}</button>)}</nav><div className="settingsPanel"><h2>Preferences</h2><label>Language<select value={lang} onChange={e=>setLang(e.target.value)}><option>EN</option><option>NL</option></select></label><h3>Theme Preview</h3><div className="themeCards">{['Immersive','Neon','Command'].map(t=><button className={theme===t?'active':''} onClick={()=>setTheme(t)}><b>{t}</b><span>Preview & apply</span></button>)}</div><h3>Linked Accounts</h3><div className="links"><button onClick={()=>toast('Steam link started')}>STEAM</button><button onClick={()=>toast('Discord link started')}>DISCORD</button><button onClick={()=>toast('Xbox link started')}>XBOX</button><button onClick={()=>toast('Google link started')}>GOOGLE</button></div><h3>Moderator Tools</h3><button onClick={()=>toast('Dummy user added')}>Add Dummy User</button><button onClick={()=>toast('Dummy users cleared')}>Clear Dummies</button></div></div></section>}

createRoot(document.getElementById('root')).render(<Shell/>);
